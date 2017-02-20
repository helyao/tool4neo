import serial
import serial.tools.list_ports

class Uart():

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

    def send(self, cmd):
        self.uart.write(cmd)

if __name__ == '__main__':

    from backend.neo import NEO_CMD
    cmd = NEO_CMD()

    try:
        # 打开串口
        rs232 = Uart('COM1')
        # 发送测试指令
        rs232.send(cmd.yaw(80))
        # 关闭串口
        rs232.uart.close()
    except Exception as err:
        print('Error:', err)
