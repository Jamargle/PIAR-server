var path = require('path');
console.log("Ha llegao al models/index.js y el global.... es:"+!global.hasOwnProperty('db'));
if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;
console.log("el HEROKU.... es:"+process.env.HEROKU_POSTGRESQL_BRONZE_URL);
  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
      dialect:  url[1],
      protocol: url[1],
      port:     url[5],
      host:     url[4],
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize("basededatosespacial", "root", "mysql1234");
  }
console.log("sequelize vale:"+sequelize+"\ny __dirname:"+__dirname+"\ny pathjoin:"+poi_path);
  // Importar definicion de la tabla Poi
  var poi_path = path.join(__dirname,'poi.js');
  console.log("sequelize vale:"+sequelize+"\ny __dirname:"+__dirname+"\ny pathjoin:"+poi_path);
//  var Poi = sequelize.import(poi_path);

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