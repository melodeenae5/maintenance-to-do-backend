const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		res.status(200).json({ success: true, msg: 'You are authorized!' });
	}
);

//get all users
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.find()
			.then((users) => res.json(users))
			.catch((err) =>
				res.status(404).json({ success: false, msg: 'Error finding users' })
			);
	}
);

router.post('/login', function (req, res, next) {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				res.status(401).json({ success: false, msg: 'could not find user' });
			}
			const isValid = utils.validPassword(
				req.body.password,
				user.hash,
				user.salt
			);

			if (isValid) {
				const tokenObject = utils.issueJWT(user);

				res.status(200).json({
					success: true,
					token: tokenObject.token,
					expiresIn: tokenObject.expires,
					user: user,
					user_id: user._id,
					email: user.email,
				});
			} else {
				res
					.status(401)
					.json({ success: false, msg: 'you entered the wrong password' });
			}
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/register', function (req, res, next) {
	const saltHash = utils.genPassword(req.body.password);

	const salt = saltHash.salt;
	const hash = saltHash.hash;

	const newUser = new User({
		email: req.body.email,
		hash: hash,
		salt: salt,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		admin: req.body.admin,
	});
	try {
		newUser.save().then((user) => {
			const jwt = utils.issueJWT(user);

			res.json({
				success: true,
				user: user,
				token: jwt.token,
				expiresIn: jwt.expires,
				user_id: user._id,
				email: user.email,
			});
		});
	} catch (err) {
		res.json({ success: false, msg: err });
	}
});

module.exports = router;
