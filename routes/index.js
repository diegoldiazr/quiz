var express = require('express');
var quizController = require('../controllers/quiz_controller');
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

router.get('/quizes',		 				quizController.showAll);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new', 					quizController.new);
router.post('/quizes/create',				quizController.create);

module.exports = router;
