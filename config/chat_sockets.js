module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    // when server(observer) recieves request from front hand(i.e, client side)
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved',socket.id); 
        
        // whenever client disconnects
        socket.on('disconnect',function(){
        console.log("socket disconnected");
        });

        // join room event from client side is detected by .on
        socket.on('join_room',function(data){
            console.log('joining request recieved',data);

            // if room with this chatroom exists, then it will push the client into the room otherwise
            // create new chatroom with this name
            socket.join(data.chatroom);

            // now everyone inside the room get notify that someone new has joined the room
            io.in(data.chatroom).emit('user_joined',data);
        });

        // server will receive the message and broadcast it to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('recieve_message',data);
        });
    });

}