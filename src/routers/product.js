const express = require('express')
const Product = require('../models/product')
const Category = require('../models/category')

const router = express.Router()

// post method to create product
router.post('/create', async (req, res)=> {
    console.log(req.body)
    const product = new Product(req.body)

    try{
        await product.save()
        console.log('product : ', product)
        res.status(201).send(product)
    }catch( err){
        console.log('Error : ', err)
        res.status(400).send(err)
    }
})

//to read a specific product
router.get('/read/:id', async (req, res) => {
    console.log('Heya')
    const _id = req.params.id

    console.log(_id)
    try{
        const product = await Product.findById({_id})
        const count = await Category.countDocuments()
        console.log(count)
        let obj = {}

        if(count > 0){
            const category = await Category.findOne({ parent : product._id})
            obj.category = category.name
            obj.categoryId = category.id

            console.log('..............',obj)
            res.send({
                product,
                category
            })
        }

        res.send(product)
    }catch (err){
        console.log(err)
        res.status(400).send(err)
    }
})

//to read all products
router.get('/readAll', async (req, res) => {
    try{
        const products = await Product.find({})
        const categories = await Category.find({})
        const productArr = Array.from(products)
        const categoryArr = Array.from(categories)

        console.log(productArr)
        const arr = []

        productArr.forEach( product => {
            console.log('innn')

            const category = categoryArr.find( category => category.parent.toString() === product._id.toString())
            
            console.log('cate : ', category)
            arr.push({
                product,
                category
            })
        })

        console.log('arr : ',arr)
        res.send(arr)
    }catch(err) {
        console.log('err : ', err)
        res.sendStatus(400)
    }
})

// to update product
router.patch('/update/:id', async (req, res)=> {
    const _id = req.params.id

    const product = await Product.findOne({_id})
    // this variable will store only keys of incoming data
    const updates = Object.keys(req.body)
    const allowedUpdates = ['qtyPerUnit', 'unitPrice', 'unitInStock', 'discontinued']
    const isValidUpdate = updates.every( update => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.status(400).send('Invalid update')
    }
    try{
        updates.forEach( update => product[update] = req.body[update])
        await product.save()
        res.send(product)
    }catch(err) {
        res.status(400).send(err)
    }
})

// to delete a product
router.delete('/delete/:id', async (req, res)=> {
    const _id = req.params.id
    try{
        const product = await Product.findById({_id})
        await product.remove()
        res.status(200).send(product)
    }catch(err) {
        res.status(400).send()
    }
})

module.exports = router