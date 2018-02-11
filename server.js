const express = require('express');
const bodyParser = require('body-parser');
const ip = require('public-ip');
const osLocale = require('os-locale');
const UAparser = require('ua-parser-js');

const parser = new UAparser();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', async (req,res) => {
	const UA = req.headers['user-agent'];
	const openIndex = UA.indexOf('(');
	const closeIndex = UA.indexOf(')');

	const OSInfo = UA.slice(openIndex + 1, closeIndex);

	const ipaddress = await ip.v4();
	const language = await osLocale();
	const software = OSInfo;

	res.json({ ipaddress, language, software });
});


app.listen(process.env.PORT || 3000);