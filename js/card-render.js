'use strict';

(function () {
  var cardsTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var createCard = function (adv) {
    var cardBlock = cardsTemplate.cloneNode(true);

    cardBlock.querySelector('.popup__title').textContent = adv.offer.title;
    cardBlock.querySelector('.popup__text--address').textContent = adv.offer.address;
    cardBlock.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь';
    cardBlock.querySelector('.popup__type').textContent = window.util.TYPES_POPUP[adv.offer.type];
    cardBlock.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
    cardBlock.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    cardBlock.querySelector('.popup__features').innerHTML = '';
    cardBlock.querySelector('.popup__photos').innerHTML = '';
    cardBlock.querySelector('.popup__avatar').src = adv.author.avatar;

    var description = cardBlock.querySelector('.popup__description');
    if (!adv.offer.description) {
      cardBlock.removeChild(description);
    } else {
      description.textContent = adv.offer.description;
    }

    renderFeature(cardBlock, adv);
    renderPhotos(cardBlock, adv);

    return cardBlock;
  };

  var renderFeature = function (template, adv) {
    if (adv.offer.features.length === 0) {
      template.querySelector('.popup__features').style = 'display: none';
    } else {
      for (var i = 0; i < adv.offer.features.length; i++) {
        var cardBlockFeature = document.createElement('li');
        cardBlockFeature.classList.add('popup__feature', 'popup__feature--' + adv.offer.features[i]);
        template.querySelector('.popup__features').append(cardBlockFeature);
      }
    }
  };

  var renderPhotos = function (template, adv) {
    if (adv.offer.photos.length === 0) {
      template.querySelector('.popup__photos').style = 'display: none';
    } else {
      for (var i = 0; i < adv.offer.photos.length; i++) {
        var cardBlockPhoto = document.createElement('img');
        cardBlockPhoto.src = adv.offer.photos[i];
        cardBlockPhoto.width = 45;
        cardBlockPhoto.height = 40;
        template.querySelector('.popup__photos').appendChild(cardBlockPhoto);
        cardBlockPhoto.classList.add('popup__photo');
      }
    }
  };

  window.cardRender = {
    createCard: createCard
  };
})();
