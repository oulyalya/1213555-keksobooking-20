'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  var selectHousingType = filterForm.querySelector('#housing-type');
  var selectHousingPrice = filterForm.querySelector('#housing-price');
  var selectHousingRooms = filterForm.querySelector('#housing-rooms');
  var selectHousingGuests = filterForm.querySelector('#housing-guests');
  var mapFeatures = filterForm.querySelector('.map__features');


  var filtrateByType = function (ad) {
    var type = selectHousingType.value;
    if (type === 'any') {
      return true;
    } else {
      return type === ad.offer.type;
    };
  };

  var filtrateByType = function (ad) {
    var type = selectHousingType.value;
    if (type === 'any') {
      return true;
    } else {
      return type === ad.offer.type;
    };
  };

  var filtrateAds = function () {
    var filteredData = window.ads;
    filteredData = filteredData.filter(filtrateByType);
    return filteredData;
  };

  var filterChangeHandler = function () {
    window.pins.removePin();
    window.popup.removeCard();

    window.mapPins.renderPins(filtrateAds());
  };

  filterForm.addEventListener('change', filterChangeHandler);

  window.filter = {
    filtrate: filtrateAds,
    selectHousingType: selectHousingType
  }
})();
