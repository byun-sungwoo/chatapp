"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var li = document.createElement("li");
    var encodedMsg = `${msg}`
    li.id = `${Date.now()}${Math.round(Math.random() * 1000)}`;
    console.log(li.id);
    
    if (user === 'announcement') {
        li.className = 'messageAnnounce';
    } else {
        if (user.split(' ')[2] === email)
            li.className = 'messageSent';
        else
            li.className = 'messageRecieve';
        encodedMsg = `[${user.split(' ')[0]} ${user.split(' ')[1]}] ${msg}`
    }

    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
    document.getElementById(li.id).scrollIntoView(true);
});

connection.start().then(function () {
    connection.invoke("SendMessage", "announcement", `${firstname} ${lastname} has joined`).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("messageInput").addEventListener("keydown", function (event) {
    // Enter is pressed
    var user = `${firstname} ${lastname} ${email}`;
    var message = document.getElementById("messageInput").value;
    if (event.keyCode == 13 && !event.shiftKey && user && /\S/.test(message)) {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById("messageInput").value = "";
        event.preventDefault();
    } else if (event.keyCode == 13 && !event.shiftKey && /\S/.test(message)) {
    event.preventDefault();
    }
}, false);

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = `${firstname} ${lastname} ${email}`;
    var message = document.getElementById("messageInput").value;
    if (/\S/.test(message) && user) {
        document.getElementById("messageInput").value = "";
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    event.preventDefault();
});