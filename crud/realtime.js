var client = new Parse.LiveQueryClient({
    applicationId: 'pFyQKaI8LxeBzvvWC7TXqj72btvDrJmWZNIqDraq',
    serverURL: 'wss://' + 'kenaal.b4a.io', // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: 'Fd2LcmBKTAuJCFWsgyFuU2RbDjeK7tZ7TUHJbAxh'
});
client.open();


// var query = new Parse.Query('Message');
query.ascending('createdAt').limit(5);
var subscription = client.subscribe(query);


// subscription.on('create', data => {
//     console.log(data);
// });