var models = require('../models/index.js');

//GET  /pois_by_location/:valor?
exports.pois_by_location = function(req, res) {
	if (req.query.lat && isADecimal(req.query.lat) &&
		req.query.lon && isADecimal(req.query.lon) &&
		req.query.dist && isADecimal(req.query.dist)) {

/********************************/
//Esta consulta no funciona ahora mismo
/********************************/
/*		models.sequelize.query(
			"SELECT * " +
			"FROM poi " +
			"WHERE " +
				"(6371 * acos( cos((" + req.query.lat + " * PI() / 180)) * " +
				"cos((latitud * PI() / 180)) * cos((longitud * PI() / 180) - " +
				"(" + req.query.lon + " * PI() / 180)) + sin((" + req.query.lat + 
				" * PI() / 180)) * sin((latitud * PI() / 180)) )) < '" + req.query.dist + "'"
		).then(function (pois) {
			res.json({"api_pfc" :pois});
		}).catch(function (err) {
			//console.log(err);
			res.send("Points not found:"+err);
		});
*/
		models.sequelize.query(
			"SELECT * " +
			"FROM poi " +
			"WHERE " +
				"(6371 * acos( cos(( :req_lat * PI() / 180)) * " +
				"cos((latitud * PI() / 180)) * cos((longitud * PI() / 180) - " +
				"(:req_lon * PI() / 180)) + sin((:req_lat" +
				" * PI() / 180)) * sin((latitud * PI() / 180)) )) < :req_dist",

			{ replacements: { 
				req_lat: req.query.lat,
				req_lon: req.query.lon,
				req_dist: req.query.dist 
			}, type: models.sequelize.QueryTypes.SELECT }
		).then(function (pois) {
			res.json({"api_pfc" :pois});
		}).catch(function (err) {
			//console.log(err);
			res.send("Points not found:"+err);
		});
	}else{
		res.send("404, Bad URL");
	}
};

//GET  /all_pois/
exports.show_all = function(req, res) {
	models.Poi.findAll()
	.then(function (pois) {
		res.json({"api_pfc" :pois});
	}).catch(function (err) {
		//console.log(err);
		res.send("Points not found:"+err);
	});
};


//See the documentation below for more details.
//https://developers.google.com/maps/documentation/javascript/reference

// GET /map
exports.showMap = function(req, res) {
	res.render('map', {title: 'Mapa de PoI'});

/*	
	pruebaPois = ["Cambil", "Madrid", "Jaén"];

	// Calls the initializeLiveMap() function when the page loads
	window.addEventListener('load', function() {
		console.log("windows!... a inicializara el mapa!");
		initializeMap(pruebaPois);
	});	

	// Vanilla JS way to listen for resizing of the window
	// and adjust map bounds

	window.addEventListener('resize', function(e) {
	  //Make sure the map bounds get updated on page resize
	  map.fitBounds(mapBounds);
	});
*/
}

//********************************
// GET /poi/new
exports.new = function(req, res) {
	var poi = models.Poi.build({
		//Show a form with default values for a poi
  		/*
  		pregunta: "Pregunta", 
    	respuesta: "Respuesta",
    	tema:"Otro"
    	*/
	});

	res.render('poi/new', {newPoi: poi, errors: []});
};



// POST /create_poi
exports.create = function(req, res) {
	var poi = models.Poi.build( req.body.poi );

	var err = poi.validate();
	if (err){
		res.render('poi/new', {newPoi: poi, errors: err.errors});
	}else{
		poi.save({fields: // save poi in DB
/*###############*/				["pregunta", "respuesta", "tema"]
			}).then( function(){ 
				res.redirect('/map');
			}); 
	}
};


// GET /pois/:id/edit
exports.edit = function(req, res) {
/*  
	var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
  */
};


// PUT /pois/:id
exports.update = function(req, res) {
/*  
	req.quiz.pregunta  = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	var err = req.quiz.validate();

	if (err) {
    	res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
  	} else {
	    req.quiz     // save: guarda campos pregunta y respuesta en DB
		    .save( {fields: ["pregunta", "respuesta", "tema"]})
		    .then( function(){ res.redirect('/quizes');});
  	}     // Redirección HTTP a lista de preguntas (URL relativo)
  */
};


// DELETE /pois/:id
exports.destroy = function(req, res) {
/*
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
*/
};


/**
 * Método para validar los valores numéricos pasados en URL
 */
function isADecimal(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}