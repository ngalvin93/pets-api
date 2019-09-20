const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;

//app.use()

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

app.get('/', function (request, response, next) {
    response.send('Welcome to my site...')
})

app.listen(port, function () {
    console.log(`Server is now listening at port ${port}...`)
})