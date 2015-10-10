var router = require('express').Router()
var Zaruka = require('../models/zaruka.js')

// add
router.post('/add', function(req, res) {
	var dateBought = convertDate(req.body.datum_zakoupeni)
	var dateRepairStart = convertDate(req.body.datum_opravy)
	var dateRepairEnd = convertDate(req.body.datum_ukonceni_opravy)

	var zaruka = new Zaruka({
		name: req.body.nazev,
		date_bought: dateBought,
		w_length: req.body.delka_zaruky,
		shop: req.body.obchod,
		place_stored: req.body.misto_ulozeni,
		date_repair_start: dateRepairStart,
		date_repair_end: dateRepairEnd
	})

	zaruka.save(function(err, post) {
		if(err)
			return next(err)
		else
			res.redirect(303, '/')
	})
})

// edit
router.post('/edit', function(req, res) {
	var dateBought = convertDate(req.body.datum_zakoupeni)
	var dateRepairStart = convertDate(req.body.datum_opravy)
	var dateRepairEnd = convertDate(req.body.datum_ukonceni_opravy)

	var zaruka = {
		name: req.body.nazev,
		date_bought: dateBought,
		w_length: req.body.delka_zaruky,
		shop: req.body.obchod,
		place_stored: req.body.misto_ulozeni,
		date_repair_start: dateRepairStart,
		date_repair_end: dateRepairEnd
	}

	console.log(zaruka)

	Zaruka.update({ _id: req.body.zaruka_id }, {$set: zaruka }, {upsert: true}, function(err) {
		if(err)
			console.log(err)

		res.redirect(303, '/')
	})
	
})

// remove
router.post('/remove', function(req, res) {
	var id = req.body.odstranit_zaruka_id
	Zaruka.remove({ _id: id }, function(err) {
		if(err)
			console.log(err)

		res.redirect(303, '/')
	})
})

function convertDate(dateToBeConverted) 
{
	if(dateToBeConverted) 
	{
		var dateSplit = dateToBeConverted.split('/')
		return new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0])
	} else
		return null
}

module.exports = router