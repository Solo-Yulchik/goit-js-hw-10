import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")
form.addEventListener("submit",handleSubmit)


function handleSubmit(event){
    event.preventDefault();
    
let timeMs=+event.target.elements.delay.value
let userChoose=event.target.elements.state.value
    const promise= new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(userChoose==="fulfilled"){
                resolve(timeMs)
                }
                else{reject(timeMs)}
                },timeMs)
            
        
    })
    
    promise.then((data)=>{iziToast.show({
    message: `✅ Fulfilled promise in ${data}ms`,
    messageColor:"white",
    messageSize:"16",
    backgroundColor:"green",
    position:"topRight",
})


    }).catch((err)=>{iziToast.show({
    message: `❌ Rejected promise in ${err}ms`,
    messageColor:"white",
    messageSize:"16",
    backgroundColor:"red",
    position:"topRight",
})
    })
    event.target.reset()
}



