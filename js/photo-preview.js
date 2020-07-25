'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZES = {
    'WIDTH': 70,
    'HEIGHT': 70
  };
  var fileChoosers = window.form.adForm.querySelectorAll('input[type="file"]');
  var avatarPreview = window.form.adForm.querySelector('.ad-form-header__preview img');
  var photoContainer = window.form.adForm.querySelector('.ad-form__photo-container');

  var chooserChangeListener = function (evt) {
    var file = evt.target.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (type) {
        return fileName.endsWith(type);
      });
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target.id === 'avatar') {
          avatarPreview.src = reader.result;
        } else {
          var photo = document.createElement('img');
          var photoHolder = window.form.adForm.querySelector('.ad-form__photo');
          photoHolder.classList.add('visually-hidden');
          photo.src = reader.result;
          photo.classList.add('form__uploading-photo');
          photo.width = PHOTO_SIZES.WIDTH;
          photo.height = PHOTO_SIZES.HEIGHT;
          photoContainer.appendChild(photo);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  fileChoosers.forEach(function (chooser) {
    chooser.accept = 'image/jpg,image/jpeg,image/png,image/gif';
    chooser.addEventListener('change', chooserChangeListener);
  });
  fileChoosers[0].name = 'user-photo';
  fileChoosers[1].name = 'photos';
})();
