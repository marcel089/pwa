// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(function () {
            console.log('[mk. TV] Service Worker Registered');
        }).catch(function (err) {
            console.warn('[mk. TV] Error registering Service Worker ', err);
        });
}


// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("push");
button.addEventListener('click', function (e) {
    Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
            sendPush();
        }
    });
});

// Setting up random Notification

function sendPush() {
    var currentdate = new Date();
    var datetime = currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    var title = "[mk. TV] Advertisement Push";
    var body = "Sent by Marcel @ " + datetime;
    var img = "static/img/mk-192.png";
    var content = {
        body: body,
        icon: img
    }

    //https://developer.mozilla.org/de/docs/Web/API/notification
    var notif = new Notification(title, content);

    console.log("[mk. TV] Push sent")
};