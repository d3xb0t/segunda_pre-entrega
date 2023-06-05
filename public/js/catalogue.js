function imprimir(_id){
    let product = {
        id: _id,
        quantity: 1
    }
    
    console.log(product)

    fetch('http://localhost:8080/api/carts', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
    .then(response => console.log({'status': response.status}))
    .catch(error => console.log(error))
}


/*

fetch('http://localhost:8080/setCookieUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cookie)
    })
    .then(response => console.log({'status': response.status}))
    .catch(error => console.log(error))

*/