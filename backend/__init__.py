import json
import htmlPy
from .send import Nacelle
from .sendudp import UDP, rs232_ip, rs232_port
from .neo import NEO_CMD

class BackEnd(htmlPy.Object):

    def __init__(self, app):
        super(BackEnd, self).__init__()
        self.app = app
        self.cmd = NEO_CMD()
        self.debug = UDP()
        self.rs232 = UDP(ip=rs232_ip, port=rs232_port)
        self.rs232.send(self.cmd.yaw(80))
        self.rs232.send(self.cmd.yaw(80))
        self.rs232.send(self.cmd.yaw(80))

    @htmlPy.Slot(str)
    def print_log(self, log):
        print(log)
        self.debug.send(log)

    @htmlPy.Slot(str)
    def update_data(self, data):
        print(data)
        jdata = json.loads(data)
        if 'state' in jdata:
            if jdata['state'] > 0:
                print('[Vaild] x = ' + str(jdata['x']) + '; y = ' + str(jdata['y']))
                self.debug.send('[Vaild] x = ' + str(jdata['x']) + '; y = ' + str(jdata['y']))
            else:
                print('[Invaild]')
                self.debug.send('[Invaild]')

    @htmlPy.Slot(str, result=str)
    def test_conn(self, words):
        print(words)
        self.debug.send(words)
        self.app.evaluate_javascript('console.log("python to js")')
        return 'test conn ok'

class Config(htmlPy.Object):

    def __init__(self, app):
        super(Config, self).__init__()
        self.app = app

    @htmlPy.Slot(result=str)
    def get_com_list(self):
        return 'COM1'
