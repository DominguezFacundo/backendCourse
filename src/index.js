import express from 'express'

const app = express()
app.use(express.urlencoded({extended: true}))

/* Para ingresar a estos endpoints 127.0.0.1:8080/"nombreEndpoint" || localhost:8080/"nombreEndpoint" */

app.get('/saludo', (req, res) => {
    res.send('Endpoint saludo')
})

const greeting = "<h1 style='color:blue'>Bienvenidos al endpoint BIENVENIDA</h1>"

app.get('/bienvenida', (req, res) => {
    res.send(greeting)
})

const object = user = {
    name: "nombre",
    lastname: "apellido",
    age: 30,
    email: "user@user.com"
}

app.get('/usuario', (req, res) => {
    res.send(object)
})

// ---------------------------



app.get('/saludar/:nombre/:apellido', (req, res) => {
    // :x lo encontramos en req.params 
    const message = `Saludos a ${req.params.nombre} ${req.params.apellido}`

    res.send(message)
})

const users = [
    {id: 1, name: "F", lastname: "Do", gender: "M"},
    {id: 2, name: "C", lastname: "Di", gender: "F"},
    {id: 3, name: "J", lastname: "Lu", gender: "M"},
    {id: 4, name: "C", lastname: "Li", gender: "F"},
    {id: 5, name: "J", lastname: "Li", gender: "M"},
    {id: 6, name: "A", lastname: "Li", gender: "F"},
    {id: 7, name: "P", lastname: "N", gender: "F"},
]

/* app.get('/', (req, res) => {
    res.send(users)
}) */

app.get('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id)
    if (!user) return res.send({error: "User not found"})

    res.send({user})  //{user: user}
})

app.get('/', (req, res) => {
    const gender = req.query.gender

    if(gender && (gender.toUpperCase() == "M" || gender.toUpperCase() == "F")) {
        const userFiltered = users.filter(u => u.gender === gender.toUpperCase())
        res.send(userFiltered)
    } else {
        res.send({users})
    }

    
})


app.listen(8080, ()=> {
    console.log("Listening on 8080.........");
})