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
        
        // now client is sending the msg to the server(observer)
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            if(msg!='')
            {
                self.socket.emit('send_message',{
                    message:msg,
                    user_email : self.userEmail,
                    chatroom : 'codial'
                });
            }
        });

        // Client recieved what is broadcasted by the server
        self.socket.on('recieve_message',function(data){
            console.log("message recieved",data);

            // now we need to check whether the recieved msg is self or other 
            let messageType = 'other-message';
            if(data.user_email==self.userEmail)
            {
                messageType='self-message';
            }

            // now we need to append msg according to type of
            let newMessage = $('<li>');

            newMessage.append($('<span>',{
                'html' : data.message
            }));

            newMessage.append($('<sub>',{
                'html' : data.user_email
            }));

            newMessage.addClass(messageType);
            
            $('#chat-message-list').append(newMessage);
        });
    }
}