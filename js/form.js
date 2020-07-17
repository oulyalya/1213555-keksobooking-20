'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('input[name="address"]');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var inputs = adForm.querySelectorAll('input');

  // Сделать инпуты активными
  var enableFieldsets = function (fieldsetsArr) {
    for (var i = 0; i < fieldsetsArr.length; i++) {
      fieldsetsArr[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Сделать инпуты неактивными
  var disableFieldsets = function (fieldsetsArr) {
    for (var i = 0; i < fieldsetsArr.length; i++) {
      fieldsetsArr[i].setAttribute('disabled', 'true');
    }
  };

  // Валидация. Поле с количеством гостей
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var validateGuestsNumber = function () {
    adForm.reportValidity();
    var validityMessage = 'В 1 комнате может расположиться только 1 гость.';

    if (roomsNumber.value < guestsNumber.value && roomsNumber.value !== '100') {
      validityMessage = 'В ' + roomsNumber.value + ' комнатах может располагаться до ' + roomsNumber.value + ' гостей.';
    } else if (roomsNumber.value !== '100' && guestsNumber.value === '0') {
      validityMessage = 'Укажите количество гостей';
    } else if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
      validityMessage = '100 комнат - не для гостей';
    } else {
      validityMessage = '';
    }

    guestsNumber.setCustomValidity(validityMessage);
  };

  guestsNumber.addEventListener('change', validateGuestsNumber);

  // Минимальная цена, соответствующая типу жилья
  var getMinPriceOfHousing = function (type) {
    var minPrice = 0;
    switch (type) {
      case 'bungalo':
        minPrice = 0;
        break;
      case 'flat':
        minPrice = 1000;
        break;
      case 'house':
        minPrice = 5000;
        break;
      case 'palace':
        minPrice = 10000;
        break;
    }
    return minPrice;
  };

  var typeOfHousing = adForm.querySelector('select[name="type"]');
  var priceOfHousing = adForm.querySelector('input[name="price"]');

  var setMinPriceOfHousing = function () {
    var price = getMinPriceOfHousing(typeOfHousing.value);
    priceOfHousing.min = price;
    priceOfHousing.placeholder = price;
  };

  typeOfHousing.addEventListener('change', setMinPriceOfHousing);

  // Синхронизация времени заезда и выезда
  var timeInSelect = adForm.querySelector('select[name="timein"]');
  var timeOutSelect = adForm.querySelector('select[name="timeout"]');

  var syncTimes = function (time1, time2) {
    time1.addEventListener('change', function () {
      if (time1[0].selected === true) {
        time2[0].selected = true;
      }
      if (time1[1].selected === true) {
        time2[1].selected = true;
      }
      if (time1[2].selected === true) {
        time2[2].selected = true;
      }
    });
  };

  syncTimes(timeInSelect, timeOutSelect);
  syncTimes(timeOutSelect, timeInSelect);

  window.form = {
    adForm: adForm,
    addressInput: addressInput,
    formFieldsets: formFieldsets,
    inputs: inputs,
    guestsNumber: guestsNumber,
    enableFieldsets: enableFieldsets,
    disableFieldsets: disableFieldsets
  };
})();
