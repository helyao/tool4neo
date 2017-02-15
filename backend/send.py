import serial
import serial.tools.list_ports
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

class Nacelle():

    def __init__(self, port, baud=115200):
        try:
            if port in self.get_com_list():
                self.uart = serial.Serial(port=port, baudrate=baud)
            else:
                raise Exception("uart port '{0}' not found".format(port))
        except serial.SerialException as err:
            raise Exception(err)

    def get_com_list(self):
        return [item.device for item in serial.tools.list_ports.comports()]

    def send_yaw(self, val):    # 方位
        if isinstance(val, (int, float)):
            self.uart.write(bytes(CMD_Packet(0xAA, 0x01, 0x01, 0x03, val, 0x55)))

    def send_pitch(self, val):  # 俯仰
        if isinstance(val, (int, float)):
            self.uart.write(bytes(CMD_Packet(0xAA, 0x01, 0x01, 0x02, val, 0x55)))

    def send_zoom(self, val):   # 变焦
        if isinstance(val, (int, float)):
            self.uart.write(bytes(CMD_Packet(0xAA, 0x01, 0x04, 0x01, val, 0x55)))


if __name__ ==  '__main__':
    # 打开串口
    try:
        nacelle = Nacelle('COM1')
    except Exception as err:
        print('Error:', err)

    # 发送测试指令
    try:
        nacelle.send_yaw(80)
        nacelle.send_pitch(50.5)
        nacelle.send_zoom(3)
    except Exception:
        pass

    # 关闭串口
    try:
        nacelle.uart.close()
    except NameError:
        pass