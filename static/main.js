const contenedor = document.querySelector('#contenedor')

async function load(){
    contenedor.innerHTML = " "
    
    await fetch('http://localhost:8080/api/products', {
        method: 'get',
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then(response =>  response.json())
    .then(data => {
        let miTabla = '<table> <thead class="shadow"><tr><th scope="col">ID</th><th scope="col">TITLE</th><th scope="col">STOCK</th><th scope="col">PRICE</th><th scope="col">DESCRIPTION</th></tr></thead>'
        for(let i= 0, { length }= data; i<length; i++){
            miTabla += "<tr>"
            miTabla += '<th scope="row">'+data[i].id+'</th>'
            miTabla += "<td>"+data[i].title+"</td>"
            miTabla += "<td>"+data[i].stock+"</td>"
            miTabla += "<td>"+data[i].price+"</td>"
            miTabla += "<td>"+data[i].description+"</td>"
            miTabla += "</tr>"
        }
        miTabla += "</table>"
        const tabla = document.createElement("div")
        tabla.className = "tabla"
        tabla.innerHTML = miTabla
        contenedor.appendChild(tabla)
    })
    
    .catch((error) => console.log(error))
}


function parseData(data){
    console.log(data)

}
