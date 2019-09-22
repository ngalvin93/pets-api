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
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    response.send(singleOwner)
})

// POST /api/owners
app.post('/api/owners', function (request, response, next) {
    const newOwner = {
            id: owners.length + 1,
            name: request.body.name,
            pets: null
    }
    owners.push(newOwner)
    response.send(owners)
})

// PUT /api/owners/:id
app.put('/api/owners/:id', function (request, response, next) {
    // const newOwner = {
    //     name: request.body.name
    // }    
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    singleOwner.name = request.body.name
    response.send(owners)
})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', function (request, response, next) {
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    var index = owners.indexOf(singleOwner)
    owners.splice(index, 1)
    response.send(owners)
})

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', function (request, response, next) {
    // find the owner
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    // find index of owner in owners array
    let singleOwnerIndex = owners.indexOf(singleOwner)
    // return the owner's pets (owners[index].pets)
    response.send(owners[singleOwnerIndex].pets)
})
// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', function (request, response, next) {
    // identify the owner from the owners array
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    // from the owner, return the pet with the matching id
    let singleOwnerIndex = owners.indexOf(singleOwner)
    let singleOwnerPets = owners[singleOwnerIndex].pets
    const singlePet = singleOwnerPets.find(function (pet) {
        return pet.id === parseInt(request.params.petId)
    })
    response.send(singlePet)
})
// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', function (request, response, next) {
    // what will the user send in the body? pet id (auto gen), pet name and pet type
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    const newPet = {
        id: singleOwner.pets.length + 1,
        name: request.body.name,
        type: request.body.type
    }
    singleOwner.pets.push(newPet)
    response.send(owners)
})
// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', function (request, response, next) {
    let ownerId = request.params.id
    let petId = request.params.petId
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(ownerId)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    const singleOwnerPets = singleOwner.pets
    const singlePet = singleOwnerPets.find(function (pet) {
        return pet.id === parseInt(petId)
    })
    if (!request.body.name && request.body.type) {
        console.log('no name but type exists')
        singlePet.type = request.body.type
    } else if (request.body.name && !request.body.type) {
        console.log('name exists but no type')
        singlePet.name = request.body.name
    } else if (request.body.name && request.body.type) {
        console.log('both')
        singlePet.type = request.body.type
        singlePet.name = request.body.name
    }
    response.send(singlePet)
})
// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', function (request, response, next) {
    const singleOwner = owners.find(function (owner) {
        return owner.id === parseInt(request.params.id)
    })
    if (!singleOwner) {
        return response.status(404).send('The query you entered is not valid. Please try again.')
    }
    let singleOwnerIndex = owners.indexOf(singleOwner)
    let singleOwnerPets = owners[singleOwnerIndex].pets
    const singlePet = singleOwnerPets.find(function (pet) {
        return pet.id === parseInt(request.params.petId)
    })
    // response.send(singlePet)
    // petList.splice(index,1)
    let index = singleOwnerPets.indexOf(singlePet)
    singleOwnerPets.splice(index, 1)
    response.send(singleOwnerPets)
})

// LISTEN
app.listen(port, function () {
    console.log(`Server is now listening at port ${port}...`)
})