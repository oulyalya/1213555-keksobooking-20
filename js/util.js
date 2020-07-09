'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var COUNT_OF_OBJECTS = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
      // if (nextAction) {
      //   nextAction();
      // }
    }
  };

  var isEnterEvent = function (evt, action, nextAction) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
      if (nextAction) {
        nextAction();
      }
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    map: map,
    COUNT_OF_OBJECTS: COUNT_OF_OBJECTS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT
  };
})();
