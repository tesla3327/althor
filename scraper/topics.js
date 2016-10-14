const fetch = require('node-fetch');
const _ = require('lodash');
const key = 'AIzaSyBmIXcnKX4iaQ2vW2K2HNeIdL-3RDNNM6k';
const cheerio = require('cheerio');

const extractEmails = (results) => {
	extractEmailsFromPage(results[0].body);
};

const extractEmailsFromPage = (page) => {
	const $ = cheerio.load(page);

	let text = '';
	$('html').each( (index, elem) => {
		text += $(elem).text().trim() + ' ';
	});

	console.log(text.indexOf('@'));
};

module.exports = {
	extractEmails,
};
