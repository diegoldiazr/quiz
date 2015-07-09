//incluimos el acceso al modelo de DB
var models = require('../models/models.js');

//GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {
			title: 'Quiz',
			quiz: quiz
		});
	});	
};


//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {
				title: 'Quiz',
				quiz: quiz,
				respuesta: 'Correcto',
				linkText: 'vuelva a jugar',
				link: '/quizes/question'
			});
		} else {
			res.render('quizes/answer', {
				title: 'Quiz',
				quiz: quiz,
				respuesta: 'Incorrecto',
				linkText: 'intentelo otra vez',
				link: '/quizes/question'
			});
		}
	});	
};
