// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for pets
const Food = require('../models/food')

// custom middleware for notes see food_routes
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /foods
router.post('/dishes/:foodId', removeBlanks, (req, res, next) => {
	// isolate the dish and save to a variable
	const dish = req.body.dish
	// save the food id for easy reference
	const foodId = req.params.foodId

	Food.findById(foodId)
		.then(handle404)
		// respond to succesful `create` with status 201 and JSON of new "food"
		.then(food => {
			console.log(food)
			console.log(dish)
			// add a dish to the array
			food.dishes.push(dish)
			// save the food
			return food.save()
		})
		// send the info after updating the food
		.then(food => res.status(201).json({ food: food }))
		// if an error occurs, pass it off to our error handler
		.catch(next)
})

// UPDATE
// PATCH /foods/63e6cc1e113b9c7ffe271d8b/
router.patch('/dishes/:foodId/:dishId', requireToken, removeBlanks, (req, res, next) => {
	// get and save the id's to variables
	const foodId = req.params.foodId
	const dishId = req.params.dishId

	Food.findById(foodId)
		.then(handle404)
		.then(food => {
			// console.log(food)
			// console.log(dishId)
			// single out the dish
			const theDish = food.dishes.id(dishId)
			console.log(req.body.dish)
			// make sure the user is the food's owner
			requireOwnership(req, food)
			// update accordingly
			theDish.set(req.body.dish)
			// return the saved food
			return food.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /foods/63e6cc1e113b9c7ffe271d8b/
router.delete('/dishes/:foodId/:dishId', requireToken, (req, res, next) => {
	// get and save the id's to variables
	const { foodId, dishId } = req.params

	Food.findById(foodId)
		.then(handle404)
		.then((food) => {
			// single out the dish
			const theDish = food.dishes.id(dishId)
			// make sure the user is the food's owner
			requireOwnership(req, food)
			// delete the dish if the above didn't throw
			theDish.remove()
			// return the saved food
			return food.save()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// export our router
module.exports = router