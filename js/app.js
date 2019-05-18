//every store needs to be it's own object with the values of min and max hourly customers, and average cookies per customer in object properties

// each store needs a method that generates a random number of customers per hour based on the min max

//use the object method to create a number of cookies sold per hour and store that data in an object.

// results of cookies per hour need to be displayed on the page in an unordered list with a total calculated sales 

//takes in a stores min and max customers and generates a random number of customers per hour
let customerNumber = function(store){
  return Math.floor(Math.random() * (store.maxCust - store.minCust) + store.minCust);
};
//creates an object with the stores random cookies per hour from 6-8pm
let cookiesSold = function(store){
  let cookiesPerHour = Math.floor(customerNumber(store) * store.avgCookies);
  return cookiesPerHour;

}

let firstAndPike ={
  minCust: 23,
  maxCust: 65,
  avgCookies: 6.3,
  cookiesSold: {

  }
};

let seaTacAirport ={
  minCust: 3,
  maxCust: 24,
  avgCookies: 1.2,
  cookiesSold: {
      
  }
};

let seattleCenter ={
  minCust: 11,
  maxCust: 38,
  avgCookies: 2.3,
  cookiesSold: {
      
  }
};

let capitolHill = {
  minCust: 20,
  maxCust: 38,
  avgCookies: 2.3,
  cookiesSold: {
      
  }
};

let alki ={
  minCust: 2,
  maxCust: 16,
  avgCookies: 4.6,
  cookiesSold: {
      
  }
};
console.log(cookiesSold(firstAndPike));
