

// variable for skipping the data reading process
let skip = 0;


function read(limit = 6) {

    console.log('reading db')
    toast('reading database')

    query.descending("createdAt");
    if (skip > 0) query.skip(skip)
    query.limit(limit)

    query.find().then(function(result){
        // console.log(result)
        console.log('loaded ' + result.length + ' results..')
        toast('loaded ' + result.length + ' messages')

        result.forEach(message => {
            // console.log('Dealing: ', result.indexOf(message), message)
            handleMessageData(message.id, message.attributes)
        })

        sortMessages()
        
        skip += result.length
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);      
        toast(("Error: " + error.code + " " + error.message), true) 
    });

}