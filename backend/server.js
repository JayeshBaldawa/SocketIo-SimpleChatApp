const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server ,{
    cors: {
      origin: "*",
    }
  });

io.on("connection", (socket) => {                                   //We are making this so that somebody can connect to this server
    // console.log("What is the socket ",socket);
    console.log("Socket is active to be connected");
    
    socket.on("chat", (payload) => {                                //We are creating event - we are emitting all the payload that you given to all
        console.log("What is a payload ",payload);
        io.emit("chat",payload);
    })
})

//app.listen(3000, ()=> console.log("Server is active"))

server.listen(5000, ()=>{
    console.log("Your server is running at 5000...")
})