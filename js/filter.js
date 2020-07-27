'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var selectHousingType = filterForm.querySelector('#housing-type');
  var selectHousingPrice = filterForm.querySelector('#housing-price');
  var selectHousingRooms = filterForm.querySelector('#housing-rooms');
  var selectHousingGuests = filterForm.querySelector('#housing-guests');
  var selectFeatures = filterForm.querySelector('.map__features');

  var resetFilter = function () {
    selectHousingType.value = DEFAULT_FILTER_VALUE;
    selectHousingPrice.value = DEFAULT_FILTER_VALUE;
    selectHousingRooms.value = DEFAULT_FILTER_VALUE;
    selectHousingGuests.value = DEFAULT_FILTER_VALUE;
    selectFeatures.querySelectorAll('input:checked').forEach(function (it) {
      it.checked = false;
    });
  };

  var filtrateByType = function (ad) {
    var type = selectHousingType.value;
    if (type === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return type === ad.offer.type;
  };

  var filtrateByPrice = function (ad) {
    var price = ad.offer.price;
    var value = selectHousingPrice.value;
    switch (value) {
      case DEFAULT_FILTER_VALUE:
        return true;
      case 'low':
        return price < MIN_PRICE;
      case 'middle':
        return price >= MIN_PRICE && price < MAX_PRICE;
      case 'high':
        return price >= MAX_PRICE;
      default:
        return false;
    }
  };

  var filtrateByRooms = function (ad) {
    var rooms = selectHousingRooms.value;
    if (rooms === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return parseInt(rooms, 10) === ad.offer.rooms;
  };


  var filtrateByGuests = function (ad) {
    var guests = selectHousingGuests.value;
    if (guests === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return parseInt(guests, 10) === ad.offer.guests;
  };

  var filtrateByFeatures = function (ad) {
    var checkedFeatures = selectFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (feature) {
      return ad.offer.features.includes(feature.value);
    });
  };

  var filtrateAds = function () {
    var filteredData = window.ads;
    filteredData = filteredData.filter(filtrateByType).filter(filtrateByPrice).filter(filtrateByRooms).filter(filtrateByGuests).filter(filtrateByFeatures);
    return filteredData;
  };

  var filterChangeHandler = window.debounce(function () {
    window.cardPopup.close();
    window.mapPins.remove();
    window.mapPins.renderPins(filtrateAds().slice(0, window.mapPins.DEFAULT_PINS_NUMBER));
  });

  filterForm.addEventListener('change', filterChangeHandler);

  window.filter = {
    filtrate: filtrateAds,
    reset: resetFilter
  };
})();
