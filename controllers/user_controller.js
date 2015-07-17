var users = {admin: {id:1, username:"admin", pass:"1234"},
			 pepe:  {id:2, username:"pepe", pass:"5678"}
			 };


//comprueba si el usuario esta registrado en users.
//si autenticacion falla o hay errores se ejecuta callback(error)


exports.autenticar = function(login, pass, callback){
	console.log('ENTRA AQUI------------------');
	
	if(users[login]){
		if(pass===users[login].pass){
			callback(null, users[login]);
		}else{
			callback(new Error('Password erroneo.'));
		}
	}else{
		callback(new Error('No existe el usuario.'));
	}
	
};	

