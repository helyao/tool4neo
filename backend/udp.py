import socket

class UDP:

    def __init__(self, ip, port):
        self.ip = ip
        self.port = port
        self.udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    # 目前仅支持str和bytes格式的数据，str的encoding默认为utf-8
    def send(self, ctn):
        if isinstance(ctn, str):
            self.udp.sendto((ctn+'\n').encode('utf-8'), (self.ip, self.port))
        elif isinstance(ctn, bytes):
            self.udp.sendto(ctn, (self.ip, self.port))
        else:
            print('Sorry, {0} is not supported.'.format(type(ctn)))

if __name__ == '__main__':

    debug = UDP(ip='127.0.0.1', port=58001)

    from backend.neo import NEO_CMD
    cmd = NEO_CMD()

    debug.send('Start...')
    debug.send(cmd.yaw(80))
    debug.send(100)




