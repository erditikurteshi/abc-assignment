var faker = require('faker');

var database = {
  locations: [],
  cities: [
    {id: '1', city: 'Berlin'},
    {id: '2', city: 'Amsterdam'},
    {id: '3', city: 'Ljubljana'},
    {id: '4', city: 'Belgrade'},
    {id: '5', city: 'Zagreb'},
    {id: '6', city: 'Sarajevo'},
    {id: '7', city: 'Prishtina'},
    {id: '8', city: 'Rome'},
    {id: '9', city: 'Paris'},
    {id: '10', city: 'Madrid'},
    {id: '11', city: 'Istanbul'},
    {id: '12', city: 'Moscow'},
    {id: '13', city: 'Stockholm'}
  ]
};

for (var i = 1; i<= 300; i++) {
  database.locations.push({
    id: i,
    name: faker.address.streetName(),
    address: faker.address.streetAddress(),
    city: database.cities[Math.floor(Math.random() * database.cities.length)].city,
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude()
  });
}

console.log(JSON.stringify(database));
