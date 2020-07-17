'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var mapFiltersContainer = window.util.map.querySelector('.map__filters-container');

  var removePopup = function () {
    document.removeEventListener('keydown', onKeydownPress);
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  var showCard = function (obj) {
    removePopup();
    var card = renderCardContent(obj);
    window.util.map.insertBefore(card, mapFiltersContainer);
    document.addEventListener('keydown', onKeydownPress);
  };

  var renderCardContent = function (obj) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupCloseBtn = cardElement.querySelector('.popup__close');
    var houseType = cardElement.querySelector('h4');

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price;
    switch (obj.offer.type) {
      case 'flat': houseType.textContent = 'Квартира';
        break;
      case 'house': houseType.textContent = 'Дом';
        break;
      case 'bungalo': houseType.textContent = 'Лачуга';
        break;
      default: houseType.textContent = 'Не указано';
        break;
    }
    cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    cardElement.querySelector('.popup__feature--wifi').textContent = 'wifi';
    cardElement.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
    cardElement.querySelector('.popup__feature--parking').textContent = 'parking';
    cardElement.querySelector('.popup__feature--washer').textContent = 'washer';
    cardElement.querySelector('.popup__feature--elevator').textContent = 'elevator';
    cardElement.querySelector('.popup__feature--conditioner').textContent = 'conditioner';

    popupCloseBtn.tabIndex = 0;
    popupCloseBtn.addEventListener('click', onPopupCloseClick);

    return cardElement;
  };

  var onKeydownPress = function (evt) {
    window.util.isEscEvent(evt, removePopup);
  };

  var onPopupCloseClick = function () {
    removePopup();
  };

  window.card = {
    remove: removePopup,
    show: showCard
  };
})();
