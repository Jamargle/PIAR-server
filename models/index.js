var path = require('path');

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  url[1],
      protocol: url[1],
      port:     url[5],
      host:     url[4]
      //,
      //logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize("basededatosespacial", "root", "mysql1234");
  }
  // Importar definicion de la tabla Poi
  var poi_path = path.join(__dirname,'poi.js');

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Poi:      sequelize.import(poi_path) 
    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db