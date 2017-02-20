import json
import htmlPy

from config import config
from .api import API
from .neo import NEO_CMD
from .udp import UDP


class BackEnd(htmlPy.Object):
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

    @htmlPy.Slot(str)
    def update_para(self, str):
        print('update_para: ' + str)
        para = json.loads(str)
        if 'yaw' in para:
            self.yaw = para['yaw']
        elif 'pitch' in para:
            self.pitch = para['pitch']
        elif 'zoom' in para:
            self.zoom = para['zoom']
        else:
            print("update_para find invalid parameter")

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

    @htmlPy.Slot(str)
    def set_control(self, str):
        print('set_control: ' + str)
        control = json.loads(str)
        if "c_yaw" in control:
            self.mem_yaw = control['c_yaw']
        if "c_pitch" in control:
            self.mem_pitch = control['c_pitch']
        if "c_zoom" in control:
            self.mem_zoom = control['c_zoom']

    @htmlPy.Slot(str)
    def print_log(self, log):
        print(log)
        self.debug.send(log)

    @htmlPy.Slot(str, result=str)
    def test_conn(self, words):
        print(words)
        self.debug.send(words)
        self.app.evaluate_javascript('console.log("python to js")')
        return 'test conn ok'

