const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Import models
const Prospect = require('./models/Prospect');
const SCREENSHOT_PATH = '../scraper/images/';

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
  console.log(prospect);

  // Create a new Prospect obj
  const newProspect = new Prospect(prospect);

  // Save to the db
  newProspect.save()
    .then( savedObj => {
      console.log('Successfully added new Prospect to the database');
      res.sendStatus(200);
    })
    .catch( err => {
      console.error('Error saving object to db.');
      console.error(err);
    });
});

/**
 * Return a list of prospects from the database
 */
app.get('/prospects', (req, res) => {
  Prospect.find()
    .then( data => res.send(data) );
});

/**
 * Check if a hostname has already been crawled
 */
app.get('/hostCrawled/:host', (req, res) => {
  const hostname = req.params.host;

  Prospect.find({ hostname })
    .then( result => {
      if (result.length > 0) {
        res.send({ crawled: true });
      } else {
        res.send({ crawled: false });
      }
    });
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

const getScreenshot = (isMobile, host, res) => {
  const filePath = `${SCREENSHOT_PATH}${host}.${isMobile ? 'mobile' : 'desktop'}.jpg`;
  res.sendFile(path.resolve(__dirname, filePath));
};

/**
 * Get mobile screenshot
 */
app.get('/screenshot/mobile/:host', (req, res) => getScreenshot(true, req.params.host, res) );

/**
 * Get desktop screenshot
 */
app.get('/screenshot/desktop/:host', (req, res) => getScreenshot(false, req.params.host, res) );

/**
 * Server configuration
 */
mongoose.connect('mongodb://localhost/althor');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (err) => console.error(err) );

// Start the server once we have connected to the db
db.once('open', () => {
  console.log('Database connection established.');

  app.listen(PORT, () => {
    console.log(`API started on port ${PORT}.`);
  });
});









