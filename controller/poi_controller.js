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
	res.render('map', { title: 'Mapa de pois'});
}

//********************************
// GET /new
exports.new = function(req, res) {
	var poi = models.Poi.build({
		//Show a form with default values for a poi
  		id_poi: null,
  		usuario_id_usuario: 5,
  		
  		nombre: 'Nombre del PI',
  		multimedia: 'URL de la imagen',
  		altitud: 0,
  		latitud: 0,
  		longitud: 0,
  		categoria: 'Categoria',
  		subcategoria: null,
  		deporte_principal: null,
  		descripcion: 'Descripcion del PI',
  		sitio_web: 'Web del PI',
  		horario_apertura: null,
  		horario_cierre: null,
		edad_minima: null,
		edad_maxima: null,
		precio: null
	});

	res.render('new', {
		title: 'Crea un nuevo PI', 
		newPoi: poi, 
		errors: []
	});
};



// POST /create_poi
exports.create = function(req, res) {
	var poi = models.Poi.build( req.body.newPoi );


console.log("id:"+req.body.newPoi.id_poi+" y para poi:" + poi.id_poi + "\n");
console.log("id_usuario:"+req.body.newPoi.usuario_id_usuario+" y para poi:" + poi.usuario_id_usuario + "\n");
console.log("nombre:"+req.body.newPoi.nombre+" y para poi:" + poi.nombre + "\n");
console.log("multimedia:"+req.body.newPoi.multimedia+" y para poi:" + poi.multimedia + "\n");
console.log("altitud:"+req.body.newPoi.altitud+" y para poi:" + poi.altitud + "\n");
console.log("latitud:"+req.body.newPoi.latitud+" y para poi:" + poi.latitud + "\n");
console.log("longitud:"+req.body.newPoi.longitud+" y para poi:" + poi.longitud + "\n");
console.log("categoria:"+req.body.newPoi.categoria+" y para poi:" + poi.categoria + "\n");
console.log("subcategoria:"+req.body.newPoi.subcategoria+" y para poi:" + poi.subcategoria + "\n");
console.log("deporte_principal:"+req.body.newPoi.deporte_principal+" y para poi:" + poi.deporte_principal + "\n");
console.log("descripcion:"+req.body.newPoi.descripcion+" y para poi:" + poi.descripcion + "\n");
console.log("sitio_web:"+req.body.newPoi.sitio_web+" y para poi:" + poi.sitio_web + "\n");
console.log("horario_apertura:"+req.body.newPoi.horario_apertura+" y para poi:" + poi.horario_apertura + "\n");
console.log("horario_cierre:"+req.body.newPoi.horario_cierre+" y para poi:" + poi.horario_cierre + "\n");
console.log("edad_minima:"+req.body.newPoi.edad_minima+" y para poi:" + poi.edad_minima + "\n");
console.log("edad_maxima:"+req.body.newPoi.edad_maxima+" y para poi:" + poi.edad_maxima + "\n");
console.log("precio:"+req.body.newPoi.precio+" y para poi:" + poi.precio + "\n");
	
	poi.altitud = parseFloat(req.body.newPoi.altitud).toFixed(1);

	var err = poi.validate();

	if (err !== undefined) {
console.log("1 error:" + err + " y errors:" + err.errors+"\n\n");		
		res.render('new', {newPoi: poi, title: 'Crea un nuevo PI', errors: err.errors});
	}else{
console.log("2 a guardar:" + poi.nombre+"\n\n");
		poi.save({fields: // save poi in DB
			[ 
			"id_usuario",
			"nombre",
			"multimedia", 
			"altitud",
			"latitud", 
			"longitud", 
			"categoria",
			"descripcion", 
			"sitio_web",
			"precio"
			]
			}).then( function(){ 
				console.log("insertado PI con exito");
				res.redirect('/');
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