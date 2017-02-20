class Config():
    # UDP Settings for RS232 to Ethernet
    rs232_ip = '192.168.1.70'
    rs232_port = 1234
    # UDP Settings for Debugging
    debug_ip = '127.0.0.1'
    debug_port = 58001
    # Neo init parameters
    yaw = 80
    pitch = 80
    zoom = 4

    @classmethod
    def init_app(cls):
        pass

    @classmethod
    def get_para(cls):
        return {
            "yaw": cls.yaw,
            "pitch": cls.pitch,
            "zoom": cls.zoom,
            "rs232_ip": cls.rs232_ip,
            "rs232_port": cls.rs232_port,
            "debug_ip": cls.debug_ip,
            "debug_port": cls.debug_port
        }

class DevelopmentConfig(Config):
    debug_ip = '192.168.1.150'
    debug_port = 7878

    @classmethod
    def init_app(self):
        Config.init_app()

class ProductionConfig(Config):
    @classmethod
    def init_app(self):
        Config.init_app()

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}
