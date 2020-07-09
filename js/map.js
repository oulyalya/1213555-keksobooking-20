'use strict';

(function () {
  // var map = document.querySelector('.map');
  var mapWidth = window.util.map.clientWidth;

  var pinMain = document.querySelector('.map__pin--main');

  // Подставить координаты пина в инпут
  var mainPinX = Math.round(pinMain.offsetLeft + (window.util.PIN_WIDTH / 2));
  var mainPinY = Math.round(pinMain.offsetTop + window.util.PIN_HEIGHT);
  var changeAddressInputValue = function () {
    window.form.addressInput.value = mainPinX + ', ' + mainPinY;
  };

  var enablePage = function () {
    window.util.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    changeAddressInputValue();
    window.form.enableFieldsets(window.form.formFieldsets);
    window.mapPins.renderPins();
    window.mapPins.pins.appendChild(window.mapPins.pinsFragment);
    pinMain.removeEventListener('keydown', enablePage);
    pinMain.removeEventListener('mousedown', enablePage);
  };

  var disablePage = function () {
    window.util.map.classList.add('map--faded');
    window.form.disableFieldsets(window.form.formFieldsets);
  };

  disablePage();

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      enablePage();
    }
  });

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      enablePage();
    }
  });

  // перемещение главного пина
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinMainCurrentCoords = {
        x: (pinMain.offsetLeft - shift.x) + (window.util.PIN_WIDTH / 2),
        y: (pinMain.offsetTop - shift.y) + window.util.PIN_HEIGHT
      };

      var isCursorOutside = function () {
        return pinMainCurrentCoords.y < window.data.LOCATION_Y_MIN ||
        pinMainCurrentCoords.y > window.data.LOCATION_Y_MAX ||
        pinMainCurrentCoords.x < 0 ||
        pinMainCurrentCoords.x > 1200;
      };

      if (isCursorOutside()) {
        pinMain.style.top = pinMain.offsetTop + 'px';
        pinMain.style.left = pinMain.offsetLeft + 'px';
        startCoords = {
          x: moveEvt.clientX - shift.x,
          y: moveEvt.clientY - shift.y
        };
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      }

      window.form.addressInput.value = pinMainCurrentCoords.x + ', ' + pinMainCurrentCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mapArea = {
    mapWidth: mapWidth
  };
})();
