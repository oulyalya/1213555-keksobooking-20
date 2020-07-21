'use strict';

(function () {
  // Попап
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
  var closeCard = function () {
    removeCard();
    cardClose.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', cardEscPressHandler);
    document.removeEventListener('keydown', cardEnterPressHandler);
    window.mapPins.removeActiveClassPin();
  };

  var cardEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  var cardEnterPressHandler = function (evt) {
    if (evt.key === 'Enter') {
      closeCard();
    }
  };

  // Открывает попап (показывает объявление)
  var openCard = function (ad) {
    if (card) {
      closeCard();
    }
    card = mapPin.insertAdjacentElement('afterEnd', window.cardRender.createCard(ad));
    cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', cardEscPressHandler);
    document.addEventListener('keydown', cardEnterPressHandler);
  };

  window.cardPopup = {
    mapPin: mapPin,
    removeCard: removeCard,
    openCard: openCard,
    closeCard: closeCard
  };
})();
