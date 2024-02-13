const houses = require('./db.json')

var globalID = 4 

module.exports = {
    getHouses : (req, res) => {
        res.status(200).send(houses)
    },
    createHouse : (req, res) => {
        let {address, price, imageURL} = req.body
        if (!isNaN(+price)) {
            let house = {
                id: globalID,
                address,
                price : +price,
                imageURL
            }
            houses.push(house);
            res.status(200).send(houses);
            globalID++;
        }
        else {
            res.status(400).send('Price can only be numbers')
        }
    },
    deleteHouse : (req, res) => {
        let houseID = +req.params.id

        const index = houses.findIndex(house => house.id === houseID)

        if (index !== -1) {
            houses.splice(index, 1)
            res.status(200).send(houses);

        } else {
            res.status(404).send("House not found");
        }
    },
    editPrice : (req, res) => {
        let houseID = +req.params.id

        const index = houses.findIndex(house => house.id === houseID)
        
        if (req.body.type.toLowerCase() === 'minus') {
            if (houses[index].price >= 10000) {
                houses[index].price -= 10000
                res.status(200).send(houses);
            } else {
                res.status(400).send("Can't lower price below 0")
            }
        } else if (req.body.type.toLowerCase() === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses);
        } else {
            res.status(400).send("Bad Request");
        }
    }
}