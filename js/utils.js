'use strict';
window.utils = (function () {

  return {

    rgbToHex: function (rgb) {
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
    },

    hexToRgb: function (hex) {
      var r = 0, g = 0, b = 0;
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
      return "rgb(" + +r + "," + +g + "," + +b + ")";
    },

    getRandomArrayElement: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length)
      return arr[randomIndex]
    },

    getNextArrayElement: function (current, array) {
      return array[(array.indexOf(current) + 1) % array.length];
    }
  }

})()
