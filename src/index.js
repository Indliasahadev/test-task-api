const express = require('express')
require('./db/mongoose')
const productRouter = require('./routers/product')
const categoryRouter = require('./routers/category')

const app = express()

const port = 3000

app.use(express.json())

//router setup
app.use(productRouter)
app.use(categoryRouter)

app.listen(port, () =>{
    console.log('Server is up on ', port)
})