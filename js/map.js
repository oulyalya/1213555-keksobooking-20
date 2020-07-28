'use strict';

(function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var mapWidth = window.util.map.clientWidth;
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainDefaultCoords = 'left: 570px; top: 375px;';

  // Подставить координаты пина в инпут
  var mainPinX = Math.round(pinMain.offsetLeft + (window.util.PIN_WIDTH / 2));
  var mainPinY = Math.round(pinMain.offsetTop + window.util.PIN_HEIGHT);
  var changeAddressInputValue = function () {
    window.form.addressInput.value = mainPinX + ', ' + mainPinY;
  };

  var enablePage = function () {
    window.util.map.classList.remove('map--faded');
    changeAddressInputValue();
    window.backend.load(window.mapPins.successRenderPinsHandler, window.mapPins.errorRenderPinsHandler);
    window.form.activate();
    pinMain.removeEventListener('keydown', enablePage);
    pinMain.removeEventListener('mousedown', enablePage);
  };

  var disablePage = function () {
    window.form.deactivate();
    window.util.map.classList.add('map--faded');
    window.mapPins.remove();
    window.filter.disable(window.filter.filters);
    pinMain.style = pinMainDefaultCoords;
  };

  disablePage();

  var pinMainKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      enablePage();
    }
    pinMain.removeEventListener('keydown', pinMainKeydownHandler);
  };

  var pinMainMousedownHandler = function (evt) {
    if (evt.which === 1) {
      enablePage();
    }
    pinMain.removeEventListener('mousedown', pinMainMousedownHandler);
  };

  // перемещение главного пина
  var pinMainMoveHandler = function (evt) {
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
        return pinMainCurrentCoords.y < LOCATION_Y_MIN ||
        pinMainCurrentCoords.y > LOCATION_Y_MAX ||
        pinMainCurrentCoords.x < 0 ||
        pinMainCurrentCoords.x > mapWidth;
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
  };

  pinMain.addEventListener('keydown', pinMainKeydownHandler);
  pinMain.addEventListener('mousedown', pinMainMousedownHandler);
  pinMain.addEventListener('mousedown', pinMainMoveHandler);

  window.mapArea = {
    mapWidth: mapWidth,
    disablePage: disablePage,
    pinMainKeydownHandler: pinMainKeydownHandler,
    pinMainMousedownHandler: pinMainMousedownHandler
  };
})();
