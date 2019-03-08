var socket = io.connect('http://localhost:8080', {
    'forceNew': true
});

var user;

do {
     user = prompt("Please choose a nickname", "");
} while (!user);

// Recibir nuevos mensajes
socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (data, index) {
        return(`<div>
                    <strong>${data.author}</strong>:
                    <em>${data.text}</em>
                </div>`);
    }).join(" ");

    document.getElementById("messages").innerHTML = html;
};

function addMessage(e) {
    var payload = {
        author: user,
        text: document.getElementById("texto").value
    };

    socket.emit('new-message', payload);

    document.getElementById("texto").value = "";
    
    return false;
}