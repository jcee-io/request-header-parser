const express = require('express');
const bodyParser = require('body-parser');
const osLocale = require('os-locale');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', async (req,res) => {
	const UA = req.headers['user-agent'];
	const openIndex = UA.indexOf('(');
	const closeIndex = UA.indexOf(')');

	console.log(req.headers);
	console.log(req.ip);
	const OSInfo = UA.slice(openIndex + 1, closeIndex);

	const { data } = await axios('https://api.ipify.org?format=json');
	const ipaddress = req.ip;
	const language = await osLocale();
	const software = OSInfo;

	res.json({ ipaddress, language, software });
});


app.listen(process.env.PORT || 3000);