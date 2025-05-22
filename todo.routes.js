const router = require('express').Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/todo.controller');

router.use(auth);
router.get('/summary', controller.getSummary);
router.get('/', controller.getTodos);
router.post('/', controller.addTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
