const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		cost: {
			type: Number,
			required: true
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

foodSchema.virtual('fullTitle').get(function () {
	return `${this.title} is a ${this.type} and it costs: $${this.cost}`
})

module.exports = mongoose.model('Food', foodSchema)
