
// reload name on start
if (localStorage.user_name !== undefined){
    welcome.name.setAttribute('value', localStorage.user_name)
    welcome.style.display = 'none'
    toast(('Welcome ' + localStorage.user_name), false, 5000)
}


// subscription handle
subscription.on('create', data => {
    handleMessageData(data.id, data.attributes)
    sortMessages()
});



// listen for name submit
welcome.addEventListener('submit', e => {
    e.preventDefault()
    localStorage.user_name = welcome.name.value
    welcome.style.display = 'none'
})


let as_reply_to = '';
// look for msg sending
send_message.addEventListener('submit', e => {
    e.preventDefault()
    create(send_message.message.value, as_reply_to)
    send_message.reset()
})



// listen for alt+Enter
messaeg_input.addEventListener('keydown', e => {
    let key = e.key
    if (e.altKey && key =='Enter'){
        send_message.querySelector('button').click()
    }
})


// scrollup listener
let fired_once = false;
message_list.addEventListener('scroll', e => {
    if (message_list.scrollTop < 20 && !fired_once){
        fired_once = true
        read()
    }
    if (message_list.scrollTop >= 20 && fired_once){
        fired_once = false
    }
}, { passive: false })


// focus the input on keydown
addEventListener('keydown', _ => {
    if (getComputedStyle(welcome).display !== 'none') return
    messaeg_input.focus()
})

// onload load messages
addEventListener('load', _ => {
    read(10)
})



const fab_buttons = document.getElementById('fab_buttons')
// toggleFab
const toggleFab = () =>{
    if (getComputedStyle(fab_buttons).display === 'none'){
        fab_buttons.style.display = 'flex'
    } else{
        fab_buttons.style.display = 'none'
    }
}


// give chance to change name
const changeName = () => {
    welcome.style.display = 'flex'
}