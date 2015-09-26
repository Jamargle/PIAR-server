var models = require('../models/index.js');

var emptyPoi = models.Poi.build({
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
	res.render('map', { title: 'Mapa de pois', errors: []});
}

//********************************
// GET /new
exports.new = function(req, res) {
	console.log("id:"+emptyPoi.id_poi);
	console.log("id_usuario:"+emptyPoi.usuario_id_usuario);
	console.log("nombre:"+emptyPoi.nombre);
	console.log("multimedia:"+emptyPoi.multimedia);
	console.log("altitud:"+emptyPoi.altitud);
	console.log("latitud:"+emptyPoi.latitud);
	console.log("longitud:"+emptyPoi.longitud);
	console.log("categoria:"+emptyPoi.categoria);
	console.log("subcategoria:"+emptyPoi.subcategoria);
	console.log("deporte_principal:"+emptyPoi.deporte_principal);
	console.log("descripcion:"+emptyPoi.descripcion);
	console.log("sitio_web:"+emptyPoi.sitio_web);
	console.log("horario_apertura:"+emptyPoi.horario_apertura);
	console.log("horario_cierre:"+emptyPoi.horario_cierre);
	console.log("edad_minima:"+emptyPoi.edad_minima);
	console.log("edad_maxima:"+emptyPoi.edad_maxima);
	console.log("precio:"+emptyPoi.precio);

	res.render('new', {
		title: 'PI Manager', 
		newPoi: emptyPoi, 
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

	poi.save({fields: // save poi in DB
		[
		"usuario_id_usuario",
		"nombre",
		"multimedia", 
		"altitud",
		"latitud", 
		"longitud", 
		"categoria",
		"descripcion", 
		"sitio_web"
		]
		}).then( function(){ 
			console.log("insertado PI con exito");
			res.redirect('/');
		}).catch(function(error) {
		// Ooops, do some error-handling
		//http://docs.sequelizejs.com/en/latest/docs/instances/
		});

};


// PUT /update
exports.update = function(req, res) {

	console.log("Página para actualizarrrr el log es:" + req.body.newPoi.id_poi);
	//res.redirect('/');
/*	var poi = models.Poi.build( req.body.newPoi );

	res.render('new', {
		title: 'PI manager', 
		newPoi: poi, 
		errors: []
	});
*/

	//var poi = models.Poi.build( req.body.newPoi );
	
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


// DELETE /delete
exports.destroy = function(req, res) {
/*
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
*/
};


/**
 * Validation for decimal numbers (used for numbers from URLs)
 */
function isADecimal(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}



/**
 * Validation method for the form fields used to create and edit points
 */
var validatePoi = function() {
	//id_poi -> Validation not needed because it's null and then autoincremented in DB
	//usuario_id_usuario -> It's always 5 for pois created by this web service, it goes as hidden
	var usuario_id_usuario = document.getElementById('usuario_id_usuario').value;
	if (usuario_id_usuario !== 5) {
		console.log("usuario_id_usuario NO es correcto:" + poi.usuario_id_usuario);
		return false;
	}

	//nombre -> It can't be null nor empty nor 'Nombre del PI'
	var nombre = document.getElementById('nombre').value;
	if (nombre === null || nombre == '' || nombre == 'Nombre del PI' || nombre == 'PI name') {
		console.log("en nombre NO es correcto:" + nombre);
		document.getElementById('nombre').style.borderColor = 'red';
		return false;
	}

	//multimedia -> It can't be null nor empty nor 'URL de la imagen'
	var multimedia = document.getElementById('image').value;
	if (multimedia === null || multimedia == '' || multimedia == 'URL de la imagen' || multimedia == 'URL of image') {
		console.log("URL de la imagen NO es correcto:" + multimedia);
		document.getElementById('image').style.borderColor = 'red';
		return false;
	}

	//altitud -> It can't be null nor empty nor 0
	var altitude = document.getElementById('altitude').value;
	if (altitude === null || altitude == '' || altitude == 0) {
		console.log("La altitud NO es correcta:" + altitude);
		document.getElementById('altitude').style.borderColor = 'red';
		return false;
	}

	//latitud -> It can't be null nor empty nor 0
	var latitude = document.getElementById('latitude').value;
	if (latitude === null || latitude == '' || latitude == 0) {
		console.log("La latitud NO es correcta:" + latitude);
		document.getElementById('latitude').style.borderColor = 'red';
		return false;
	}

	//longitud -> It can't be null nor empty nor 0
	var longitude = document.getElementById('longitude').value;
	if (longitude === null || longitude == '' || longitude == 0) {
		console.log("La longitud NO es correcta:" + longitude);
		document.getElementById('longitude').style.borderColor = 'red';
		return false;
	}

	//categoria -> It can't be null nor empty nor 'Categoria'
	var categoria = document.getElementById('categ').value;
	if (categoria === null || categoria == '' || categoria == 'Categoria') {
		console.log("La categoria NO es correcta:" + categoria);
		document.getElementById('categ').style.borderColor = 'red';
		return false;
	}

	//subcategoria -> At the moment we don't use this field. It goes as hidden with null
	//deporte_principal -> At the moment we don't use this field. It goes as hidden with null
	
	//descripcion -> It can be null so it can be empty but nor 'Descripcion del PI'.
	var description = document.getElementById('description').value;
	if (description === null || description == '' || description == 'Descripcion del PI' || description == 'PI description') {
		console.log("La descripcion NO es correcta:" + description);
		document.getElementById('description').style.borderColor = 'red';
		return false;
	}

	//sitio_web -> It can be null so it can be empty but nor 'Web del PI'. Furthermore, it has to be a url
	var website = document.getElementById('website').value;
	if (website === null || website == '' || website == 'Web del PI' || website == 'PI website') {
		console.log("La descripcion NO es correcta:" + website);
		document.getElementById('website').style.borderColor = 'red';
		return false;
	}

	//horario_apertura -> At the moment we don't use this field. It goes as hidden with null
	//horario_cierre -> At the moment we don't use this field. It goes as hidden with null
	//edad_minima -> At the moment we don't use this field. It goes as hidden with null
	//edad_maxima -> At the moment we don't use this field. It goes as hidden with null
	//precio -> At the moment we don't use this field. It goes as hidden with null

}