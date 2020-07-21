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
  var renderPins = function (adverts) {
    adverts.forEach(function (adv) {
      pinsFragment.appendChild(generatePin(adv));
    });
    window.cardPopup.mapPin.appendChild(pinsFragment);
  };

  window.ads = [];

  var onSuccessRenderPins = function (adverts) {
    window.ads = adverts;
    renderPins(window.ads);
  };

  var onErrorRenderPins = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  window.mapPins = {
    removeActiveClassPin: removeActiveClassPin,
    generatePin: generatePin,
    renderPins: renderPins,
    onSuccessRenderPins: onSuccessRenderPins,
    onErrorRenderPins: onErrorRenderPins,
    removePins: removePins,
    pins: pins,
    pinsFragment: pinsFragment,
  };
})();
