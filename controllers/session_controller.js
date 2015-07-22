exports.loginRequired = function(req, res, next){
	if (req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}

//get login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/login', {errors:errors});
}

//post create
exports.create = function(req, res){
	var login = req.body.login;
	var pass  = req.body.pass;

	var userController = require('./user_controller');	

	userController.autenticar(login, pass, function(error, user){
		if (error){
			req.session.errors=[{'message':'Se ha producido un error: ' +error}];
			res.redirect('/login');
			return;
		}

		//crear req.session.user y guardar campos
		// la sesion se define por la existencia de: req.session.user
		req.session.user = {id:user.id, username:user.username};

		res.redirect(req.session.redir.toString());
	});
}

//delete destroy
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString()); //redirect a path anterior a login
	
}

