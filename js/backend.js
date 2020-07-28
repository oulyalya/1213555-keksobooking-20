'use strict';

(function () {
  var ServerUrl = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking',
  };

  var Code = {
    OK: 200,
  };

  var MessageText = {
    ERROR_LOAD: 'Произошла неизвестная ошибка. Пожалуйста, обновите страницу.',
    ERROR_SERVER: 'Произошла ошибка соединения. Пожалуйста, обновите страницу.',
    ERROR_TIMEOUT: 'Сервер долго не отвечает. Пожалуйста, обновите страницу.',
  };

  var createXhr = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.OK) {
        onSuccess(xhr.response);
      } else {
        onError(MessageText.ERROR_LOAD);
      }
    });

    xhr.addEventListener('error', function () {
      onError(MessageText.ERROR_SERVER);
    });

    xhr.addEventListener('timeout', function () {
      onError(MessageText.ERROR_TIMEOUT);
    });

    xhr.open(method, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    createXhr('GET', ServerUrl.LOAD, onSuccess, onError).send();
  };

  var upload = function (data, onSuccess, onError) {
    createXhr('POST', ServerUrl.UPLOAD, onSuccess, onError).send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
