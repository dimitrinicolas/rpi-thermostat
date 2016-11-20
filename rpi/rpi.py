#!/usr/bin/pyton
import RPi.GPIO as GPIO
import time

from socketIO_client import SocketIO
# MIN and MAX depend on your radiator's controller and your servo motor
MIN = 2.5
MAX = 12.5
SERVO = 22 # servo pin
GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO, GPIO.OUT)
pwm = GPIO.PWM(SERVO, 50)
pwm.start(MIN)
time.sleep(0.3)
pwm.ChangeDutyCycle(0)

def turn(percent):
    deg = percent * (MAW - MIN) + MIN
    pwm.ChangeDutyCycle(deg)
    time.sleep(0.3)
    pwm.ChangeDutyCycle(0)

socketIO = SocketIO('192.168.1.1', 1999) # IP adress of your VPS
socketIO.on('turn', turn)

while True:
    socketIO.wait(seconds=1)
