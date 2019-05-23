'use strict';
//modeling out the elements I will need in the DOM
const ul_salesFirstAndPike = document.getElementById('salesFirstAndPike');
const ul_salesSeatacAirport = document.getElementById('salesSeatacAirport');
const ul_salesCapitolHill = document.getElementById('salesCapitolHill');
const ul_salesSeattleCenter = document.getElementById('salesSeattleCenter');
const ul_salesAlki = document.getElementById('salesAlki');

//takes in a stores min and max customers and generates a random number of customers per hour
let customerNumber = function(store){
  return Math.ceil(Math.random() * (store.maxCust - store.minCust + 1) + store.minCust);
};
//generates a random number of cookies sold at each store
let cookiesSold = function(store){
  return Math.ceil(customerNumber(store) * store.avgCookies);
};
//logs the cookies sold each hour and pushes them on to the store as an object

let cookiesPerDay = function(store){
  let amPM = 'AM';
  let total = 0;
  for(let i = 6; i < 22; i++){
    let cookiesThisHour = 0;
    cookiesThisHour += cookiesSold(store);
    if(i < 12){
      total += cookiesThisHour;
      store.cookiesSold[`${i}:00 ${amPM} `] = cookiesThisHour;
    }else if(i === 12){
      amPM = 'PM';
      store.cookiesSold[`${i}:00 ${amPM} `] = cookiesThisHour;
    } else if(i > 13){
      store.cookiesSold[`${i - 13}:00 ${amPM} `] = cookiesThisHour;
      total += cookiesThisHour;
    }
  }
  store.cookiesSold[`Total: `] = total;
};
function StoreConstructor(minCust, maxCust, avgCookies){
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cookiesSold = {};
}
const firstAndPike = new StoreConstructor(23, 65, 6.3);
const seaTacAirport = new StoreConstructor(3, 24, 1.2);
const seattleCenter = new StoreConstructor(11, 38, 2.3);
const capitolHill = new StoreConstructor(20, 38, 2.3);
const alki = new StoreConstructor(2, 16, 4.6);

//calling the function and populating the cookies sold objects
[firstAndPike, seattleCenter, seaTacAirport, capitolHill, alki].forEach(cookiesPerDay);

//iterates over the nested objects inside each store and displays them inside of a li which is appended to the parent UL
const iterateAndDisplay = function(obj, location){
  Object.keys(obj).forEach( function(key){
    let docLI = document.createElement('li');
    docLI.appendChild(document.createTextNode(`${key}${obj[key]}`));
    location.appendChild(docLI);
  });
};

//calling the function to display all cookies sold as LI
iterateAndDisplay(firstAndPike.cookiesSold, ul_salesFirstAndPike);
iterateAndDisplay(seattleCenter.cookiesSold, ul_salesSeattleCenter);
iterateAndDisplay(seaTacAirport.cookiesSold, ul_salesSeatacAirport);
iterateAndDisplay(capitolHill.cookiesSold, ul_salesCapitolHill);
iterateAndDisplay(alki.cookiesSold, ul_salesAlki);
