'use strict'


var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();


var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');


// Случайный элемент массива
var getRandomArrayElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

var makeRandomName = function (firstNames, lastNames) {
  var firstName = getRandomArrayElement(firstNames);
  var lastName = getRandomArrayElement(lastNames)
  return firstName + ' ' + lastName;
}

var createWizard = function () {
  return {
    name: makeRandomName(FIRST_NAMES, LAST_NAMES),
    coatColor: getRandomArrayElement(COAT_COLORS),
    eyesColor: getRandomArrayElement(EYES_COLORS)
  }
}

var createWizards = function (number) {
  var wizards = [];
  for (var i = 0; i < number; i++) {
    wizards.push(createWizard());
  }
  return wizards;
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var wizards = createWizards(4);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
};
similarListElement.appendChild(fragment);


// Запоняем форму

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  if (document.activeElement !== userNameInput) {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

var getNextArrayElement = function (current, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === current) {
      return array[(i + 1) % array.length];
    }
  };
};

var RgbToHex = function (rgb) {
  var separator = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(separator);

  var r = (+rgb[0]).toString(16);
  var g = (+rgb[1]).toString(16);
  var b = (+rgb[2]).toString(16);

  if (r.length === 1) {
    r = "0" + r;
  }

  if (g.length === 1) {
    g = "0" + g;
  }

  if (b.length === 1) {
    b = "0" + b;
  }

  return "#" + r + g + b;
};

var hexToRgb = function (hex) {
  var r = 0, g = 0, b = 0;
  r = "0x" + hex[1] + hex[2];
  g = "0x" + hex[3] + hex[4];
  b = "0x" + hex[5] + hex[6];
  return "rgb(" + +r + "," + +g + "," + +b + ")";
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});

setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

wizardCoat.addEventListener('click', function () {
  var current = wizardCoat.style.fill;
  wizardCoat.style.fill = getNextArrayElement(current, COAT_COLORS);
  document.querySelector('input[name=coat-color]').value = wizardCoat.style.fill;

});

wizardEyes.addEventListener('click', function () {
  var current = wizardEyes.style.fill;
  wizardEyes.style.fill = getNextArrayElement(current, EYES_COLORS);
  document.querySelector('input[name=eyes-color]').value = wizardEyes.style.fill;
});

fireball.addEventListener('click', function () {
  var current = RgbToHex(fireball.style.backgroundColor);
  fireball.style.backgroundColor = hexToRgb(getNextArrayElement(current, FIREBALL_COLORS));
  document.querySelector('input[name=fireball-color]').value = RgbToHex(fireball.style.backgroundColor);
});
