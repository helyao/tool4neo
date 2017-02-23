import os
import htmlPy

from config import config
from backend import BackEnd

# RUN_MODE = 'development'
RUN_MODE = 'production'

# Initial configurations
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# GUI initializations
app = htmlPy.AppGUI(title=u"吊舱控制助手 - 触控版", maximized=True, plugins=True,
                    developer_mode=True, allow_overwrite=False)

# GUI configurations
app.static_path = os.path.join(BASE_DIR, "static/")
app.template_path = os.path.join(BASE_DIR, "templates/")
app.bind(BackEnd(app, mode=RUN_MODE))

app.template = (u"index.html", config[RUN_MODE].get_para())
if __name__ == "__main__":
    app.start()
