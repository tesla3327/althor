const getSearchResults = require('./google');
const Pagespeed = require('./pagespeed');
const Screenshot = require('./screenshot');
const fetch = require('node-fetch');

const logResultCount = (results) => {
  console.log(`Recieved ${results.length} results.`);
  return results;
};

const logResult = (result) => {
  console.log('----------------------------');
  console.log(result.hostname);
  return result;
};

const mapPageSpeedResult = (result) => {
  return Pagespeed.getResults(result.hostname)
    .then( insight => Object.assign({}, result, insight) );
};

const filterCrawled = (result) => {
  prospectCrawled(result)
    .then( crawled => {
      // We don't want to crawl this host again
      if (crawled) {
        return;
      } else {
        processResult(result);
      }
    });
};

const postProspect = (prospect) => {
  return fetch('http://localhost:5000/prospect', {
    method: 'POST',
    body: JSON.stringify({ prospect }),
    headers: { 'Content-Type': 'application/json' },
  })
  .catch( console.error );
};

/**
 * This is where the main processing happens
 */
const processResult = (result) => {
  mapPageSpeedResult(result)
    .then( logResult )
    .then( postProspect );
};

/**
 * Returns whether or not we have been to this host or not
 */
const prospectCrawled = (result) => {
  return fetch('http://localhost:5000/hostCrawled/' + result.hostname)
    .then( data => data.json() )
    .then( json => json.crawled );
};

// Kick it all off
getSearchResults('lawyer cambridge')
  .then( results => results.forEach( filterCrawled ) );




