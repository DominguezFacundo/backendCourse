import express from 'express'
import productsRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 8080

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', (req, res) => res.send({success: true, message: "Welcome to the API"}))


app.listen(port, () => console.log(`Server running on port: ${port}`))