var path = require('path');

//Postgres DATABASE_URL = postgres://user:pass@host:port/database
//SQLite DATABASE_URL = sqlite://@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user 	= (url[2]||null);
var pwd 	= (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port 	= (url[5]||null);
var host	= (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargar modelo orm
var Sequelize = require('sequelize');

//user BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
{
	dialect: protocol, 
	protocol: protocol,
	port: port,
	host: host,
	storage: storage, //solo SQLite (.env)
	omitNull: true // solo postgres	
});


//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportar la definicion de tabla quiz
exports.Quiz = Quiz;

//Importar la definicion de la tabla Comment en comment.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

//indicar la relacion 1-N
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//exportar la definicion de tabla comment
exports.Comment = Comment;


//sequelize.sync() crea e inicializa la tabla de preguntas en DB
//esta forma de usar el callback con success esta deprecado, ahora
//se usan las promesas.
sequelize.sync().then(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count) {
		if(count===0){//inicializamos la tabla solo si esta vacia
			Quiz.create({
				pregunta: 	'Capital de Italia',
				respuesta: 	'Roma',
				tema: 		'otro'
			});
			Quiz.create({
				pregunta: 	'Capital de España',
				respuesta: 	'Madrid',
				tema: 		'otro'
			}).then(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});