module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Poi', {
		ID_Poi: { 
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		Usuario_ID_usuario: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 1
		},
		Nombre: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Multimedia: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Altitud: {
			type: DataTypes.DECIMAL(5,1),
			allowNull: false
		},
		Latitud: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		Longitud: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		Categoria: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Subcategoria: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Deporte_principal: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Descripcion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Sitio_web: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Horario_apertura: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '00:00'
		},
		Horario_cierre: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '00:00'
		},
		Edad_minima: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		},
		Edad_maxima: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		},
		Precio: {
			type: DataTypes.FLOAT.UNSIGNED,
			allowNull: true,
			defaultValue: 0
		}
	}, {
		tableName: 'Poi',
		timestamps: false
	});

	return {
		Poi: Poi
	};
};

