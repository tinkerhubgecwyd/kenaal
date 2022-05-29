function sortMessages() {
  
    // console.log('Sorting')
    run = true;

    while (run) {
        run = false;

        let messages = message_list.getElementsByClassName('message_block');

        // console.log(messages)

        // Loop traversing through all the list items
        for (i = 0; i < (messages.length - 1); i++) {
            stop = false;
            if (messages[i].getAttribute('data-created-at') > 
                messages[i + 1].getAttribute('data-created-at')) {
                stop = true;
                break;
            }
        }

        /* If the current item is smaller than 
           the next item then adding it after 
           it using insertBefore() method */
        if (stop) {
            message_list.insertBefore(messages[i + 1], messages[i]);
            run = true;
        }
    }
}