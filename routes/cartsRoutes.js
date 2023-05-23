/*
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const CartManager = require('../dao/fileSystem/cartManager')
*/

import express from "express"
import CartManager from "../dao/models/cartManager.js"
import cartModel from "../dao/models/cart.js"
const cartRouter = express.Router()
const cartManager = new CartManager()


cartRouter.get('/', async(requests, response) => {
    let respuesta = await cartManager.getCarts()
    response.send({status: "Success", payload: respuesta})
})



cartRouter.get('/:cid', async (requests, response) => {
    let {cid} = requests.params
    try{
        let respuesta = await cartModel.findById({_id: cid})
        response.send({status: "Success", payload: respuesta})
    } catch(error) {
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }
})


cartRouter.post('/', async(requests, response) => {
    let producto = requests.body
    let respuesta = await cartManager.addCart(producto)
    response.send({status: "Success", payload: respuesta})
})

/*

cartRouter.post('/', async(requests, response) => {
    let productos = requests.body
    let respuesta = await cartManager.addCart(productos)
    response.send(respuesta)         
})

cartRouter.post('/:cid/product/:pid', async(requests, response) => {
    let { cid , pid } = requests.params
    let carritos = await cartManager.getCarts()
    let carrito = carritos.find(carrito => carrito.id == cid)
    if(carrito){
        let producto = (carrito.products).find(producto => producto.id == pid)
        if(producto){
            producto.quantity ++

        }else{
            carrito.products.push({"id": pid, "quantity": 1})
        }
    }else{
        response.send("Not Found")
    }
    await cartManager.writeCarts(carritos)
    response.send("Done")
})

cartRouter.get('/', async(requests, response) => {
    let respuesta = await cartManager.getCarts()
    response.send(respuesta)
})

cartRouter.get('/:cid', async (requests, response) => {
    let carritos = await cartManager.getCarts()
    let { cid } = requests.params
    console.log(cid)
    let respuesta = carritos.find((carrito) => carrito.id == cid)
    if(respuesta){
        response.send(respuesta)
    }else{
        console.log("Not Found");
        response.send("Not Found")
    }

})
*/
export default cartRouter