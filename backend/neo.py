from ctypes import *

class CMD_Packet(Structure):
    _pack_ = 1
    _fields_ = \
    [
        ("head", c_ubyte),
        ("addr", c_ubyte),
        ("fun1", c_ubyte),
        ("fun2", c_ubyte),
        ("data", c_float),
        ("tail", c_ubyte)
    ]

class NEO_CMD:

    def __init__(self):
        pass

    def yaw(self, val):    # 方位
        if isinstance(val, (int, float)):
            return bytes(CMD_Packet(0xAA, 0x01, 0x01, 0x03, val, 0x55)).decode('latin-1')

    def pitch(self, val):  # 俯仰
        if isinstance(val, (int, float)):
            return bytes(CMD_Packet(0xAA, 0x01, 0x01, 0x02, val, 0x55))

    def zoom(self, val):   # 变焦
        if isinstance(val, (int, float)):
            return bytes(CMD_Packet(0xAA, 0x01, 0x04, 0x01, val, 0x55))

if __name__ == '__main__':

    neo = NEO_CMD()
    print(neo.yaw(80))
    print(neo.pitch(60))
    print(neo.zoom(4))

