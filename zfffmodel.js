var Sequelize = require('sequelize');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(
	DB_name, 
	user, 
	pwd, { 
		dialect:  protocol,
    	protocol: protocol,
    	port:     port,
	    host:     host,
    	omitNull: true      // solo Postgres
  	}      
);

sequelize.authenticate()
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

module.exports = function(sequelize) {
	var Poi = sequelize.define('poi', {
		ID_Poi: { 
			type: Sequelize.INTEGER.UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		Usuario_ID_usuario: {
			type: Sequelize.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 1
		},
		Nombre: {
			type: Sequelize.STRING,
			allowNull: false
		},
		Multimedia: {
			type: Sequelize.STRING,
			allowNull: false
		},
		Altitud: {
			type: Sequelize.DECIMAL(5,1),
			allowNull: false
		},
		Latitud: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		Longitud: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		Categoria: {
			type: Sequelize.STRING,
			allowNull: false
		},
		Subcategoria: {
			type: Sequelize.STRING,
			allowNull: true
		},
		Deporte_principal: {
			type: Sequelize.STRING,
			allowNull: true
		},
		Descripcion: {
			type: Sequelize.STRING,
			allowNull: true
		},
		Sitio_web: {
			type: Sequelize.STRING,
			allowNull: true
		},
		Horario_apertura: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '00:00'
		},
		Horario_cierre: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: '00:00'
		},
		Edad_minima: {
			type: Sequelize.INTEGER.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		},
		Edad_maxima: {
			type: Sequelize.INTEGER.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		},
		Precio: {
			type: Sequelize.FLOAT.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		}
	}, {
		tableName: 'poi',
		timestamps: false
	});

	return {
		Poi: Poi
	};
};

