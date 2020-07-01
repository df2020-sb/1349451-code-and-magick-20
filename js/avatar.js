'use strict';

(function () {
  var EXTENSIONS = ['gif', 'jpeg', 'jpg', 'png'];

  var filePicker = document.querySelector('.upload input');
  var avatar = document.querySelector('.setup-user-pic');

  filePicker.addEventListener('change', function () {
    var file = filePicker.files[0];
    var fileName = file.name.toLowerCase();

    var isValidExtension = EXTENSIONS.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (isValidExtension) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
