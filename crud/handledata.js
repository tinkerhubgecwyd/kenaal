
// handler for raw data
const handleMessageData = (messaeg_id, raw_data) => {
    let {
        auther,
        content,
        createdAt,
        updatedAt,
        replyTo
    } = raw_data
    let createdTime = new Date(createdAt)    
    let updatedTime = new Date(updatedAt)    

    if (document.getElementById(messaeg_id)) return

    let li = document.createElement('li')
    li.setAttribute('id', messaeg_id)
    li.setAttribute('data-created-at', createdTime.getTime())
    li.classList.add('message_block')
    li.innerHTML = `<p class="auther">${auther}</p>
                    <p class="content">${content}</p>
                    <p class="created_at">${createdTime.toLocaleDateString()} - ${createdTime.toLocaleTimeString()}</p>`
    message_list.append(li)
    li.scrollIntoView(true, {behaviour: "smooth"})
}