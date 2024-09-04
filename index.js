const express = require('express')
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server); //creating a new server


//socket.io used to etablish/open connection whenever connected give socket(client) with id
io.on('connection', (socket) => { //here socket is client
    socket.on("user-message",(message)=>{//whenever connected to client got message
        io.emit('message',message);//server emitting/sending messages
    })
  });

app.use(express.static(path.resolve("./public")));//helps to use static content with backend like html file

//when user visited home  page it will show index.html content
app.get('/',(req,res)=>{
    res.sendFile('./public/index.html');
})

//sever is listening on 9000 port 
server.listen(9000,()=>{
    console.log(`Server started at PORT:9000`)
})