'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var dialogPosition = {
    x: userDialog.style.left,
    y: userDialog.style.top
  };

  var dialogOpen = document.querySelector('.setup-open-icon');
  var dialogClose = userDialog.querySelector('.setup-close');
  var dialogDrag = userDialog.querySelector('.upload');

  var userNameInput = userDialog.querySelector('.setup-user-name');
  var coatInput = document.querySelector('input[name=coat-color]');
  var eyesInput = document.querySelector('input[name=eyes-color]');
  var fireballInput = document.querySelector('input[name=fireball-color]');
  var similarWizardsContainer = document.querySelector('.setup-similar');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  // Открытие закрытие диалога
  var onDialogEscPress = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeDialog();
    }
  };

  var openDialog = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
  };

  var closeDialog = function () {
    if (document.activeElement !== userNameInput) {
      userDialog.classList.add('hidden');
      userDialog.style.left = dialogPosition.x;
      userDialog.style.top = dialogPosition.y;
      document.removeEventListener('keydown', onDialogEscPress);
    }
  };

  dialogOpen.addEventListener('click', function () {
    openDialog();
  });

  dialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      openDialog();
    }
  });

  dialogClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeDialog();
  });


  // Дрэг

  dialogDrag.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var diff = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - diff.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - diff.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogDrag.removeEventListener('click', onClickPreventDefault)
        };
        dialogDrag.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // Раскрашивание мага

  wizardCoat.addEventListener('click', function () {
    var currentColor = wizardCoat.style.fill;
    var newColor = window.utils.getNextArrayElement(currentColor, window.colors.COAT_COLORS);
    wizardCoat.style.fill = newColor;
    coatInput.value = newColor;

  });

  wizardEyes.addEventListener('click', function () {
    var currentColor = wizardEyes.style.fill;
    var newColor = window.utils.getNextArrayElement(currentColor, window.colors.EYES_COLORS);
    wizardEyes.style.fill = newColor;
    eyesInput.value = newColor;
  });

  fireball.addEventListener('click', function () {
    var currentColor = window.utils.rgbToHex(fireball.style.backgroundColor);
    var newColor = window.utils.getNextArrayElement(currentColor, window.colors.FIREBALL_COLORS);
    fireball.style.backgroundColor = window.utils.hexToRgb(newColor);
    fireballInput.value = newColor;
  });

  window.wizards.render(4);
  similarWizardsContainer.classList.remove('hidden');
  wizardEyes.style.fill = 'black';
  fireball.style.backgroundColor = '#ee4830';

})();
