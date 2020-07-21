'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var Code = {
    OK: 200,
  };
  var TIMEOUT_IN_MS = 10000;
  var ONE_SECOND_IN_MS = 1000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / ONE_SECOND_IN_MS + 'с');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
