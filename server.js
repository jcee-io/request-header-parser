const express = require('express');
const bodyParser = require('body-parser');
const osLocale = require('os-locale');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req,res) => {
	// ========== OS/UA INFO ===============
	const UA = req.headers['user-agent'];
	const openIndex = UA.indexOf('(');
	const closeIndex = UA.indexOf(')');
	const OSInfo = UA.slice(openIndex + 1, closeIndex);
	const software = OSInfo;

	// ========= IP AND LANGUAGE =============
	let ipaddress, language;

	axios('https://api.ipify.org?format=json')
	  .then(({ data }) => {
	  	ipaddress = data.ip;

	  	return osLocale();
	  })
	  .then(local => {
	  	language = local;
			res.json({ ipaddress, language, software });
	  });
});


app.listen(process.env.PORT || 3000);