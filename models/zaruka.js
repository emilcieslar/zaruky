// Time functions
var moment = require('moment')
// Db driver
var db = require('../db')
var Schema = db.Schema

var zarukaSchema = new Schema({
	name: { type: String, required: true },
	date_bought: { type: Date, required: true, default: Date.now() },
	w_length: { type: Number, required: true, default: 2 },
	shop: { type: String, required: true },
	place_stored: { type: String, required: true },
	date_repair_start: { type: Date },
	date_repair_end: { type: Date }
})

zarukaSchema.virtual('date_bought_string').get(function () {
	return convertDateToString(this.date_bought)
})

zarukaSchema.virtual('date_repair_start_string').get(function () {
	return convertDateToString(this.date_repair_start)
})

zarukaSchema.virtual('date_repair_end_string').get(function () {
	return convertDateToString(this.date_repair_end)
})

zarukaSchema.virtual('date_w_end').get(function() {
	var advancedByYear = moment(this.date_bought).add(this.w_length, 'years')
	// TODO: Count difference in dates when there's a repair
	advancedByYear = moment(advancedByYear).add(getDiff(this.date_repair_end, this.date_repair_start), 'days')
	return convertDateToString(advancedByYear)
})

function convertDateToString(dateToBeConverted) 
{
	if(dateToBeConverted)
	{
		var newDate = new Date(dateToBeConverted)
		return newDate.getDate() + "/" + (newDate.getMonth()+1) + "/" + newDate.getFullYear()
	}
}

function getDiff(first, second)
{
	var ms = moment(first).diff(moment(second));
	var d = moment.duration(ms).days();
	return d
}

var Zaruka = db.model('Zaruka', zarukaSchema)
module.exports = Zaruka