'use strict';

(function () {

  var MAX_WIZARDS_NUMBER = 4;

  var wizards = [];

  var userDialog = document.querySelector('.setup');
  var dialogPosition = { x: userDialog.style.left, y: userDialog.style.top };
  var form = userDialog.querySelector('.setup-wizard-form');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var coatInput = document.querySelector('input[name=coat-color]');
  var eyesInput = document.querySelector('input[name=eyes-color]');
  var fireballInput = document.querySelector('input[name=fireball-color]');
  var dialogOpen = document.querySelector('.setup-open-icon');
  var dialogClose = userDialog.querySelector('.setup-close');
  var dialogDrag = userDialog.querySelector('.upload');

  var similarWizardsContainer = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var banner;

  var coatColor = document.querySelector('.setup-wizard .wizard-coat').style.fill;
  var eyesColor = 'black';

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


  // Запросы

  var removeBanner = function () {
    if (banner) {
      banner.remove();
    }
  };

  var renderBanner = function (text) {
    banner = document.createElement('div');
    banner.classList.add('error-banner');
    banner.textContent = text;
    document.body.insertAdjacentElement('afterbegin', banner);
  };

  var onSaveSuccess = function () {
    userDialog.classList.add('hidden');
    dialogOpen.src = dialogDrag.querySelector('img').src;
  };

  var onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
    similarWizardsContainer.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    renderBanner(errorMessage);
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    removeBanner();
    window.backend.save(new FormData(form), onSaveSuccess, onError);
  };


  // Список похожих

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var sortNames = function (left, right) {
    return left > right ? 1 : left < right ? -1 : 0;
  };

  var updateWizards = function () {
    similarListElement.innerHTML = '';
    window.wizards.render(wizards.slice().sort(function (left, right) {
      return getRank(right) === getRank(left)
        ? sortNames(left.name, right.name)
        : getRank(right) - getRank(left);
    }), MAX_WIZARDS_NUMBER);
  };

  window.mainWizard.onCoatChange = window.utils.debounce(function (color) {
    coatInput.value = color;
    coatColor = color;
    updateWizards();
  });

  window.mainWizard.onEyesChange = window.utils.debounce(function (color) {
    eyesInput.value = color;
    eyesColor = color;
    updateWizards();
  });

  window.mainWizard.onFireballChange = function (color) {
    fireballInput.value = color;
  };

  window.backend.load(onLoadSuccess, onError);
  form.addEventListener('submit', onSubmit);
  window.utils.makeDraggable(userDialog, dialogDrag);

})();
