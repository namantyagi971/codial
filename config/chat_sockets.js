module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    // when server(observer) recieves request from front hand(i.e, client side)
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved',socket.id); 
        
        // whenever client disconnects
        socket.on('disconnect',function(){
        console.log("socket disconnected");
        });
    });

}