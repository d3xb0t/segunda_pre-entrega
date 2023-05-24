const socket = io()

let user
let chatBox = document.querySelector('#chatBox')

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa un nombre de usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value&&'!Necesitas escribir un nombre de usuario para continuar!'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    console.log(user)
})

chatBox.addEventListener("keyup", evt => {
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("messageChat", {
                user: user,
                message: chatBox.value
            })
            chatBox.value= ""
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.querySelector('#messageLogs')
    let messages = ""
    data.forEach(message => {
        messages = messages+`${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages
})