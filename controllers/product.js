const Product = require('../models/product');

function getProduct(req,res){
    let productId = req.params.productId;
    
    Product.findById(productId, (err,product)=>{
        if (err) return res.status(500).send({message:`Error realizar la peticion ${err}`})
        if (!product) return res.status(404).send({message: `Error producto no existe`});

        res.status(200).send({product})
    })
}

function getProducts(req,res){
    Product.find({},(err,products)=>{
        if (err) return res.status(500).send({message:`Error realizar la peticion ${err}`})
        if (!products) return res.status(404).send({message: `Error productos no existen`});

        res.send(200, {products})
    })
}

function saveProduct (req,res){
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
}

function updateProduct (req,res){
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err,productUpdate)=>{
        if (err) return res.status(500).send({message:`Error al actualizar el producto ${err}`})
        
        res.status(200).send({product: productUpdate})

    })
}

function deleteProduct (req,res){
    let productId = req.params.productId;

    Product.findById(productId,(err,product)=>{
        if (err) return res.status(500).send({message:`Error realizar la peticion ${err}`})
        if (!product) return res.status(404).send({message: `Error producto no existe`});
        
        product.remove(err=>{
            if (err) return res.status(500).send({message:`Error borrar el producto ${err}`})
            res.status(200).send({message:'El producto ha sido eliminado'})

        })

    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}