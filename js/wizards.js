'use strict';

(function () {

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var fragment = document.createDocumentFragment();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (wizards, max) {
    var randomWizards = window.utils.getRandomArrayElements(wizards, max);
    for (var i = 0; i < randomWizards.length; i++) {
      fragment.appendChild(renderWizard(randomWizards[i]));
    };
    similarListElement.appendChild(fragment);
  };

  window.wizards = {
    render: renderWizards,
  }

})();
