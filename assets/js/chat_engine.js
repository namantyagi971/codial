class ChatEngine{
    constructor(chatBoxId,userEmail)
    {
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        // initiate the connection with observer(server)
        // io is a global variable

        this.socket=io.connect('http://localhost:5000');

        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }
    connectionHandler()
    {
        let self = this;
        // recieves confirmation from observer(server) side that connection has been established
        this.socket.on('connect',function(){
            console.log('connection established using sockets....!');
            
            // sending request to join the chatroom at backend server(observer)
            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'codial'
            });

            // now every user from server(observer) detects the event user joined
            self.socket.on('user_joined',function(data){
                console.log('a user joined!',data);
            });
        });        
    }
}