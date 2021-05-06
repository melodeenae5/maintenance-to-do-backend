const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Task = mongoose.model('Task');
const passport = require('passport');

//test route
router.get('/test', (req, res) => res.send('tasks route testing!'));

//get all tasks for specific user
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Task.find({ user_id: req.user._id })
			.then((tasks) => res.json(tasks))
			.catch((err) =>
				res.status(404).json({ success: false, msg: 'Error finding tasks' })
			);
	}
);

//get task by id
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Task.findById(req.params.id)
			.then((task) => res.json(task))
			.catch((err) =>
				res.status(404).json({ success: false, msg: 'No Task Found' })
			);
	}
);

//add new task
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Task.create({
			user_id: req.body.user_id,
			description: req.body.description,
			complete: req.body.complete,
		})
			.then((task) =>
				res.status(201).json({ success: true, msg: 'Task added successfully' })
			)
			.catch((err) =>
				res.status(400).json({ success: false, msg: 'Unable to add task' })
			);
	}
);

//find task by id and update
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Task.findByIdAndUpdate(req.params.id, {
			user_id: req.body.user_id,
			description: req.body.description,
			complete: req.body.complete,
		})
			.then((task) =>
				res
					.status(200)
					.json({ success: true, msg: 'Task updated successfully' })
			)
			.catch((err) =>
				res.status(400).json({ success: false, msg: 'Unable to update task' })
			);
	}
);

//find task by id and delete
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Task.findByIdAndRemove(req.params.id, req.body)
			.then((task) =>
				res
					.status(200)
					.json({ success: true, msg: 'Task deleted successfully' })
			)
			.catch((err) =>
				res.status(400).json({ success: false, msg: 'No task found' })
			);
	}
);

module.exports = router;
