'use strict';

(function () {

  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var fragment = document.createDocumentFragment();

  var makeRandomName = function (firstNames, lastNames) {
    var firstName = window.utils.getRandomArrayElement(firstNames);
    var lastName = window.utils.getRandomArrayElement(lastNames)
    return firstName + ' ' + lastName;
  };

  var createWizard = function () {
    return {
      name: makeRandomName(FIRST_NAMES, LAST_NAMES),
      coatColor: window.utils.getRandomArrayElement(window.colors.COAT_COLORS),
      eyesColor: window.utils.getRandomArrayElement(window.colors.EYES_COLORS)
    }
  };

  var createWizards = function (number) {
    var wizards = [];
    for (var i = 0; i < number; i++) {
      wizards.push(createWizard());
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  window.renderWizards = function (number) {
    var wizards = createWizards(4);
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    };
    similarListElement.appendChild(fragment);
  };

})();
