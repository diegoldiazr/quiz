//incluimos el acceso al modelo de DB
var models = require('../models/models.js');

exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {
			title: 'Quiz',
			pregunta: quiz.pregunta
		});
	});	
};

//fin del cambio 

exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
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