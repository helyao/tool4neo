import socket

#本机udp监听端口，debug使用
debug_ip = '192.168.1.150'
debug_port = 7878

# RS232 To Ethernet设备端口
rs232_ip = '192.168.1.70'
rs232_port = 1234

class UDP:

    def __init__(self, ip=debug_ip, port=debug_port):
        self.ip = ip
        self.port = port
        self.udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # self.udp.sendto('udp connected\n'.encode('utf-8'), (self.ip, self.port))

    def send(self, str):
        self.udp.sendto((str+'\n').encode('utf-8'), (self.ip, self.port))


if __name__ == '__main__':
    debug = UDP()
    debug.send('\nUnit test...')
    for i in range(1, 10):
        debug.send('log ' + str(i))
    debug.send('--End--')
