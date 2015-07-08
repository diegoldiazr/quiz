var path = require('path');

//cargar modelo orm
var Sequelize = require('sequelize');

//user BBDD SQLite
var sequelize = new Sequelize(null, null, null,
{
	dialect: "sqlite", 
	storage:  "quiz.sqlite"
});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportar la definicion de tabla quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
//esta forma de usar el callback con success esta deprecado, ahora
//se usan las promesas.
sequelize.sync().success(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count) {
		if(count===0){//inicializamos la tabla solo si esta vacia
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			}).success(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});