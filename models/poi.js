module.exports = function(sequelize, DataTypes) {
	return sequelize.define('poi', {
		id_poi: { 
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
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
			allowNull: false
		},
		multimedia: {
			type: DataTypes.STRING,
			allowNull: false
		},
		altitud: {
			type: DataTypes.DECIMAL(5,1),
			allowNull: false
		},
		latitud: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		longitud: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		categoria: {
			type: DataTypes.STRING,
			allowNull: false
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

