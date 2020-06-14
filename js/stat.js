'use strict';

(function () {

  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_RADIUS = 10;

  var GAP = 10;
  var COL_WIDTH = 40;
  var MAX_HEIGHT = 150;
  var COL_GAP = 50;
  var TEXT_HEIGHT = 20;


  // Генерим сообщение
  function renderMessage(ctx, isWinner) {
    var message = isWinner ? 'Ура! Вы победили!' : 'Вы проиграли:(';
    var x = CLOUD_X + 2 * GAP;
    var y = CLOUD_Y + 2 * GAP;
    ctx.fillStyle = '#000';
    ctx.fillText(message, x, y);
    ctx.fillText('Список результатов:', x, y + TEXT_HEIGHT);
  }

  // Генерим элемент гистограммы
  function renderItem(ctx, index, name, time, maxTime) {
    var color = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : setRandomColor('hsl(240, 100%, 50%)');

    var x = CLOUD_X + COL_GAP + (COL_WIDTH + COL_GAP) * index;
    var y = CLOUD_Y + CLOUD_HEIGHT;
    var colHeight = (MAX_HEIGHT * time) / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(name, x, y - TEXT_HEIGHT - 0.5 * GAP);
    ctx.fillText(Math.round(time), x, y - 2 * TEXT_HEIGHT - GAP - colHeight);

    ctx.fillStyle = color;
    ctx.fillRect(x, y - TEXT_HEIGHT - GAP, COL_WIDTH, -colHeight);
  }

  // Рандомная насыщенность
  function setRandomColor(basicColor) {
    return basicColor.replace(/\d+%/, Math.round(Math.random() * 100) + '%');
  }

  // Рисуем прямоугольник со скруглениями
  function drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  window.renderStatistics = function (ctx, players, times) {
    var minTime = Math.min.apply(null, times);
    var maxTime = Math.max.apply(null, times);
    var isWinner = false;
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';

    // Рисуем облако
    drawRoundedRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_RADIUS, '#00000070');
    drawRoundedRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_RADIUS, '#fff');

    // Рисуем гистограмму в цикле
    for (var i = 0; i < players.length; i++) {
      if (players[i] === 'Вы' && times[i] === minTime) {
        isWinner = true;
      }
      renderItem(ctx, i, players[i], times[i], maxTime);
    }
    // Выводим сообщение
    renderMessage(ctx, isWinner);
  };
})();
