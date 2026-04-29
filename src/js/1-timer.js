import flatpickr from "flatpickr";   
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input=document.querySelector("#datetime-picker")
const startBtn=document.querySelector("[data-start]")
const daysTimer = document.querySelector("[data-days]")
const hoursTimer = document.querySelector("[data-hours]")
const minutesTimer = document.querySelector("[data-minutes]")
const secondsTimer = document.querySelector("[data-seconds]")

startBtn.addEventListener("click", handlerStart)

let userSelectedDate=null;
let intervalId=null;
startBtn.disabled=true

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
onClose(selectedDates){
    userSelectedDate=selectedDates[0].getTime()
    console.log(userSelectedDate);
    if(userSelectedDate<=Date.now()){
    iziToast.error({
    message: "Please choose a date in the future",
    messageSize: '16',
    messageColor: 'white',
    backgroundColor: 'red',
    position: 'topRight'
    
});
startBtn.disabled=true
return
        
    }
startBtn.disabled=false;

},

})

function handlerStart(event){
    startBtn.disabled=true;
    input.disabled=true;
   
    intervalId=setInterval(()=>{
    
    const currentTime=Date.now();
    const deltaTime=userSelectedDate-currentTime
        if(deltaTime<=0){
        iziToast.show({
    message: "Time is out",
    messageSize: '16',
    messageColor: 'black',
    backgroundColor: 'green',
    position: 'topRight',
});
setTimer({days:0, hours:0, minutes:0, seconds:0})
clearInterval(intervalId);
input.disabled=false;
return;
        }
    setTimer(convertMs(deltaTime))
        
    },1000)
    return;
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

function setTimer({days, hours, minutes, seconds}) {
    daysTimer.innerHTML=addLeadingZero(days)
    hoursTimer.innerHTML=addLeadingZero(hours)
    minutesTimer.innerHTML=addLeadingZero(minutes)
    secondsTimer.innerHTML=addLeadingZero(seconds)
    
}

function addLeadingZero(value){
     return String(value).padStart(2,"0")
}


    








