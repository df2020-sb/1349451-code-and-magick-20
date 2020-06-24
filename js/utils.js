'use strict';
(function () {

  var rgbToHex = function (rgb) {
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

  var getRandomArrayElements = function (arr, n) {
    var newArray = [];
    while (n--) {
      newArray.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return newArray;
  };

  var getNextArrayElement = function (current, array) {
    return array[(array.indexOf(current) + 1) % array.length];
  };


  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callback.apply(null, parameters);
      }, 500);
    };
  };

  var makeDraggable = function (element, dragHandle) {
    dragHandle.addEventListener('mousedown', function (evt) {
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

        element.style.top = (element.offsetTop - diff.y) + 'px';
        element.style.left = (element.offsetLeft - diff.x) + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            dragHandle.removeEventListener('click', onClickPreventDefault);
          };
          dragHandle.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };


  window.utils = {
    rgbToHex: rgbToHex,
    hexToRgb: hexToRgb,
    getRandomArrayElements: getRandomArrayElements,
    getNextArrayElement: getNextArrayElement,
    debounce: debounce,
    makeDraggable: makeDraggable,
  };

})();
