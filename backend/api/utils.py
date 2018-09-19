class ConsoleSender(object):
    def send(self, phone_number, message):
        print(phone_number, message)


class Message(object):
    def __init__(self, phone_token):
        self.token = phone_token.token
        self.number = phone_token.phone_number

    def send(self, sender):
        sender.send(self.number, 'Your code is: {0.token}'.format(self))