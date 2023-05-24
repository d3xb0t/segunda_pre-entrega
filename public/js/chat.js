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
})
