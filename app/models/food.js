const mongoose = require('mongoose')

const dishSchema = require('./dish')

const foodSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		cost: {
			type: Number,
			required: true
		},
		dishes: [dishSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

foodSchema.virtual('fullTitle').get(function () {
	return `${this.name} is a ${this.category} product and it costs: $${this.cost}`
})

module.exports = mongoose.model('Food', foodSchema)
