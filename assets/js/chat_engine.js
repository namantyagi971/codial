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
        // recieves confirmation from observer(server) side that connection has been established
        this.socket.on('connect',function(){
            console.log('connection established using sockets....!');
        });
    }
}