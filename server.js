// const { Socket } = require("dgram");
const express = require("express");
const app = express()

const http = require("http").createServer(app);
app.use(express.static(__dirname+"/public"))

const io = require("socket.io")(http);


app.get("/chat",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
    // console.log("asdfhjewrtdhfg");
})




const port = process.env.PORT || 3000;

http.listen(port,()=>{
    console.log(`server is running on ${port}`);
})

io.on('connection',(socket)=>{
    console.log("connected..");
    socket.on('message',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('message',msg)
    })
}) 