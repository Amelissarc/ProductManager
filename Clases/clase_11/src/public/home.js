const socket = io();
let user;

const input = document.getElementById('chatbox');
const messageLogs = document.getElementById('messageLogs');

SVGFEDropShadowElement.fire({
    title: 'Identificate',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'necesitas escribir un nombre para identificatte'
    },
    allowOutsideClick: false,
}).then((result) =>{
    user = result.value;
    socket.emit('authenticatedUser', user)
});

input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        socket.emit('message', {user: user, message: chatbox.value});
        input.value == "";
    }
});

socket.on('imprimir', (data) => {
    let mensajes = "";
    data.forEach((msj) => {
        mensajes += `${msj.user} escribio: ${msj.mensajes}`;
    });
    messageLogs.innerHTML = mensajes;
});

socket.on('newUserAlert', (data) => {
    if (!user) return 
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        title: data + 'se ha unido al chat',
        icon: 'success'
    })
})