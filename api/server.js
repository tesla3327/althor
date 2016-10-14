const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Define constants
const PORT = 5000;
const PROSPECT_STUB = [
  {
    hostname: 'www.somewebsite.com',
    insights: {
      mobile: {
        speed: 89,
        usability: 90,
      },
      desktop: {
        speed: 95,
        usability: 93,
      },
    },
    screenshots: {
      mobile: 'screens/www.somewebsite.com.mobile.jpg',
      desktop: 'screens/www.somewebsite.com.desktop.jpg',
    }
  },
  {
    hostname: 'www.anotherwebsite.com',
    insights: {
      mobile: {
        speed: 45,
        usability: 69,
      },
      desktop: {
        speed: 87,
        usability: 85,
      },
    },
    screenshots: {
      mobile: 'screens/www.anotherwebsite.com.mobile.jpg',
      desktop: 'screens/www.anotherwebsite.com.desktop.jpg',
    }
  }
];

app.use( bodyParser.json() );
app.use( morgan('dev') );

// Test to make sure API is up and running
app.get('/hello', (req, res) => {
  res.send('Hello there!');
});

/**
 * Add a prospect object to the database
 {
    hostname,
    insights: {
      mobile,
      desktop,
    },
    screenshots: {
      mobile,
      desktop,
    },
 }
 */
app.post('/prospect', (req, res) => {
  const prospect = req.body.prospect;
  console.log('Adding new prospect to the database:');
  console.log( prospect );

  res.sendStatus(200);
});

/**
 * Return a list of prospects from the database
 */
app.get('/prospects', (req, res) => {
  res.send(PROSPECT_STUB);
});

/**
 * Check if a hostname has already been crawled
 */
app.get('/hostCrawled/:host', (req, res) => {
  const hostname = req.params.host;

  if (hostname === 'www.somewebsite.com' ||
      hostname === 'www.anotherwebsite.com') {
    res.send({ hostname, crawled: true });
  } else {
    res.send({ hostname, crawled: false });
  }
});

/**
 * Add an email to the email queue
 */
app.post('/email', (req, res) => {
  res.send('Posting email');
});

/**
 * Get a list of all emails in the queue
 */
app.get('/emails', (req, res) => {
  res.send('Return list of emails');
});

/**
 * Server configuration
 */
app.listen(PORT, () => {
  console.log(`API started on port ${PORT}.`);
});









