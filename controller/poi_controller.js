var models = require('../models/index.js');

//GET  /pois_by_location/:valor?
exports.pois_by_location = function(req, res) {
	if (req.query.lat && isADecimal(req.query.lat) &&
		req.query.lon && isADecimal(req.query.lon) &&
		req.query.dist && isADecimal(req.query.dist)) {

		models.sequelize.query(
			"SELECT * " +
			"FROM Poi " +
			"WHERE " +
				"(6371 * acos( cos((" + req.query.lat + " * PI() / 180)) * " +
				"cos((Latitud * PI() / 180)) * cos((Longitud * PI() / 180) - " +
				"(" + req.query.lon + " * PI() / 180)) + sin((" + req.query.lat + 
				" * PI() / 180)) * sin((Latitud * PI() / 180)) )) < '" + req.query.dist + "'"
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


//********************************
// POST /create_poi
exports.create = function(req, res) {

	/*  var quiz = models.Quiz.build( req.body.quiz );

	var err = quiz.validate();
	if (err){
		res.render('quizes/new', {quiz: quiz, errors: err.errors});
	}else{
		quiz // save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta", "tema"]})
			.then( function(){ res.redirect('/quizes')}) 
	}
  */
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