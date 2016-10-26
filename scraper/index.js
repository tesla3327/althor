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
        console.log(`${result.hostname} has already been crawled.`);
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
    .then( postProspect )
    .then( () => {
      console.log(`Successfully stored ${result.hostname}`);
    });
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
const searchTerm = process.argv[2];
console.log(`Searching for: ${searchTerm}`);
getSearchResults(searchTerm)
  .then( results => {
    console.log(`Received ${results.length} search results.\n`, results);
    return results;
  })
  .then( results => results.forEach( filterCrawled ) );




