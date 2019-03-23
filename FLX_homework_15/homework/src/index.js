function Company(companyObject) {
  if (!companyObject.name ||
    typeof companyObject.name !== 'string' ||
    !companyObject.owner ||
    typeof companyObject.owner !== 'string' ||
    !companyObject.hasOwnProperty('maxCompanySize') ||
    typeof companyObject.maxCompanySize !== 'number') {
    console.log('FAILED to create an instance of Company - required property missing!');

    return;
  }

  this.name = companyObject.name;
  this.owner = companyObject.owner;
  this.maxCount = companyObject.maxCompanySize;
  let _employeesList = [];
  this.timeOfCreatingCompany = new Date();
  let _logs = [
    `${this.name} was created in ${this.timeOfCreatingCompany}`
  ];

  this.addNewEmployee = function (employee) {
    if (employee instanceof Employee) {

      if (_employeesList.length === this.maxCount) {
        const firstIndex = 0;

        const itemWithMinSalary = _employeesList.reduce((min, currentValue) => {
          return currentValue.salary < min.salary ? currentValue : min;
        }, _employeesList[firstIndex]);
        const listMinSalary = _employeesList.filter((item) => {
          return itemWithMinSalary.salary === item.salary;
        });
        const itemWithMinSalaryAndLongerTime = listMinSalary.reduce((min, currentValue) => {
          return currentValue.timeOfHire < min.timeOfHire ? currentValue : min;
        }, listMinSalary[firstIndex]);
        const indexOfMinSalaryAndLongerTime = _employeesList.findIndex(item => {
          return item === itemWithMinSalaryAndLongerTime;
        });
        this.removeEmployee(indexOfMinSalaryAndLongerTime);
      }

      _employeesList.push(employee);
      employee.hire(this.name);
      _logs.push(`${employee.name} starts working at ${this.name} in ${employee.timeOfHire}`)

    } else {
      console.log('Please try to add Employee instance.');
    }
  };

  this.removeEmployee = function (id) {
    const firstArrayIndex = 0;

    if (id < firstArrayIndex ||
      id >= _employeesList.length ||
      !Number.isInteger(id)) {
      console.log('Please enter valid array index.');
      return;
    }
    const numberOfElementsToRemove = 1;

    _employeesList[id].fire();
    _logs.push(`${_employeesList[id].name} ends working at ${this.name} in ${_employeesList[id].timeOfFire}`);
    _employeesList.splice(id, numberOfElementsToRemove);
  };

  this.getAverageSalary = function () {
    const initialValue = 0;

    if (_employeesList.length === initialValue) {
      return initialValue;
    }
    const sumSalary = _employeesList.reduce((accumulator, currentValue) => {
      accumulator += currentValue.salary;
      return accumulator;
    }, initialValue);

    const numberOfDigits = 2;

    return (sumSalary / _employeesList.length).toFixed(numberOfDigits);
  };

  this.getEmployees = function () {
    const noEmployees = 0;

    if (_employeesList.length === noEmployees) {
      console.log('There is no employees in company');
      return;
    }
    _employeesList.forEach(item => console.log(item));
  };

  this.getFormattedListOfEmployees = function () {
    _employeesList.forEach(item => {
      console.log(`${item.name} - works in ${item.currentCompanyName} ${item.getWorkTimeInSeconds()} seconds.`);
    });
  };

  this.getAverageAge = function () {
    const initialValue = 0;

    if (_employeesList.length === initialValue) {
      return `There is no employees in ${this.name} yet`;
    }

    const sumAge = _employeesList.reduce((accumulator, currentValue) => {
      accumulator += currentValue.age;
      return accumulator;
    }, initialValue);

    const numberOfDigits = 2;

    return (sumAge / _employeesList.length).toFixed(numberOfDigits);
  };

  this.getHistory = function () {
    _logs.forEach(item => console.log(item));
  }
}

function Employee(employeeObject) {
  if (!employeeObject.name ||
    typeof employeeObject.name !== 'string' ||
    !employeeObject.primarySkill ||
    typeof employeeObject.primarySkill !== 'string' ||
    !employeeObject.hasOwnProperty('age') ||
    typeof employeeObject.age !== 'number' ||
    !employeeObject.hasOwnProperty('salary') ||
    typeof employeeObject.salary !== 'number') {
    console.log('FAILED to create an instance of Employee - required property missing!');

    return;
  }

  this.name = employeeObject.name;
  this.primarySkill = employeeObject.primarySkill;
  this.age = employeeObject.age;
  this.salary = employeeObject.salary;
  this.currentCompanyName = null;
  let _logs = [];
  this.timeOfHire = null;
  this.timeOfFire = null;
  this.workTimeInSeconds = 0;

  this.getSalary = function () {
    return this.salary;
  };

  this.setSalary = function (newSalary) {
    if (isNaN(newSalary) ||
      !isFinite(newSalary)) {
      console.log('The new salary should be a finite number');
    } else if (newSalary < this.salary) {
      console.log('The new salary cannot be smaller than employee has now.')
    } else {
      this.salary = newSalary;
    }
  };

  this.getWorkTimeInSeconds = function () {
    if (this.currentCompanyName !== null) {
      const milliseconds = 1000;

      return (new Date() - this.timeOfHire) / milliseconds;
    } else {

      return this.workTimeInSeconds;
    }
  };

  this.hire = function (companyName) {
    if (this.currentCompanyName === null) {
      this.currentCompanyName = companyName;
      this.workTimeInSeconds = 0;
      this.timeOfHire = new Date();
      _logs.push(`${this.name} is hired to ${this.currentCompanyName} in ${this.timeOfHire}.`);
    } else {
      console.log('User should be fired from current company before hiring.');
    }
  };

  this.fire = function () {
    const milliseconds = 1000;

    this.timeOfFire = new Date();
    this.workTimeInSeconds += (this.timeOfFire - this.timeOfHire) / milliseconds;
    _logs.push(`${this.name} is fired from ${this.currentCompanyName} in ${this.timeOfFire}.`);
    this.currentCompanyName = null;
  };

  this.getHistory = function () {
    const initialLogsLength = 0;

    if (_logs.length === initialLogsLength) {
      console.log('Sorry, there is no log.');
    } else {
      return _logs.forEach(item => console.log(item));
    }
  };
}

/*Uncomment to check functions working:

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

 */
