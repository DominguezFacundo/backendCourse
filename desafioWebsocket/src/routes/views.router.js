import express from 'express';

const router = express.Router();

const products = [
    {
        id: 1,
        title: 'Escuadra',
        price: 123.45,
    },
    {
        id: 2,
        title: 'Calculadora',
        price: 234.56,
    },
    {
        id: 3,
        title: 'Globo Terráqueo',
        price: 345.67,
    }
];

router.get('/', (req, res) => {
    res.render('home',
        {
            products: products
        });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts',
        {
            products: products
        });
});

router.post('/realtimeproducts', (req, res) => {
    const newProduct = req.body;
    newProduct.id = !products.length ? 1 : products[products.length - 1].id + 1;
    products.push(newProduct);
    res.redirect('/realtimeproducts');
});

router.delete('/realtimeproducts', (req, res) => {
    const product = req.body;
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex === -1) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        products.splice(productIndex, 1);
        res.status(200).json({ message: 'Product deleted' });
    }
});

export default router;