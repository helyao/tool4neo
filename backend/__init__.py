import htmlPy

class BackEnd(htmlPy.Object):

    def __init__(self, app):
        super(BackEnd, self).__init__()
        self.app = app

    @htmlPy.Slot(str, result=str)
    def print_log(self, log):
        print(log)
        self.app.evaluate_javascript('console.log("python to js")')
        return 'ok'