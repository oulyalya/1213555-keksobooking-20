'use strict';

(function () {
  var pins = document.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('#pin').content.querySelector('button');
  var pinsFragment = document.createDocumentFragment();

  // Генерирует метку карты
  var generatePin = function (functionName) {
    var pin = pinsTemplate.cloneNode(true);

    pin.style.left = functionName.location.x - window.util.PIN_WIDTH / 2 + 'px';
    pin.style.top = functionName.location.y - window.util.PIN_HEIGHT + 'px';

    pin.querySelector('img').src = functionName.author.avatar;
    pin.querySelector('img').alt = functionName.offer.title;

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
    generatePin: generatePin,
    renderPins: renderPins,
    pins: pins,
    pinsFragment: pinsFragment,
  };
})();
