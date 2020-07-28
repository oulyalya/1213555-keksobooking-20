'use strict';

(function () {
  var MinPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('input[name="address"]');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var inputs = adForm.querySelectorAll('input');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var pinMainBtn = document.querySelector('.map__pin--main');

  // Сделать инпуты активными
  var enableFieldsets = function (fieldsets) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    setMinPriceOfHousing();
  };

  // Сделать инпуты неактивными
  var disableFieldsets = function (fieldsets) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'true');
    }
  };

  // Деактивация формы
  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    disableFieldsets(formFieldsets);
    adForm.removeEventListener('submit', submitSendFormHandler);
    adFormSubmit.removeEventListener('click', formSubmitClickHandler);
  };

  // Активация формы
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableFieldsets(formFieldsets);
    adForm.addEventListener('submit', submitSendFormHandler);
    adFormSubmit.addEventListener('click', formSubmitClickHandler);
    window.filter.reset();
  };

  // Валидация. Поле с количеством гостей
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var guestsChangeHandler = function () {
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

  guestsNumber.addEventListener('change', guestsChangeHandler);
  roomsNumber.addEventListener('change', guestsChangeHandler);

  // Минимальная цена, соответствующая типу жилья
  var typeOfHousing = adForm.querySelector('select[name="type"]');
  var priceOfHousing = adForm.querySelector('input[name="price"]');

  var setMinPriceOfHousing = function () {
    var type = typeOfHousing.value.toUpperCase();
    var price = MinPrices[type];
    priceOfHousing.min = price;
    priceOfHousing.placeholder = price;
  };

  var minPriceOfHousingChangeHandler = function () {
    setMinPriceOfHousing();
  };

  typeOfHousing.addEventListener('change', minPriceOfHousingChangeHandler);

  // Синхронизация времени заезда и выезда
  var timeInSelect = adForm.querySelector('select[name="timein"]');
  var timeOutSelect = adForm.querySelector('select[name="timeout"]');

  var syncTimes = function (time1, time2) {
    time1.addEventListener('change', function () {
      var time = time1.value;
      time2.value = time;
    });
  };

  syncTimes(timeInSelect, timeOutSelect);
  syncTimes(timeOutSelect, timeInSelect);

  // Сообщение об успехе/ошибке отправки формы
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var messageSuccess = messageSuccessTemplate.cloneNode(true);
  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageError = messageErrorTemplate.cloneNode(true);

  var addFormMessage = function (message) {
    document.body.appendChild(message);
    message.classList.add('message');
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', escapeClickHandler);
  };

  var removeFormMessage = function () {
    document.querySelector('.message').remove();
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', escapeClickHandler);
  };

  // Обработчик удаления сообщений при отправки формы по клику на документ
  var documentClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      removeFormMessage();
    }
  };

  // Обработчик удаления сообщений при отправки формы по по клику на Escape
  var escapeClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      removeFormMessage();
    }
  };

  // Отправка формы
  var submitSendFormHandler = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm),
        function () {
          addFormMessage(messageSuccess);
          window.mapArea.disablePage();
        },
        function () {
          addFormMessage(messageError);
          validateFormFields(inputs);
        });
  };

  var validateFormFields = function (inputFields) {
    inputFields.forEach(function (item) {
      item.classList.toggle('error-form', !item.validity.valid);
    });
  };

  var formSubmitClickHandler = function () {
    validateFormFields(inputs);
    pinMainBtn.addEventListener('keydown', window.mapArea.pinMainKeydownHandler);
    pinMainBtn.addEventListener('mousedown', window.mapArea.pinMainMousedownHandler);
  };

  var removeUploadingAvatar = function () {
    var defaultAvatarSrc = 'img/muffin-grey.svg';
    var avatar = document.querySelector('.ad-form-header__preview img');
    avatar.src = defaultAvatarSrc;
  };

  var removeUploadingPics = function () {
    var pics = document.querySelectorAll('.form__uploading-photo');
    pics.forEach(function (it) {
      it.remove();
    });
  };

  var formResetClickHandler = function () {
    window.cardPopup.close();
    window.mapArea.disablePage();
    pinMainBtn.addEventListener('keydown', window.mapArea.pinMainKeydownHandler);
    pinMainBtn.addEventListener('mousedown', window.mapArea.pinMainMousedownHandler);
    window.filter.reset();
    removeUploadingAvatar();
    removeUploadingPics();
  };

  adFormReset.addEventListener('click', formResetClickHandler);

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    adForm: adForm,
    addressInput: addressInput,
    formFieldsets: formFieldsets,
    inputs: inputs,
    guestsNumber: guestsNumber,
    enable: enableFieldsets,
    disable: disableFieldsets,
    formSubmitClickHandler: formSubmitClickHandler
  };
})();
