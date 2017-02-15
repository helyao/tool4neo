import socket

rmt_ip = '192.168.1.150'
rmt_port = 7878

class Debug:

    def __init__(self, ip=rmt_ip, port=rmt_port):
        self.udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.udp.sendto('udp connected\n'.encode('utf-8'), (rmt_ip, rmt_port))

    def log(self, str):
        self.udp.sendto((str+'\n').encode('utf-8'), (rmt_ip, rmt_port))

if __name__ == '__main__':
    debug = Debug()
    for i in range(1, 10):
        debug.log('log ' + str(i))
