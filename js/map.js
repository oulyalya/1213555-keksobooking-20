'use strict';

(function () {
  var mapWidth = window.util.map.clientWidth;
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainDefaultCoords = 'left: 570px; top: 375px;';

  var getMainPinDefault = function () {
    pinMain.style = pinMainDefaultCoords;
  };

  // Подставить координаты пина в инпут
  var mainPinX = Math.round(pinMain.offsetLeft + (window.util.PIN_WIDTH / 2));
  var mainPinY = Math.round(pinMain.offsetTop + window.util.PIN_HEIGHT);
  var changeAddressInputValue = function () {
    window.form.addressInput.value = mainPinX + ', ' + mainPinY;
  };

  var enablePage = function () {
    window.util.map.classList.remove('map--faded');
    window.form.enable();
    changeAddressInputValue();
    window.backend.load(window.mapPins.onSuccessRenderPins, window.mapPins.onErrorRenderPins);
    pinMain.removeEventListener('keydown', enablePage);
    pinMain.removeEventListener('mousedown', enablePage);
  };

  var disablePage = function () {
    window.form.disable();
    window.mapPins.remove();
    window.util.map.classList.add('map--faded');
    getMainPinDefault();
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

    var mouseMoveHandler = function (moveEvt) {
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

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.mapArea = {
    mapWidth: mapWidth,
    disablePage: disablePage
  };
})();
