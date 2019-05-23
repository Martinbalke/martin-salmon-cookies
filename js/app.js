'use strict';
//modeling out the elements I will need in the DOM
const tbody_salesTableBody = document.getElementById('salesTableBody');

const timeArray = ['6:00 AM ', '7:00 AM ', '8:00 AM ', '9:00 AM ', '10:00 AM ', '11:00 AM ', '12:00 PM ', '1:00 PM ', '2:00 PM ', '3:00 PM ', '4:00 PM ', '5:00 PM ', '6:00 PM ', '7:00 PM ', '8:00 PM ', 'Total Cookies Sold'];

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
  let total = 0;
  for(let i = 0; i < timeArray.length; i++){
    let cookiesThisHour = cookiesSold(store);
    store.cookiesSold.push(cookiesThisHour);
    total += cookiesThisHour;
  }
  store.cookiesSold.push(total);
};
function StoreConstructor(minCust, maxCust, avgCookies){
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cookiesSold = [];
}
const firstAndPike = new StoreConstructor(23, 65, 6.3);
const seaTacAirport = new StoreConstructor(3, 24, 1.2);
const seattleCenter = new StoreConstructor(11, 38, 2.3);
const capitolHill = new StoreConstructor(20, 38, 2.3);
const alki = new StoreConstructor(2, 16, 4.6);

//calling the function and populating the cookies sold objects
[firstAndPike, seattleCenter, seaTacAirport, capitolHill, alki].forEach(cookiesPerDay);

const displayHeader = function(timeArray){
  const tr_Gen = document.createElement('tr');
  tbody_salesTableBody.appendChild(tr_Gen);
  for(let i = 0; i < timeArray.length; i++){
    const th_Gen = document.createElement('th');
    tr_Gen.appendChild(th_Gen);
    const textNode = document.createTextNode(`${timeArray[i]}`);
    th_Gen.appendChild(textNode);
  }
};
displayHeader(timeArray);
const storeRows = function(storeCookies){
  const tr_Gen = document.createElement('tr');
  tbody_salesTableBody.appendChild(tr_Gen);
  for(let i = 0; i < storeCookies.length; i++){
    const td_Gen = document.createElement('td');
    tr_Gen.appendChild(td_Gen);
    const textNode = document.createTextNode(`${storeCookies[i]}`);
    td_Gen.appendChild(textNode);
  }
};
[firstAndPike.cookiesSold, seattleCenter.cookiesSold, seaTacAirport.cookiesSold, capitolHill.cookiesSold, alki.cookiesSold].forEach(storeRows);
// //create table row
// //itterate over the keys of cookiesSold to make a header
// //make a total th


// //create a table row
// //create a td with store name
// // create a td for each value in cookies sold
// //create a td for the total for that store


// //create a tr for the total per hour from all stores



// // const iterateAndDisplay = function(obj, location){
// //   Object.keys(obj).forEach( function(key){
// //     let docLI = document.createElement('li');
// //     docLI.appendChild(document.createTextNode(`${key}${obj[key]}`));
// //     location.appendChild(docLI);
// //   });
// // };
