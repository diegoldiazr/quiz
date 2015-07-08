//incluimos el acceso al modelo de DB
var models = require('../models/models.js');

//GET /quizes/question
//cambiamos este metodo para adaptarlo al acceso a base de datos.
//exports.question = function(req, res){
//	res.render('quizes/question', {
//		title: 'Quiz',
//		pregunta: 'Capital de Italia'
//	});
//};

exports.question = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question', {
			title: 'Quiz',
			pregunta: quiz[0].pregunta
		});
	});	
};

//fin del cambio 


//GET /quizes/answer
//cambiamos este metodo para adaptarlo al acceso a base de datos.
//exports.answer = function(req, res){
//	if (req.query.respuesta === 'Roma'){
//		res.render('quizes/answer', {
//			title: 'Quiz',
//			respuesta: 'Correcto',
//			linkText: 'vuelva a jugar',
//			link: '/quizes/question'
//		});
//	} else {
//		res.render('quizes/answer', {
//			title: 'Quiz',
//			respuesta: 'Incorrecto',
//			linkText: 'intentelo otra vez',
//			link: '/quizes/question'
//		});
//	}
//};

exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {
				title: 'Quiz',
				respuesta: 'Correcto',
				linkText: 'vuelva a jugar',
				link: '/quizes/question'
			});
		} else {
			res.render('quizes/answer', {
				title: 'Quiz',
				respuesta: 'Incorrecto',
				linkText: 'intentelo otra vez',
				link: '/quizes/question'
			});
		}
	});

	
};

//fin del cambio 