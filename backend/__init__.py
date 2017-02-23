import json
import time
import htmlPy
import threading

from config import config
# from .api import API
from .neo import NEO_CMD
from .udp import UDP

class BackEnd(htmlPy.Object):

    icount = 0
    mem_yaw = 0
    mem_pitch = 0
    mem_zoom = 0

    def __init__(self, app, mode='default'):
        super(BackEnd, self).__init__()
        self.app = app
        self.cmd = NEO_CMD()
        self.debug = UDP(ip=config[mode].debug_ip, port=config[mode].debug_port)
        self.rs232 = UDP(ip=config[mode].rs232_ip, port=config[mode].rs232_port)
        self.yaw = config[mode].yaw
        self.pitch = config[mode].pitch
        self.zoom = config[mode].zoom
        self.frequency = config[mode].rate
        self.process()

    # update max range of Yaw & Pitch & Zoom
    @htmlPy.Slot(str)
    def update_para(self, str):
        para = json.loads(str)
        if 'yaw' in para:
            self.yaw = para['yaw']
        elif 'pitch' in para:
            self.pitch = para['pitch']
        elif 'zoom' in para:
            self.zoom = para['zoom']
        else:
            print("update_para find invalid parameter")
        print('yaw = {0}'.format(self.yaw))
        print('pitch = {0}'.format(self.pitch))
        print('zoom = {0}'.format(self.zoom))

    # update rs232 and debug udp ip&port
    @htmlPy.Slot(str)
    def update_conn(self, str):
        print('update_conn: ' + str)
        conn = json.loads(str)
        try:
            self.debug = UDP(ip=conn['debug_ip'], port=conn['debug_port'])
            self.rs232 = UDP(ip=conn['rs232_ip'], port=conn['rs232_port'])
        except Exception as err:
            print("update_conn set faild:")
            print(err)

    # current control response
    @htmlPy.Slot(str)
    def set_control(self, str):
        print('set_control: ' + str)
        control = json.loads(str)
        if "c_yaw" in control:
            self.mem_yaw = round(control['c_yaw'] * self.yaw)
        if "c_pitch" in control:
            self.mem_pitch = round(control['c_pitch'] * self.pitch)
        if "c_zoom" in control:
            self.mem_zoom = round(control['c_zoom'] * self.zoom)

    # Print ui log both on console and udp listener
    @htmlPy.Slot(str)
    def print_log(self, log):
        print(log)
        self.debug.send(log)

    # just for test
    @htmlPy.Slot(str, result=str)
    def test_conn(self, words):
        print(words)
        self.debug.send(words)
        self.app.evaluate_javascript('console.log("python to js")')
        return 'test conn ok'

    def process(self):
        self.th = threading.Thread(target=BackEnd.task, args=(self,))
        self.th.start()

    def task(self):
        self.interval = 1 / self.frequency
        while True:
            self.icount += 1
            self.icount = self.icount % 3
            if (self.icount == 0):
                self.rs232.send(self.cmd.yaw(self.mem_yaw))
            elif (self.icount == 1):
                self.rs232.send(self.cmd.pitch(self.mem_pitch))
            elif (self.icount == 2):
                self.rs232.send(self.cmd.zoom(self.mem_zoom))
            else:
                pass
            time.sleep(self.interval)


