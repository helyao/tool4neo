from backend import Nacelle

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