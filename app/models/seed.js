// seed.js will be run by the script `npm run seed`

// this will seed our db with a bunch of foods

const mongoose = require('mongoose')
const Food = require('./food')
const db = require('../../config/db')

const startFoods = [
    { name: 'Grape', category: 'Fruit', cost: 20},
    { name: 'Peanut', category: 'Nut', cost: 5},
    { name: 'Steak', category: 'Meat', cost: 30},
    { name: 'Lobster', category: 'Seafood', cost: 30},
    { name: 'Chicken', category: 'Meat', cost: 20}
]

// first we connect to the db 
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // then remove all foods
        Food.deleteMany()
            .then(deletedFoods => {
                console.log('the deleted foods: \n', deletedFoods)
                // now we add our foods to the db
                Food.create(startFoods)
                    .then(newFoods => {
                        console.log('the new foods: \n', newFoods)
                        mongoose.connection.close()
                    })
                    // and always close the connection wether it's a success or failure
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            // and always close the connection wether it's a success or failure
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    // and always close the connection wether it's a success or failure
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })