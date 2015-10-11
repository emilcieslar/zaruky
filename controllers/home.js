	
	var router = require('express').Router()
	var Zaruka = require('../models/zaruka.js')
	var passport = require('passport')

	router.get('/', isLoggedIn, function(req, res) {
		
		Zaruka.find()
		.sort('-date_bought')
		.exec(function(err, zaruky) {
			if(err)
				res.render('home', { err: 'Nenalezeny žádné záruky' })
			else {
				res.render('home', { zaruky: zaruky })
			}
		})
	})

	router.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') })
	})

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}))

	router.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') })
	})

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}))

	router.get('/logout', function(req, res) {
		req.logout()
		res.redirect(303, '/')
	})


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next()
	res.redirect(303, '/login')
}

module.exports = router