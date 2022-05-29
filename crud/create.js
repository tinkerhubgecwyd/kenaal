// create message
function create(content, replyTo) {
    let message = new Message();
    message.set("content", content);
    message.set("replyTo", replyTo);
    message.set("auther", localStorage.user_name);

    message.save().then(function(data){
         console.log('Sent messaeg', data);
         toast('Message sent')
    }).catch(function(error){
         console.log('Error: ' + error.message);
         toast(('Error: ' + error.message), true)
    });
}