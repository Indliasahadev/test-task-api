const express = require('express')
const Category = require('../models/category')
const router = express.Router()

router.post('/createCategory', async(req, res) => {
    console.log('Category...')
    console.log('auth id : ', req.header('Authorization').replace('Bearer ', ''))
    const parentId = req.header('Authorization').replace('Bearer ', '')
    const category = new Category({
        ...req.body,
        parent : parentId
    })
    try{
        await category.save();
        res.status(201).send(category)
    }catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router