//incluimos el acceso al modelo de DB
var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
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
				res.render('quizes/showAll', {
					title: 'Quiz',
					quizes: quizes,
					errors: []
				});
			}).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes/showAll', {
					title: 'Quiz',
					quizes: quizes,
					errors: []
				});
			}
		).catch(function(error){next(error);});	
	}
};

//GET /quizes/:id
exports.show = function(req, res){	
	res.render('quizes/show', {
		title: 'Quiz',
		quiz: req.quiz,
		errors: []		
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
			link: '/quizes',
			errors: []
		});
	} else {
		res.render('quizes/answer', {
			title: 'Quiz',
			quiz: req.quiz,
			respuesta: 'Incorrecto',
			linkText: 'intentelo otra vez',
			link: '/quizes/'+ req.quiz.id,
			errors: []
		});
	}
};


//get new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
			{pregunta: "",
			respuesta: ""}
		);
	res.render('quizes/new', {quiz:quiz, errors: []});
};

//post create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	
	console.log("hola prueba-----------------");
	console.log("valor de quiz: " + quiz);
	console.log("valor de validate: " + quiz.validate());

	//validamos
	quiz.validate().then(function(err){
		if (err){
			res.render('quizes/new', {quiz:quiz, errors:err.errors});
		}else{
			quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes');
			});		
		}
	});	
};

//get EDIT
exports.edit = function(req, res){	
	res.render('quizes/edit', {
		title: 'Quiz',
		quiz: req.quiz,	
		errors: []
	});
};

//put UPDATE
exports.update = function(req, res){

	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	
	//validamos
	req.quiz.validate().then(function(err){
		if (err){
			res.render('quizes/edit', {quiz:quiz, errors:err.errors});
		}else{
			req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes');
			});		
		}
	});	
};