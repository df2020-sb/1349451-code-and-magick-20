'use strict'

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();


var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
var coatColors = ['rgb(101, 137, 164)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green']


// Случайный элемент массива
var rnd = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

var makeRandomName = function (firstNames, lastNames, isRandomOrder) {
  var firstName = rnd(firstNames);
  var lastName = rnd(lastNames)
  return isRandomOrder ? shuffleNames([firstName, lastName]).join(' ') : firstName + ' ' + lastName;
}

//Перемешиваем имена (Фишер-Йейтс для 2 элементов:))
var shuffleNames = function (names) {
  let j = Math.floor(Math.random() * 2);
  [names[0], names[j]] = [names[j], names[0]];
  return names
}

var createWizards = function (number) {
  var wizards = [];
  for (var i = 0; i < number; i++) {
    var newWizard = {
      name: makeRandomName(firstNames, lastNames, true),
      coatColor: rnd(coatColors),
      eyesColor: rnd(eyesColors)
    }
    wizards.push(newWizard)
  }
  return wizards
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

var wizards = createWizards(4);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');





