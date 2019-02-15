function findTypes() {
  const types = [];
  for (let i = 0; i < arguments.length; i++) {
    types.push(typeof arguments[i]);
  }
  return types;
}

findTypes(null, 5, 'hello');

function executeforEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

executeforEach([1, 2, 3], el => {
  console.log(el);
});

function mapArray(array, callback) {
  const transformedArray = [];
  executeforEach(array, (item) => {
    transformedArray.push(callback(item));
  });
  return transformedArray;
}

mapArray([2, 5, 8], el => el + 3);

function filterArray(array, callback) {
  const filteredArray = [];
  executeforEach(array, (item) => {
    if (callback(item)) {
      filteredArray.push(item);
    }
  });
  return filteredArray;
}

filterArray([2, 5, 8], (el) => el > 3);

const data = [
  {
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
];

function getAmountOfAdultPeople(array) {
  const arrayOfAdultPeopleObjects = filterArray(array, item => item.age > 18);
  return arrayOfAdultPeopleObjects.length;
}

getAmountOfAdultPeople(data);

function getGreenAdultBananaLovers(array) {
  return mapArray(filterArray(
    array,
    item => item.age > 18 && item.favoriteFruit === 'banana' && item.eyeColor === 'green'
  ), item => item.name);
}

getGreenAdultBananaLovers(data);

function keys(object) {
  const arrayOfKeys = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      arrayOfKeys.push(key);
    }
  }
  return arrayOfKeys;
}

keys({keyOne: 1, keyTwo: 2, keyThree: 3});

function values(object) {
  const arrayOfValues = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      arrayOfValues.push(object[key]);
    }
  }
  return arrayOfValues;
}

values({keyOne: 1, keyTwo: 2, keyThree: 3});

function showFormattedDate(date) {
  const dayOfTheMonth = date.getDate();
  const month = date.toString().substr(4, 3);
  const year = date.getFullYear();
  return `Date: ${dayOfTheMonth} of ${month}, ${year}`;
}

showFormattedDate(new Date('2019-01-27T01:10:00'));

function isEvenYear(date) {
  return !(date.getFullYear() % 2);
}

isEvenYear(new Date('2019-01-27T01:10:00'));

function isEvenMonth(date) {
  return Boolean(date.getMonth() % 2);
}

isEvenMonth(new Date('2019-02-27T01:10:00'));