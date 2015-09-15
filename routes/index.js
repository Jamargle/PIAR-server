var express = require('express');
var router = express.Router();

var poisController = require('../controller/poi_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//==========================================
// Rutas disponibles
//==========================================

//Queries
//GET all_pois	-> it returns all pois
//GET pois_by_location/:position?	-> it returns some pois near by a location given by its GPS coordinates

// Definición de rutas de /pois
router.get('/all_pois', poisController.show_all);
router.get('/pois_by_location/:position?', poisController.pois_by_location);

//POST create_poi	-> Create a new poi
//GET pois/:id?/edit	-> Edits a poi
//PUT pois/:id?	-> Update a poi
//DELETE pois/:id?	-> Delete a poi
router.post('/create_poi', poisController.create);
router.get('/pois/:id?/edit', poisController.edit);
router.put('/pois/:id?', poisController.update);
router.delete('/pois/:id?', poisController.destroy);



module.exports = router;
