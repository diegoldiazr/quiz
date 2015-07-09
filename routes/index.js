var express = require('express');
var quizControllers = require('../controllers/quiz_controller');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz' });
});

router.get('/quizes', 						quizControllers.index);
router.get('/quizes/:quizId(\\d+)', 		quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizControllers.answer);

module.exports = router;
