import os
import htmlPy
from backend import Config

# Initial configurations
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# GUI initializations
config = htmlPy.AppGUI(title=u"吊舱控制助手设置", maximized=True, plugins=True,
                    developer_mode=True, allow_overwrite=False)

# GUI configurations
config.static_path = os.path.join(BASE_DIR, "static/")
config.template_path = os.path.join(BASE_DIR, "templates/")
config.bind(Config(config))

config.template = (u"config.html", {})

if __name__ == "__main__":
    config.start()
