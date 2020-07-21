'use strict';

(function () {
  var COUNT_OF_AVATAR = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TYPES_POPUP = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
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
  var advertsArray = [];

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var generateAdvertData = function () {
    return {
      author: {
        avatar: 'img/avatars/user0' + getRandomValue(1, COUNT_OF_AVATAR) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '' + getRandomValue(0, 600) + ', ' + getRandomValue(0, 600),
        price: getRandomValue(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomValue(0, TYPES.length)],
        rooms: getRandomValue(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomValue(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN_TIMES[getRandomValue(0, CHECKIN_TIMES.length)],
        checkout: CHECKOUT_TIMES[getRandomValue(0, CHECKOUT_TIMES.length)],
        features: FEATURES,
        description: 'Описание',
        photos: PHOTOS,
      },
      location: {
        x: getRandomValue(0, window.mapArea.mapWidth),
        y: getRandomValue(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
  };

  var generateAdvertsArray = function () {
    for (var i = 1; i <= window.util.COUNT_OF_OBJECTS; i++) {
      advertsArray.push(generateAdvertData(i));
    }
    return advertsArray;
  };

  window.data = {
    getRandomValue: getRandomValue,
    generateAdvertData: generateAdvertData,
    generateAdvertsArray: generateAdvertsArray,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    TYPES_POPUP: TYPES_POPUP,
    advertsArray: advertsArray
  };
})();
