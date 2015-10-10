var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/zaruky', function() {
	console.log('mongodb connected')
})

module.exports = mongoose