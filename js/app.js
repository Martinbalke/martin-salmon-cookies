'use strict';
//modeling out the elements I will need in the DOM
const tbody_salesTableBody = document.getElementById('salesTableBody');
const tfoot_salesTableFooter = document.getElementById('salesTableFooter');
const form_newStoreForm = document.getElementById('newStoreForm');

//initialize an array to store all of the stores inside
//populates hourstotal array with the total from each store
let hourTotals = ['Total'];
let storeArray = [];
const timeArray = ['6:00 AM ', '7:00 AM ', '8:00 AM ', '9:00 AM ', '10:00 AM ', '11:00 AM ', '12:00 PM ', '1:00 PM ', '2:00 PM ', '3:00 PM ', '4:00 PM ', '5:00 PM ', '6:00 PM ', '7:00 PM ', '8:00 PM ', 'Total Cookies Sold'];

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

//Displays the timearray as a header of a table on the HTML
function displayHeader(timeArray){
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
}


//takes in a stores min and max customers and generates a random number of customers per hour
function customerNumber(store){
  return Math.ceil(Math.random() * (store.maxCust - store.minCust + 1) + store.minCust);
}
//generates a random number of cookies sold at each store
function cookiesSold(store){
  return Math.ceil(customerNumber(store) * store.avgCookies);
}
//displaying the store rows in the storeArray.
function storeDisplay(){
  for (let i = 0;  i < storeArray.length; i++){
    storeArray[i].storeRows();
  }
}

// loop over the each store in the array, grab a store, read its cookies sold at [i] and add it to the total
function totalPerHour(){
  hourTotals = ['Total'];
  for(let i = 0; i<timeArray.length; i++){
    let totalCookiesThisHour = 0;
    for(let j = 0; j < storeArray.length; j++){
      totalCookiesThisHour += storeArray[j].cookiesSold[i];
    }
    hourTotals.push(totalCookiesThisHour);
  }
}


// //create a tr for the total per hour from all stores
function tfootGen(array){
  const tr_Gen = document.createElement('tr');
  tfoot_salesTableFooter.appendChild(tr_Gen);
  for(let i = 0; i<array.length; i++){
    let td_Gen = document.createElement('td');
    let textNode = document.createTextNode(array[i]);
    td_Gen.appendChild(textNode);
    tr_Gen.appendChild(td_Gen);
    
  }
}


// creates an event listener for my input forms and then pushes that inside of the store constructor
form_newStoreForm.addEventListener('submit', populateNewStore);
function populateNewStore(e){
  e.preventDefault();
  let storeName = event.target.storeName.value;
  let minCust = event.target.minCust.value;
  let maxCust = event.target.maxCust.value;
  let avgCookies = event.target.avgCookies.value;
  let newsStore = new StoreConstructor(storeName, minCust, maxCust, avgCookies);

  newsStore.storeRows();
  totalPerHour();
  tfoot_salesTableFooter.innerHTML = '';
  tfootGen(hourTotals);
}



displayHeader(timeArray);
totalPerHour();
storeDisplay(storeArray);
tfootGen(hourTotals);
