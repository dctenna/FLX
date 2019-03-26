// Assign polyfill

function assign(targetObject, ...source) {
  source.forEach(item => {
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        targetObject[key] = item[key];
      }
    }
  });

  return targetObject;
}

//Custom movement simulator

const Bot = function (options) {
  this.name = options.name;
  this.defaultSpeed = options.speed;
  this.x = options.x;
  this.y = options.y;
  this.speed = this.defaultSpeed;
  this.className = 'Bot';
};

Bot.prototype.getSpeed = function () {
  return this.speed;
};
Bot.prototype.setSpeed = function (newSpeed) {
  this.speed = newSpeed;
};
Bot.prototype.getDefaultSpeed = function () {
  return this.defaultSpeed;
};
Bot.prototype.getCoordinates = function () {
  return {
    x: this.x,
    y: this.y
  };
};
Bot.prototype.setCoordinates = function (coordinates) {
  this.x = coordinates.x;
  this.y = coordinates.y;
};
Bot.prototype.move = function (direction) {
  if (direction === 'up') {
    this.y += this.speed;
  } else if (direction === 'down') {
    this.y -= this.speed;
  } else if (direction === 'left') {
    this.x -= this.speed;
  } else if (direction === 'right') {
    this.x += this.speed;
  } else {

    console.log('Please, enter correct direction.');
  }
};
Bot.prototype.showPosition = function () {
  console.log(`I am ${this.className} '${this.name}'. I am located at ${this.x}:${this.y}`);
};

const Racebot = function (name, speed, x, y) {
  Bot.call(this, name, speed, x, y);
  this.previousMove = null;
  this.className = 'Racebot';
};

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;
Racebot.prototype.checkPreviousMove = function (direction) {
  if (this.previousMove === direction) {
    this.speed++;
  } else {
    this.previousMove = direction;
    this.speed = this.defaultSpeed;
  }
};

Racebot.prototype.move = function (direction) {
  this.checkPreviousMove(direction);
  Bot.prototype.move.call(this, direction);
};

const Speedbot = function (name, speed, x, y) {
  Bot.call(this, name, speed, x, y);
  this.isPreparedEngine = false;
  this.className = 'Speedbot';
};

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;
Speedbot.prototype.prepareEngine = function () {
  this.isPreparedEngine = true;
  this.speed += 2;
};
Speedbot.prototype.decrementSpeed = function () {
  if (this.speed > this.defaultSpeed) {
    this.speed--;
  } else {
    this.isPreparedEngine = false;
  }
};
Speedbot.prototype.move = function (direction) {
  Bot.prototype.move.call(this, direction);

  if (this.isPreparedEngine) {
    this.decrementSpeed();
  }
};

