
// global variables
const messenger = document.getElementById('messenger'),
    message_list = document.getElementById('message_list'),
    send_message = document.getElementById('send_message'),
    welcome = document.getElementById('welcome');


// parse Message class
const Message = Parse.Object.extend("Message")

// query for realtime and readjs
let query = new Parse.Query(Message);


// message input for inputlistener
const messaeg_input = document.getElementById('message')