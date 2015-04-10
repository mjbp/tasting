/*jslint browser: true*/

var Keys = {

  baseURL  : 'http://api.reimaginebanking.com/',
  bank     : 'ENT',
  customer : 'CUST',
  key      : 'YOUR_KEY',
  cust1    : '54b604dfa520e02948a0f52e',
  cust2    : '54b604dfa520e02948a0f57f',
  cust3    : '54b604dfa520e02948a0f583',

  buildUrl: function (category, level, key) {
    var formattedURL = this.baseURL + category + '?key=' + level + key;
    return formattedURL;
  },

  request: function (url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    return xmlHttp.responseText;
  }
};

module.exports = Keys;