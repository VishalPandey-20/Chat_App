// console.log("sdfghjkl44545");
// var io = require("socket.io")
// console.log(io);
const socket = io() 

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area")
let vishal;

do{
    vishal = prompt("please enter your..")
}while(!vishal)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:vishal,
        message:message.trim()
    }
    // append message
    appendMessage(msg,'outgoing','right')
    textarea.value = ''
    scrollToBottom()

    // send to server
    socket.emit('message',msg)

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);

}

// receve message 

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming message',"left")
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}