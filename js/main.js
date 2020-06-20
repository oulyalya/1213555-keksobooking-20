'use strict';

var COUNT_OF_OBJECTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE_MIN = 1000;
var PRICE_MAX = 10000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 3;
var GUESTS_MIN = 1;
var GUESTS_MAX = 3;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var advertsArray = [];

var map = document.querySelector('.map');
var mapWidth = map.clientWidth;

var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('button');
var pinsFragment = document.createDocumentFragment();

// Получить случайное число
var getRandomNValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Сгенерировать данные для одного объявления
var generateAdvertData = function (count) {
  var advertData = {
    'author': {
      'avatar': 'img/avatars/user0' + (count) + '.png',
    },
    'offer': {
      'title': 'заголовок предложения',
    },
    'address': '' + getRandomNValue(0, 600) + ', ' + getRandomNValue(0, 600),
    'price': getRandomNValue(PRICE_MIN, PRICE_MAX),
    'type': TYPES[getRandomNValue(0, TYPES.length)],
    'rooms': getRandomNValue(ROOMS_MIN, ROOMS_MAX),
    'guests': getRandomNValue(GUESTS_MIN, GUESTS_MAX),
    'checkin': CHECKIN_TIMES[getRandomNValue(0, CHECKIN_TIMES.length)],
    'checkout': CHECKOUT_TIMES[getRandomNValue(0, CHECKOUT_TIMES.length)],
    'features': FEATURES,
    'description': 'описание',
    'photos': PHOTOS,
    'location': {
      'x': getRandomNValue(0, mapWidth),
      'y': getRandomNValue(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
  return advertData;
};

// Добавить объекты-объявления в массив
var generateAdvertsArray = function () {
  for (var i = 1; i <= COUNT_OF_OBJECTS; i++) {
    advertsArray.push(generateAdvertData(i));
  }
  return advertsArray;
};

// Перевести карту в активное состояние
var showMap = function () {
  map.classList.remove('map--faded');
};
showMap();

// Генерирует метку карты
var generatePin = function (functionName) {
  var pin = pinsTemplate.cloneNode(true);

  pin.style.left = functionName.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = functionName.location.y - PIN_HEIGHT + 'px';

  pin.querySelector('img').src = functionName.author.avatar;
  pin.querySelector('img').alt = functionName.offer.title;

  return pin;
};

// Добавляет метки на карту
var renderPins = function () {
  for (var j = 1; j <= COUNT_OF_OBJECTS; j++) {
    var createArray = generateAdvertsArray();
    pinsFragment.appendChild(generatePin(createArray[j]));
  }
};

renderPins();
pins.appendChild(pinsFragment);
