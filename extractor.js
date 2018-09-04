;(function($, undefined) {

  // Start the scraper
  artoo.log.debug('Starting the scraper...');
  // var ui = new artoo.ui();
  // ui.$().append('<div style="position:fixed; top:35px; left:25px; background-color: #000; color: #FFF; z-index:1000">Scraping in progress... this may take a few minutes! DO NOT CLICK THE EXTENSION AGAIN!</div>');
  // var uber = artoo.scrape(scraper);
  class UberScraper {

    constructor() {
      this.currentWeekly = this.getWeeklyButtons();
      this.currentButton = 1;
      this.previousButton = this.getPreviousButton(this.currentWeekly[0]);
    }
  
    getWeeklyButtons() {
      return [...document.getElementsByTagName('a')].filter(link => {
        if (link.href) {
          return link.href.includes(`payments/weekly-earnings/`);
        } else {
          return false;
        }
      }).reverse();
    }
  
    getPreviousButton(sibling) {
      return [...sibling.parentNode.getElementsByTagName('div')]
        .filter(elem => elem.innerText === 'Previous')[0];
    }
    
    getUrls(months) {
      let urls = [];
      let counter = 0;
      let id = setInterval(() => {
        let links = this.getWeeklyButtons();
        urls = urls.concat(links);
        this.previousButton.click();
        counter += 1;
        if (counter > months) {
          clearInterval(id);
        }
      }, 500);
      return new Promise((resolve, reject)=> {
        return setTimeout(() => {
          resolve(urls.map(url => url.href));
        }, 500 * months);
      });
    }
  }
  let us = new UberScraper();
  let parser = new DOMParser();
  us.getUrls(12).then(urls => {
    artoo.log.debug(urls);
    artoo.ajaxSpider(urls, {
      process: (data) => {
        let doc = parser.parseFromString(data, "text/html");
        return Object.values(JSON.parse(doc.getElementById('json-globals').innerHTML).state.weeklyEarnings.weeklyEarningsByWeekOffset)[0].earnings
      },
      throttle: 1000,
    }, data => {
      data = data.filter(val => val.tripStats.tripCount > 0)
      artoo.saveJson({data: data}, {filename: 'uber-trips.json'});
    });
  }); 
}).call(this, artoo.$);