const express = require('express')
const path = require('path');

const app = express()


const { getHouses } = require('./controller.js')
const { createHouse } = require('./controller.js')
const { deleteHouse } = require('./controller.js')
const { editPrice } = require('./controller.js')

app.use(express.json())
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile('static/index.html', {root: __dirname});
})

app.get('/api/houses', getHouses)

app.post('/api/houses', createHouse)

app.delete('/api/houses/:id', deleteHouse)

app.put('/api/houses/:id', editPrice)

// go to http://localhost:4000/ if you wish to test out the full functionality and finished design
app.listen(4000, () => console.log(`Server running on port 4000`))