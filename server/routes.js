const express = require('express');
const sgMail = require('@sendgrid/mail');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Server is Up and Running!!');
});

router.post('/invite', (req, res) => {
	const email = req.body.email;
	const room = req.body.room;
	//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	console.log(process.env);
	sgMail.setApiKey('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');
	const msg = {
		to: email,
		from: 'quickgist@support.com',
		subject: 'Your Room Invitation link is Ready',
		text: 'Invite friends to join the conversation with this link:',
		html: `<strong><a href="http://localhost:3000/?groupInvite=${room}">${room} group</a></strong>`
	};
	try {
		sgMail.send(msg);
		res.send('messge sent successfully');
	} catch (e) {
		res.send('error!!!!');
	}
});

module.exports = router;
