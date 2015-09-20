module.exports = function(sequelize, DataTypes) {
	return sequelize.define('poi', {
		id_poi: { 
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		usuario_id_usuario: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 1
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: {msg: "-> Falta el nombre del PI"}}
		},
		multimedia: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: {msg: "-> Introduce la URL de una imagen"}}
		},
		altitud: {
			type: DataTypes.DECIMAL(5,1),
			allowNull: false,
			validate: { notEmpty: {msg: "-> Falta la altitud del PI"}}
		},
		latitud: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: { notEmpty: {msg: "-> Falta la coordenada Latitud del PI"}}
		},
		longitud: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: { notEmpty: {msg: "-> Falta la coordenada Longitud del PI"}}
		},
		categoria: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: {msg: "-> Falta la categoría del PI"}}
		},
		subcategoria: {
			type: DataTypes.STRING,
			allowNull: true
		},
		deporte_principal: {
			type: DataTypes.STRING,
			allowNull: true
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sitio_web: {
			type: DataTypes.STRING,
			allowNull: true
		},
		horario_apertura: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '00:00'
		},
		horario_cierre: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '00:00'
		},
		edad_minima: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		},
		edad_maxima: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		},
		precio: {
			type: DataTypes.FLOAT.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		}
	}, {
		tableName: 'poi',
		timestamps: false
	});
};

