const artem = new Employee({name: 'Artem', age: 15, salary: 1000, primarySkill: 'UX'});
const vova = new Employee({name: 'Vova', age: 16, salary: 400, primarySkill: 'BE'});
const vasyl = new Employee({name: 'Vasyl', age: 25, salary: 300, primarySkill: 'FE'});
const ivan = new Employee({name: 'Ivan', age: 35, salary: 5000, primarySkill: 'FE'});
const orest = new Employee({name: 'Orest', age: 29, salary: 300, primarySkill: 'AT'});
const anton = new Employee({name: 'Anton', age: 19, salary: 500, primarySkill: 'Manager'});
const alina = new Employee({name: 'Alina', age: 25, salary: 4000, primarySkill: 'Manager'});

const epam = new Company({name: 'Epam', owner: 'Arkadii', maxCompanySize: 5});

//Try to create instance of Employee without required properties:
console.log('Wrong object passed into Employee constructor:');
const wrongEmployee = new Employee({say: 'kuku'});

//Try to create instance of Company without required properties:
console.log('Wrong object passed into Company constructor:');
const wrongCompany = new Company({sayHi: 'hi'});

//addNewEmployee functionality.
console.log('getEmployees with no employees:');
console.log(epam.getEmployees());

epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);

console.log('Added new employees:');
console.log(epam.getEmployees());

//Try to add not instance of Employee:
console.log('Try add to company not instance of Employee:');
epam.addNewEmployee(4545);

//removeEmployee functionality.
console.log('Employees before remove:');
console.log(epam.getEmployees());
epam.removeEmployee(0);

console.log('Employees after remove:');
console.log(epam.getEmployees());

//Try to remove with wrong id
console.log('Try to remove with wrong id:');
epam.removeEmployee(30);

//getAverageSalary functionality:
console.log('Average salary:');
console.log(epam.getAverageSalary());

//getAverageAge functionality:
console.log('Average age:');
console.log(epam.getAverageAge());

//getFormattedListOfEmployees functionality:
console.log('Formatted list of employees:');
console.log(epam.getFormattedListOfEmployees());


//getSalary functionality
console.log('Old salary:');
console.log(artem.getSalary());

//setSalary functionality
artem.setSalary(1500);
console.log('New salary');
console.log(artem.getSalary());

//Try to set smaller salary:
console.log('Try to set smaller salary:');
artem.setSalary(500);

//Try to set invalid salary:
console.log('Try to set invalid salary:');
artem.setSalary('food');

//Alina doesn't work at any company:
console.log('Work time in seconds for unemployed person:');
console.log(alina.getWorkTimeInSeconds());

//hire functionality:
//addNewEmployee invoke hire function
epam.addNewEmployee(alina);
console.log('Current company:');
console.log(alina.currentCompanyName);
console.log('User\'s history:');
alina.getHistory();

//fire functionality:
console.log('Employees list before fire:');
console.log(epam.getEmployees());
//removeEmployee invoke fire function
epam.removeEmployee(2);
console.log('Employees list after fire:');
console.log(epam.getEmployees());

//getHistory functionality:
console.log('User\'s history');
alina.getHistory();

//getWorkTimeInSeconds functionality:
console.log('Work time in seconds:');
console.log(artem.getWorkTimeInSeconds());

setTimeout(() => {
  epam.removeEmployee(0);
  console.log('Artem workTime is:');
  console.log(artem.getWorkTimeInSeconds());
}, 2000);

//If there is no free place for new employee,
// remove employee who has the lowest salary (if there are
// several of them - remove employee who works longer
// and add new employee

setTimeout(() => {
  epam.addNewEmployee(artem);
  epam.addNewEmployee(vova);
  epam.addNewEmployee(orest);
  console.log(epam.getEmployees());
  epam.getFormattedListOfEmployees();
}, 5000);

setTimeout(() => {
  epam.addNewEmployee(anton);
  console.log('The user with smaller salary and longer work time was deleted:');
  epam.getHistory();
}, 7000);
