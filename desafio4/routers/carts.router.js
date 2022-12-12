import { Router } from 'express';
import { cartManager } from '../managers/cartManager/index.js';
import { productManager } from '../managers/productManager/index.js';

const router = Router();


router.post('/', async (req, res) => {
    try {
        const createdCart = await cartManager.createCart();
        res.send({ success: true, createdCart: createdCart });
    }
    catch (error) {
        console.log(error);
        res.send({ success: false, error: 'There was an error creating the cart' });
    }
});

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCart();
        res.send({ success: true, carts: carts });
    } catch (error) {
        console.log(error);
        res.send({ success: false, error: 'There was an error getting the carts' });
    }
});



router.get('/:cid', async (req, res) => {
    try {
        const { cid: paramId } = req.params;
        const id = Number(paramId);

        if (id.isNaN || id < 0) {
            return res.send({ success: false, error: 'Id should be a valid number' });
        }

        const cartById = await cartManager.getCartById(id);

        if (!cartById) {
            return res.send({ success: false, error: 'The cart doesnt exist' });
        }
        res.send({ success: true, cart: cartById });
    } catch (error) {
        console.log(error);
        res.send({ success: false, error: 'There was an error getting the cart by id' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid: paramCartId } = req.params;
        const { pid: paramProductId } = req.params;
        const cartId = Number(paramCartId);
        const productId = Number(paramProductId);

        if (cartId.isNaN || cartId < 0) {
            return res.send({ success: false, error: 'Cart id should be a valid number' });
        }

        if (productId.isNaN || productId < 0) {
            return res.send({ success: false, error: 'Product id should be a valid number' });
        }

        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.send({ success: false, error: 'The product doesnt exist' });
        }

        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.send({ success: false, error: 'The cart doesnt exist' });
        }

        const productAdded = await cartManager.addProductToCart(cartId, productId);
        res.send({ success: true, productAdded: productAdded });
    } catch (error) {
        console.log(error);
        res.send({ success: false, error: 'There was an error adding the product to the cart' });
    }
});

    export default router;
