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

/* GET home page. */
router.get('/quizes/question', quizControllers.question);

/* GET home page. */
router.get('/quizes/answer', quizControllers.answer);

module.exports = router;
