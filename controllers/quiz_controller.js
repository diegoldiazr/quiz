//incluimos el acceso al modelo de DB
var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error){next(error);});	
}

//GET /quizes/
exports.showAll = function(req, res){
	var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g, '%');

	if (filtro){
		models.Quiz.findAll({
			where: ["pregunta like ?", condicion],
			order: [['pregunta', 'ASC']]
		}).then(
			function(quizes){
				res.render('quizes', {
					title: 'Quiz',
					quizes: quizes
				});
			}).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes', {
					title: 'Quiz',
					quizes: quizes
				});
			}
		).catch(function(error){next(error);});	
	}
};

//GET /quizes/:id
exports.show = function(req, res){	
	res.render('quizes/show', {
		title: 'Quiz',
		quiz: req.quiz
	});
};


//GET /quizes/:id/answer
exports.answer = function(req, res){	
	if (req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer', {
			title: 'Quiz',
			quiz: req.quiz,
			respuesta: 'Correcto',
			linkText: 'vuelva a jugar',
			link: '/quizes'
		});
	} else {
		res.render('quizes/answer', {
			title: 'Quiz',
			quiz: req.quiz,
			respuesta: 'Incorrecto',
			linkText: 'intentelo otra vez',
			link: '/quizes/'+ req.quiz.id 
		});
	}
};


//get new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
			{pregunta: "Pregunta",
			respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz:quiz});
};

//post create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	});
};