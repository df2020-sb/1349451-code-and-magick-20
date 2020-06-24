'use strict';

(function () {

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');


  var mainWizard = {
    onCoatChange: function (color) { },
    onEyesChange: function (color) { },
    onFireballChange: function (color) { }
  };


  wizardCoat.addEventListener('click', function () {
    var currentColor = wizardCoat.style.fill;
    var newColor = window.utils.getNextArrayElement(currentColor, window.colors.COAT_COLORS);
    wizardCoat.style.fill = newColor;
    mainWizard.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var currentColor = wizardEyes.style.fill;
    var newColor = window.utils.getNextArrayElement(currentColor, window.colors.EYES_COLORS);
    wizardEyes.style.fill = newColor;
    mainWizard.onEyesChange(newColor);

  });

  fireball.addEventListener('click', function () {
    var currentColor = window.utils.rgbToHex(fireball.style.backgroundColor);
    var newColor = window.utils.getNextArrayElement(currentColor, window.colors.FIREBALL_COLORS);
    fireball.style.backgroundColor = window.utils.hexToRgb(newColor);
    mainWizard.onFireballChange(newColor);
  });

  wizardEyes.style.fill = 'black';
  fireball.style.backgroundColor = '#ee4830';
  window.mainWizard = mainWizard;
})();
