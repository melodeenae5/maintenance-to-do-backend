const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/api/tasks', require('./api/tasks'));

module.exports = router;
