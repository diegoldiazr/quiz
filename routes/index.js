var express = require('express');
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', 						quizController.load);

//rutas de sesion
router.get(		'/login',	sessionController.new);
router.post(	'/login',	sessionController.create);
router.get(		'/logout',	sessionController.destroy);
router.delete(	'/logout',	sessionController.destroy);


//rutas de quizes
router.get(		'/quizes',		 				quizController.showAll);
router.get(		'/quizes/:quizId(\\d+)', 		quizController.show);
router.get(		'/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get(		'/quizes/new', 					sessionController.loginRequired, quizController.new);
router.post(	'/quizes/create',				sessionController.loginRequired, quizController.create);
router.get(		'/quizes/:quizId(\\d+)/edit',	sessionController.loginRequired, quizController.edit);
router.put(		'/quizes/:quizId(\\d+)/update',	sessionController.loginRequired, quizController.update);
router.delete(	'/quizes/:quizId(\\d+)'	,		sessionController.loginRequired, quizController.delete);

//rutas de comentarios
router.get(		'/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post(	'/quizes/:quizId(\\d+)/comments', 		commentController.create);

module.exports = router;

