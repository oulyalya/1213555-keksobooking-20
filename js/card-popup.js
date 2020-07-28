'use strict';

(function () {
  var card;
  var cardClose;
  var mapPin = document.querySelector('.map__pins');

  // Удаляет карту
  var removeCard = function () {
    if (card) {
      card.remove();
    }
  };

  // Закрывает попап
  var closeCardHandler = function () {
    if (card) {
      cardClose.removeEventListener('click', closeCardHandler);
      cardClose.removeEventListener('keydown', cardEnterPressHandler);
      document.removeEventListener('keydown', cardEscPressHandler);
      window.mapPins.removeActiveClassPin();
      removeCard();
    }
  };

  var cardEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeCardHandler();
    }
  };

  var cardEnterPressHandler = function (evt) {
    if (evt.key === 'Enter') {
      closeCardHandler();
    }
  };

  // Открывает попап (показывает объявление)
  var openCard = function (ad) {
    if (card) {
      closeCardHandler();
    }
    card = mapPin.insertAdjacentElement('afterEnd', window.cardRender.createCard(ad));
    cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', closeCardHandler);
    cardClose.addEventListener('keydown', cardEnterPressHandler);
    document.addEventListener('keydown', cardEscPressHandler);
  };

  window.cardPopup = {
    card: card,
    mapPin: mapPin,
    remove: removeCard,
    open: openCard,
    close: closeCardHandler
  };
})();
