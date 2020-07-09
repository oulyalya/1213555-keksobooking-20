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

  // var onPinClickShowCard = function () {
  // //   if (!pins.classList.contains('pin--main')) {
  // //     var allPins = document.querySelector('.map__pins:not(pin--main)');
  // //     for (var i = 0; i < allPins.length; i++) {
  //       pins[i].addEventListener('click', function (evt) {
  //         evt.preventDefault();
  //         console.log('kkk');
  //       // });
  // //     }
  // //   }
  // };
  // по клику на 1 из пинов (не пин--мейн)
  // добавить класс пин-эктив
  // window.card.show(obj[i])

  // window.mapPins.pins.addEventListener('click', function(evt) {
  //   evt.preventDefault();
  //   console.log('j');
  // });

  // var onPinClickRenderCard = function () {
  //   for (var i = 0; i < window.mapPins.pins.length; i++) {
  //     window.mapPins.pins[i].addEventListener('click', function (evt) {
  //       evt.preventDefault();
  //       window.card.show(window.data.advertsArray[i]);
  //       console.log('kkk');
  //     });
  //   }
  // };

  window.mapPins = {
    generatePin: generatePin,
    renderPins: renderPins,
    pins: pins,
    pinsFragment: pinsFragment,
  };
})();
