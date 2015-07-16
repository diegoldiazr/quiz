//incluimos el acceso al modelo de DB
var models = require('../models/models.js');

//get new
exports.new = function(req, res){	
	res.render('comments/new', {quizId: req.params.quizId, errors: []});
};

//post create
exports.create = function(req, res){
	
	var comment = models.Comment.build(
		{
			texto : req.body.comment.texto,
			QuizId: req.params.quizId	
		});
	
	console.log("-----------------");
	console.log("valor de comment: " + comment);
	console.log("valor de validate: " + comment.validate());

	//validamos
	comment.validate().then(function(err){
		if (err){
			res.render('comments/new', {comment:comment, errors:err.errors});
		}else{
			comment.save({fields: ["texto", "QuizId"]}).then(function(){
				res.redirect('/quizes/' + req.params.quizId);
			});		
		}
	});	
};
