import { Router } from 'express'
import { productManager } from '../managers/productManager/index.js'

const router = Router()

router.get('/', async (req, res) => {
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

router.get('/:pid', async (req, res) => {
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

router.post('/', async (req, res) => {
   try {
    const {title, description, price, thumbnail, stock, code} = req.body;

    if (!title || !description || !price  || !stock || !code) {
        return res.send({success: false, error: "All fields are required, except for thumbnail"})
    }
    
    const addedProduct = await productManager.addProduct({title, description, price, thumbnail, stock, code})
    res.send({success: true, addedProduct: addedProduct})


   } catch (error) {
    console.log(error);
   }
})

router.put('/:pid', async (req, res) => {
    try {   
        const {id: paramId} = req.params
        const id = Number(paramId)

        if(id.isNaN || id < 0) {
            return res.send({ success: false, error: "Id should be a valid number"})
        } 

        const {title, description, price, thumbnail, stock, code} = req.body;

        const updatedProduct = await productManager.updateProduct(id, {title, description, price, thumbnail, stock, code})
        res.send({success: true, updatedProduct: updatedProduct})

    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const {id: paramId} = req.params
        const id = Number(paramId)

        if(id.isNaN || id < 0) {
            return res.send({ success: false, error: "Id should be a valid number"})
        }

        const deletedProduct = await productManager.deleteProduct(id)
        res.send({success: true, deletedProduct: deletedProduct})

    } catch (error) {
        console.log(error);
    }
})

export default router