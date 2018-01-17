'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const Product = require('./models/product');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product',(req,res)=>{
    Product.find({},(err,products)=>{
        if (err) return res.status(500).send({message:`Error realizar la peticion ${err}`})
        if (!products) return res.status(404).send({message: `Error productos no existen`});

        res.send(200, {products})
    })
})

app.get('/api/product/:productId',(req,res)=>{
    let productId = req.params.productId;
    
    Product.findById(productId, (err,product)=>{
        if (err) return res.status(500).send({message:`Error realizar la peticion ${err}`})
        if (!product) return res.status(404).send({message: `Error producto no existe`});

        res.status(200).send({product})
    })
})

app.post('/api/product', (req,res)=>{
    console.log(req.body)

    let product = new Product({
        name : req.body.name,
        picture : req.body.picture,
        price : req.body.price,
        category : req.body.category,
        description : req.body.description
    })

    product.save((err,productStored)=>{
        if(err) res.status(500).send({message:`Error al salvar su producto ${err}`})
        res.status(200).send({product:productStored});
    })
})  

app.put('/api/product/:productId',(req,res)=>{
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err,productUpdate)=>{
        if (err) return res.status(500).send({message:`Error al actualizar el producto ${err}`})
        
        res.status(200).send({product: productUpdate})

    })
})

app.delete('/api/product/:productId',(req,res)=>{
    let productId = req.params.productId;

    Product.findById(productId,(err,product)=>{
        if (err) return res.status(500).send({message:`Error realizar la peticion ${err}`})
        if (!product) return res.status(404).send({message: `Error producto no existe`});
        
        product.remove(err=>{
            if (err) return res.status(500).send({message:`Error borrar el producto ${err}`})
            res.status(200).send({message:'El producto ha sido eliminado'})

        })

    })
})

mongoose.connect('mongodb://localhost:27017/products',(err,res)=>{
    if(err){
        return console.log(err);
    }
    console.log('Conectado a mongodb correctamente')
    
    app.listen(port, ()=>{
        console.log(`Escuchando en el puerto ${port}...`)
    })

})