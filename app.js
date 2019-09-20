const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];

// GET /
app.get('/', function (request, response, next) {
    response.send('Welcome to my site...')
})

// GET /api/owners
app.get('/api/owners', function (request, response, next) {
    response.send(owners)
})

// GET /api/owners/:id
app.get('/api/owners/:id', function (request, response, next) {
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    response.send(singleOwner)
    next()
})

// POST /api/owners

// PUT /api/owners/:id

// DELETE /api/owners/:id

// GET /api/owners/:id/pets

// GET /api/owners/:id/pets/:petId

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId

app.listen(port, function () {
    console.log(`Server is now listening at port ${port}...`)
})