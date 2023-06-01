import callback from "../callbacks.js"
import express from 'express'
import productModel from '../dao/models/product.js'

class Query{

    limit = 10;
    page = 1;
    sort = {};
    category = {};

    constructor(limit, page, sort, category){
        this.limit = limit?limit : this.limit;
        this.page = page?page : this.page;
        this.sort = sort?{price: sort} : this.sort;
        this.category = category?{'category': category} : this.category;
    }
}


const paginateRouter = express.Router()


paginateRouter.get('/', async (requests, response) => {
    try {
        let { limit, page, sort, category } = requests.query
        let dataToMakeTheQuery = new Query(limit, page, sort, category)

        const customLabels = {
            docs: 'payload'
        }

        const options = {
            limit: dataToMakeTheQuery.limit,
            page: dataToMakeTheQuery.page,
            sort: dataToMakeTheQuery.sort,
            customLabels    
        }


        console.log(dataToMakeTheQuery)
        let respuesta = await productModel.paginate(dataToMakeTheQuery.category, options)
        respuesta.status = "Success"
        respuesta.prevLink = respuesta.hasPrevPage?`http://localhost:8080/products?category=Drama&limit=5&page=${respuesta.prevPage}&sort=desc`:null
        respuesta.nextLink = respuesta.hasNextPage?`http://localhost:8080/products?category=Drama&limit=5&page=${respuesta.nextPage}&sort=desc`:null
        response.send(respuesta)
    } catch (error) {
        console.log(error)
    }
} )


export default paginateRouter

/*
El método GET deberá devolver un objeto con el siguiente formato:
{
	status:success/error != agregar / falta agregar opcion de error
    payload: Resultado de los productos solicitados != cambiar de docs a payload !Hecho ok
    totalPages: Total de páginas = ok
    prevPage: Página anterior = ok
    nextPage: Página siguiente = ok
    page: Página actual = ok
    hasPrevPage: Indicador para saber si la página previa existe = ok
    hasNextPage: Indicador para saber si la página siguiente existe. = ok
    prevLink: Link directo a la página previa (null si hasPrevPage=false) agregar ok
    nextLink: Link directo a la página siguiente (null si hasNextPage=false) agregar ok
}


totalDocs	67
limit	5
totalPages	14
page	6
pagingCounter	26
hasPrevPage	true
hasNextPage	true
prevPage	5
nextPage	7
*/