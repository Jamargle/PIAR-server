//http://scotch.io/tutorials/javascript/learn-to-use-the-new-router-in-expressjs-4

// BASE SETUP
// =============================================================================
var express = require('express'),
	app = express();
var bodyParser = require('body-parser');
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

/*
// IMPORT MODELS
// =============================================================================
// db config
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var Sequelize = require('sequelize')
	, sequelize = new Sequelize(
	config.database,
	config.user,
	config.password, {
	    dialect: config.driver,
	    port: config.port,
	    logging: console.log, 
	    define: {
	    	timestamps: false //Timestamp columns -> false
	    }
	});

sequelize
	.authenticate()
  	.complete(function(err) {
    	if (!!err) {
      		console.log('Unable to connect to the database:', err);
    	} else {
      		console.log('Connection has been established successfully.');
      		// START THE SERVER
			// =============================================================================
			app.listen(port);
			console.log('Listening on port ' + port);
    	}
  	});
*/

var model = require("./model")(sequelize);
var Poi = model.Poi;
var router = express.Router();


// REGISTER OUR ROUTES (esto debería ir en otro archivo...)
// =============================================================================
app.use('/pfc_api', router);

// IMPORT routes 
// =============================================================================

router.route('/pois_by_location/:valor?')
.get (function(req,res) {
	if (req.query.lat && isADecimal(req.query.lat) &&
		req.query.lon && isADecimal(req.query.lon) &&
		req.query.dist && isADecimal(req.query.dist)) {

		sequelize.query(
			"SELECT * " +
			"FROM poi " +
			"WHERE " +
				"(6371 * acos( cos((" + req.query.lat + " * PI() / 180)) * " +
				"cos((Latitud * PI() / 180)) * cos((Longitud * PI() / 180) - " +
				"(" + req.query.lon + " * PI() / 180)) + sin((" + req.query.lat + 
				" * PI() / 180)) * sin((Latitud * PI() / 180)) )) < '" + req.query.dist + "'"
		).then(function (pois) {
			res.json({"api_pfc" :pois});
		}).catch(function (err) {
			//console.log(err);
			res.send("User not found");
		});
	}else{
		res.send("404, Bad URL");
	}
});


router.route('/all_pois/')
.get (function(req,res) {
	Poi.findAll()
	.then(function (pois) {
		res.json({"api_pfc" :pois});
	}).catch(function (err) {
		//console.log(err);
		res.send("User not found");
	});
});



/**
 * Método para validar los valores numéricos pasados en URL
 */
function isADecimal(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}