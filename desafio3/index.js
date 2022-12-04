import express from 'express'
import { productManager } from './managers/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 8080

app.get('/api/products', async (req, res) => {
    try {
        const {limit} = req.query

        const allProducts = await productManager.getProducts();

        if (!limit || limit < 1) {
            return res.send({ success: true, products: allProducts })
        }
        const limitedProducts = allProducts.slice(0, limit)
        res.send({ success: true, limitedProducts: limitedProducts })
    } catch (error) {
        console.log(error);
        res.send({ success: false, error: "There was an error" })
    }
})

app.get('/api/products/:id', async (req, res) => {
    try{
        const {id: paramId} = req.params
        const id = Number(paramId)

        if(id.isNaN || id < 0) {
            return res.send({ success: false, error: "Id should be a valid number"})
        }

        const productById = await productManager.getProductById(id)

        if(!productById) {
            return res.send({ success: false, error: "The product doesn't exist"})
        }
        res.send({ success: true, productById})

    } catch (error) {
        console.log(error);
        res.send({ success: false, error: "There was an error getting the product by id" })
    }
})

app.post('/api/products', async (req, res) => {
   try {
    const {title, description, price, thumbnail, stock, code} = req.body;

    if (!title || !description || !price || !thumbnail || !stock || !code) {
        return res.send({success: false, error: "All fields are required"})
    }
    
    const addedProduct = await productManager.addProduct({title, description, price, thumbnail, stock, code})
    res.send({success: true, addedProduct: addedProduct})


   } catch (error) {
    console.log(error);
   }
})

app.listen(port, () => console.log(`Server running on port: ${port}`))