import json
import htmlPy
from .send import Nacelle
from .sendudp import Debug

class BackEnd(htmlPy.Object):

    def __init__(self, app):
        super(BackEnd, self).__init__()
        self.app = app
        self.debug = Debug()
        self.debug.log('test')

    @htmlPy.Slot(str)
    def print_log(self, log):
        self.debug.log(log)

    @htmlPy.Slot(str, result=str)
    def test_conn(self, words):
        print(words)
        self.debug.log(words)
        self.app.evaluate_javascript('console.log("python to js")')
        return 'test conn ok'

class Config(htmlPy.Object):

    def __init__(self, app):
        super(Config, self).__init__()
        self.app = app

    @htmlPy.Slot(result=str)
    def get_com_list(self):
        return 'COM1'
