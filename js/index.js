const minutes = document.querySelector('.timer__minutes');
const seconds = document.querySelector('.timer__seconds');
const start_btn = document.querySelector('.start_btn');
const pause_btn = document.querySelector('.pause_btn');
const slider = document.querySelector('.slider');
const preTime = document.querySelector('.preTime');
const btn_sec_up = document.querySelector('.increase_sec_up');
const btn_sec_down = document.querySelector('.increase_sec_down');
const btn_min_up = document.querySelector('.increase_min_up');
const btn_min_down = document.querySelector('.increase_min_down');
const preTimerSeconds = document.querySelector('.preTimer');
const modal_content = document.querySelector('.modal-content');
const modal = document.getElementById("myModal");
let timerId
let preTimerId
let started = false
let timer_minutes = 0
let timer_seconds = 20
let pre_timer_seconds = 5
let secondsRemaining
let oldSecondRemaining
let pause = false

slider.addEventListener('change', () => {
    preTime.textContent = slider.value
})
preTimerSeconds.textContent = slider.value.toString()
pause_btn.style.display = 'none'

btn_sec_up.addEventListener('click', () => {
    timer_seconds = timer_seconds+5
    if (timer_seconds >= 59) {
        timer_seconds = 0
    }
    if (timer_seconds < 10) {
        seconds.textContent = "0" + timer_seconds;
    } else {
        seconds.textContent = timer_seconds.toString()
    }
})
btn_sec_down.addEventListener('click', () => {
    timer_seconds = timer_seconds-5
    if (timer_seconds <= -1) {
        timer_seconds = 55
    }
    if (timer_seconds < 10) {
        seconds.textContent = "0" + timer_seconds;
    } else {
        seconds.textContent = timer_seconds.toString()
    }
})
btn_min_up.addEventListener('click', () => {
    timer_minutes++
    if (timer_minutes < 10) {
        minutes.textContent = "0" + timer_minutes;
    } else {
        minutes.textContent = timer_minutes.toString()
    }
})
btn_min_down.addEventListener('click', () => {
    timer_minutes--
    if (timer_minutes <= -1) {
        timer_minutes = 0
    }
    if (timer_minutes < 10) {
        minutes.textContent = "0" + timer_minutes;
    } else {
        minutes.textContent = timer_minutes.toString()
    }
})

if (timer_seconds < 10) {
    seconds.textContent = "0" + timer_seconds;
} else {
    seconds.textContent = timer_seconds.toString()
}

if (timer_minutes < 10) {
    minutes.textContent = "0" + timer_minutes;
} else {
    minutes.textContent = timer_minutes.toString()
}

const end = () => {
    start_btn.textContent = 'start'
    start_btn.style.background = '#3FA066'
    pause_btn.style.display = 'none'
    pause = false
    pause_btn.innerHTML = '<img src="public/pause-button-svgrepo-com.svg" alt="">'
    clearInterval(timerId)
    clearInterval(preTimerId)

    btn_min_up.style.display = 'block'
    btn_min_down.style.display = 'block'
    btn_sec_up.style.display = 'block'
    btn_sec_down.style.display = 'block'

    let min = Math.floor(oldSecondRemaining / 60);
    let sec = oldSecondRemaining - (min * 60);

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    minutes.textContent = min.toString()
    seconds.textContent = sec.toString()
}

let audio = new Audio('../public/tick.mp3');
let alarm = new Audio('../public/alarm.mp3');


function countdownTimer() {
    if (secondsRemaining >= 0) {

        let min = Math.floor(secondsRemaining / 60);
        let sec = secondsRemaining - (min * 60);

        if (min < 10) {
            min = "0" + min;
        }

        if (sec < 10) {
            sec = "0" + sec;
        }

        minutes.textContent = min.toString()
        seconds.textContent = sec.toString()

        secondsRemaining--;
    } else {
        started = false
        alarm.play()
        let done = confirm("Done");
        if (done){
            alarm.pause()
            alarm.currentTime = 0
        }
        end()
    }

}

start_btn.addEventListener('click', () => {
    started = !started
    if (started) {

        btn_min_up.style.display = 'none'
        btn_min_down.style.display = 'none'
        btn_sec_up.style.display = 'none'
        btn_sec_down.style.display = 'none'

        start_btn.textContent = 'stop'
        start_btn.style.background = 'red'

        pause_btn.style.display = 'block'

        preTimerSeconds.textContent = slider.value.toString()
        let color = true
        pre_timer_seconds = slider.value - 1
        if (pre_timer_seconds > 0){
            modal.style.display = "block";
        }
        preTimerId = setInterval(() => {
            if (pre_timer_seconds > 0) {
                let sec = pre_timer_seconds
                color = !color
                modal_content.style.backgroundColor = color ? '#3FA066' : 'red'
                preTimerSeconds.textContent = sec.toString()
                pre_timer_seconds--;
                audio.play();
            } else {
                modal.style.display = "none";
                clearInterval(preTimerId)

                audio.pause();
                audio.currentTime = 0;

                secondsRemaining = timer_minutes * 60 + timer_seconds-1
                oldSecondRemaining = secondsRemaining + 1
                timerId = setInterval(countdownTimer, 1000);
            }

        }, 1000)

    } else {
        end()
        pause = false
        clearInterval(timerId)
        clearInterval(preTimerId)
    }
})
pause_btn.addEventListener('click',()=>{
    pause = !pause
    if(pause){
        pause_btn.textContent = 'resume'
        clearInterval(timerId)
        clearInterval(preTimerId)
    }else {
        clearInterval(timerId)
        clearInterval(preTimerId)
        pause_btn.innerHTML = '<img src="public/pause-button-svgrepo-com.svg" alt="">'
        timerId = setInterval(countdownTimer, 1000);

    }

})
