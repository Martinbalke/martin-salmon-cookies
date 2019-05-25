'use strict';
//modeling out the elements I will need in the DOM
const tbody_salesTableBody = document.getElementById('salesTableBody');
const tfoot_salesTableFooter = document.getElementById('salesTableFooter');
const form_newStoreForm = document.getElementById('newStoreForm');

//initialize an array to store all of the stores inside
const storeArray = [];
const timeArray = ['6:00 AM ', '7:00 AM ', '8:00 AM ', '9:00 AM ', '10:00 AM ', '11:00 AM ', '12:00 PM ', '1:00 PM ', '2:00 PM ', '3:00 PM ', '4:00 PM ', '5:00 PM ', '6:00 PM ', '7:00 PM ', '8:00 PM ', 'Total Cookies Sold'];

//takes in a stores min and max customers and generates a random number of customers per hour
function customerNumber(store){
  return Math.ceil(Math.random() * (store.maxCust - store.minCust + 1) + store.minCust);
}
//generates a random number of cookies sold at each store
function cookiesSold(store){
  return Math.ceil(customerNumber(store) * store.avgCookies);
}
//logs the cookies sold each hour and pushes them on to the store as an object

function cookiesPerDay(store){
  let total = 0;
  for(let i = 0; i < timeArray.length-1; i++){
    let cookiesThisHour = cookiesSold(store);
    store.cookiesSold.push(cookiesThisHour);
    total += cookiesThisHour;
  }
  store.cookiesSold.push(total);
}
// function cookiesPerDay(storeArray){
//   let total = 0;
//   for(let j = 0; j < storeArray.length; j++){
//     for(let i = 0; i < timeArray.length-1; i++){
//       let cookiesThisHour = cookiesSold(storeArray[j]);
//       storeArray[j].cookiesSold.push(cookiesThisHour);
//       total += cookiesThisHour;
//     }
//     storeArray[j].cookiesSold.push(total);

//   }
// }

//constructor function to create a new instance of a store.
function StoreConstructor(name, minCust, maxCust, avgCookies){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cookiesSold = [];
  storeArray.push(this);
  cookiesPerDay(this);
}

//creates a tr and populates it with table data for each store in the business
StoreConstructor.prototype.storeRows = function(){
  const tr_Gen = document.createElement('tr');
  tbody_salesTableBody.appendChild(tr_Gen);
  let td_Gen = document.createElement('td');
  let textNode = document.createTextNode(`${this.name}`);
  td_Gen.appendChild(textNode);
  tr_Gen.appendChild(td_Gen);
  for(let i = 0; i < this.cookiesSold.length; i++){
    let td_Gen = document.createElement('td');
    tr_Gen.appendChild(td_Gen);
    let textNode = document.createTextNode(`${this.cookiesSold[i]}`);
    td_Gen.appendChild(textNode);
  }
};

const firstAndPike = new StoreConstructor('First and Pike', 23, 65, 6.3);
const seaTacAirport = new StoreConstructor('SeaTac Airport', 3, 24, 1.2);
const seattleCenter = new StoreConstructor('Seattle Center' ,11, 38, 2.3);
const capitolHill = new StoreConstructor('Capitol Hill', 20, 38, 2.3);
const alki = new StoreConstructor('Alki', 2, 16, 4.6);


// creates an event listener for my input forms and then pushes that inside of the store constructor
form_newStoreForm.addEventListener('submit', populateNewStore);
function populateNewStore(e){
  e.preventDefault();
  let storeName = event.target.storeName.value;
  let minCust = event.target.minCust.value;
  let maxCust = event.target.maxCust.value;
  let avgCookies = event.target.avgCookies.value;

  new StoreConstructor(storeName, minCust, maxCust, avgCookies);
}
console.log(storeArray);
//Displays the timearray as a header of a table on the HTML
const displayHeader = function(timeArray){
  const tr_Gen = document.createElement('tr');
  tbody_salesTableBody.appendChild(tr_Gen);
  let th_Gen = document.createElement('th');
  tr_Gen.appendChild(th_Gen);
  let textNode = document.createTextNode('');
  th_Gen.appendChild(textNode);

  for(let i = 0; i < timeArray.length; i++){
    let th_Gen = document.createElement('th');
    tr_Gen.appendChild(th_Gen);
    let textNode = document.createTextNode(`${timeArray[i]}`);
    th_Gen.appendChild(textNode);
  }
};
displayHeader(timeArray);

//populating the table with store tows
firstAndPike.storeRows(); seattleCenter.storeRows(); seaTacAirport.storeRows(); capitolHill.storeRows(); alki.storeRows();

//populates hourstotal array with the total from each store
const hourTotals = ['Total'];
const totalPerHour = function(time){
  for(let i = 0; i < time.length; i++){
    let allStoresHour = 0;
    allStoresHour += firstAndPike.cookiesSold[i];
    allStoresHour += seattleCenter.cookiesSold[i];
    allStoresHour += seaTacAirport.cookiesSold[i];
    allStoresHour += capitolHill.cookiesSold[i];
    allStoresHour += alki.cookiesSold[i];
    hourTotals.push(allStoresHour);
  }
};
totalPerHour(timeArray);

// //create a tr for the total per hour from all stores
const tfootGen = function(array){
  const tr_Gen = document.createElement('tr');
  tfoot_salesTableFooter.appendChild(tr_Gen);
  for(let i = 0; i<array.length; i++){
    let td_Gen = document.createElement('td');
    let textNode = document.createTextNode(array[i]);
    td_Gen.appendChild(textNode);
    tr_Gen.appendChild(td_Gen);

  }
};

tfootGen(hourTotals);
