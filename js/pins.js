'use strict';

(function () {
  var pins = document.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('#pin').content.querySelector('button');
  var pinsFragment = document.createDocumentFragment();

  var removeActiveClassPin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var addActiveClassPin = function (pin) {
    removeActiveClassPin();
    pin.classList.add('map__pin--active');
  };

  // Генерирует метку карты
  var generatePin = function (ad) {
    var pin = pinsTemplate.cloneNode(true);

    pin.style.left = ad.location.x - window.util.PIN_WIDTH / 2 + 'px';
    pin.style.top = ad.location.y - window.util.PIN_HEIGHT + 'px';

    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;

    pin.addEventListener('click', function () {
      window.cardPopup.openCard(ad);
      addActiveClassPin(pin);
    });

    return pin;
  };

  // Добавляет метки на карту
  var renderPins = function () {
    for (var j = 1; j <= window.util.COUNT_OF_OBJECTS; j++) {
      var createArray = window.data.generateAdvertsArray();
      pinsFragment.appendChild(generatePin(createArray[j]));
    }
  };

  window.mapPins = {
    removeActiveClassPin: removeActiveClassPin,
    generatePin: generatePin,
    renderPins: renderPins,
    pins: pins,
    pinsFragment: pinsFragment,
  };
})();
