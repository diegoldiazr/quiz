//GET /quizes/question
exports.question = function(req, res){
	res.render('quizes/question', {
		title: 'Quiz',
		pregunta: 'Capital de Italia'
	});
};

//GET /quizes/answer
exports.answer = function(req, res){
	if (req.query.respuesta === 'Roma'){
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
};