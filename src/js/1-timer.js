import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";




const input=document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]")
const daysTimer = document.querySelector("[data-days]")
const hoursTimer = document.querySelector("[data-hours]")
const minutesTimer = document.querySelector("[data-minutes]")
const secondsTimer = document.querySelector("[data-seconds]")

startBtn.addEventListener("click",handlerStart)

startBtn.disabled=true
let userSelectedDate=null;
let intervalId=null;


 flatpickr(input, {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
    userSelectedDate=selectedDates[0].getTime()
    if(userSelectedDate<=Date.now()){
        iziToast.show({
    message: "Please choose a date in the future",
    backgroundColor: 'red',
    position: 'topRight',
    messageColor: 'white',
    });
    startBtn.disabled=true
    return;
} startBtn.disabled=false
    }
})

function handlerStart(event){
startBtn.disabled=true;
input.disabled=true;
intervalId=setInterval(()=>{
    const currentTime=Date.now();
    
    const deltaTime=userSelectedDate-currentTime
    if(deltaTime<=0){
        clearInterval(intervalId)
        setTimer({days:0, hours:0, minutes:0, seconds:0})
        
        iziToast.show({
    message: "Time is up!",
    backgroundColor: 'yellow',
    position: 'topRight',
    messageColor: 'black',
    });
    input.disabled=false;
    return
    }
const objTime=convertMs(deltaTime)  
setTimer(objTime);

},1000)   
}

function convertMs(ms) {
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const days = Math.floor(ms / day);
const hours = Math.floor((ms % day) / hour);

const minutes = Math.floor(((ms % day) % hour) / minute);

const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}

function setTimer({days,hours,minutes,seconds}){
    daysTimer.innerHTML=String(days).padStart(2,"0")
    hoursTimer.innerHTML=String(hours).padStart(2,"0")
    minutesTimer.innerHTML=String(minutes).padStart(2,"0")
    secondsTimer.innerHTML=String(seconds).padStart(2,"0")

}

    








