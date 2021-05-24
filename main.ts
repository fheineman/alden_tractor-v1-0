function goBackward () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.analogWritePin(AnalogPin.P1, speed / 4)
}
function goForward () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.analogWritePin(AnalogPin.P1, speed)
}
function Stop () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 0)
    speed = 0
    pins.analogWritePin(AnalogPin.P1, speed)
    pins.digitalWritePin(DigitalPin.P8, 0)
}
let seatSwitch = 0
let footPedal1 = 0
let speed = 0
led.enable(false)
Stop()
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
let direction = 1
music.playMelody("C E G C5 - G C5 C5 ", 360)
music.playTone(523, music.beat(BeatFraction.Breve))
music.setTempo(120)
basic.forever(function () {
    if (direction == 0) {
        music.playTone(988, music.beat(BeatFraction.Whole))
        music.rest(music.beat(BeatFraction.Whole))
    }
})
basic.forever(function () {
    footPedal1 = Math.map(pins.analogReadPin(AnalogPin.P3), 250, 790, 0, 1023)
    seatSwitch = pins.digitalReadPin(DigitalPin.P16)
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P15) != direction && footPedal1 < 50) {
        direction = pins.digitalReadPin(DigitalPin.P15)
    }
    if (direction == 1) {
        if (footPedal1 > 50 && seatSwitch == 0) {
            speed = footPedal1
            goForward()
        } else {
            Stop()
        }
    } else {
        if (footPedal1 > 50 && seatSwitch == 0) {
            speed = footPedal1
            goBackward()
        } else {
            Stop()
        }
    }
})
