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

//Insert here code from checkFunctionsWorking.js to see work of all functions.
