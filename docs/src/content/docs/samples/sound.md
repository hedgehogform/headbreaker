---
title: Sound & Visual Feedback
description: Play sounds and highlight pieces when they connect or disconnect.
draft: false
---

## Code

```javascript
var audio = new Audio('static/connect.wav');
let berni = new Image();
berni.src = 'static/berni.jpg';
berni.onload = () => {
  const sound = new headbreaker.Canvas('sound-canvas', {
    width: 800, height: 650,
    pieceSize: 100, proximity: 20,
    borderFill: 10, strokeWidth: 1.5,
    lineSoftness: 0.18, image: berni,
    strokeColor: 'black'
  });

  sound.adjustImagesToPuzzleHeight();
  sound.autogenerate({
    horizontalPiecesCount: 6,
    insertsGenerator: headbreaker.generators.random
  });

  sound.draw();

  sound.onConnect((_piece, figure, _target, targetFigure) => {
    // play sound
    audio.play();

    // paint borders on click
    figure.shape.stroke('yellow');
    targetFigure.shape.stroke('yellow');
    sound.redraw();

    setTimeout(() => {
      // restore border colors later
      figure.shape.stroke('black');
      targetFigure.shape.stroke('black');
      sound.redraw();
    }, 200);
  });

  sound.onDisconnect((it) => {
    audio.play();
  });
}
```

## Demo

<div id="sound-canvas" class="demo-canvas"></div>
<div class="demo-buttons">
  <button id="sound-shuffle">Shuffle</button>
  <button id="sound-shuffle-grid">Shuffle Grid</button>
  <button id="sound-shuffle-columns">Shuffle Columns</button>
  <button id="sound-solve">Solve</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  function onClick(id, handler) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function () { handler(); });
  }
  function registerButtons(id, canvas) {
    onClick(id + '-shuffle', function () { canvas.shuffle(0.8); canvas.redraw(); });
    onClick(id + '-shuffle-grid', function () { canvas.shuffleGrid(1.2); canvas.redraw(); });
    onClick(id + '-shuffle-columns', function () { canvas.shuffleColumns(1.2); canvas.redraw(); });
    onClick(id + '-solve', function () { canvas.solve(); canvas.redraw(); });
  }
  var audio = new Audio('/headbreaker/static/connect.wav');
  var berni = new Image();
  berni.src = '/headbreaker/static/berni.jpg';
  berni.onload = function () {
    var sound = new headbreaker.Canvas('sound-canvas', {
      width: 800, height: 650,
      pieceSize: 100, proximity: 20,
      borderFill: 10, strokeWidth: 1.5,
      lineSoftness: 0.18, image: berni,
      strokeColor: 'black'
    });
    sound.adjustImagesToPuzzleHeight();
    sound.autogenerate({
      horizontalPiecesCount: 6,
      insertsGenerator: headbreaker.generators.random
    });
    sound.draw();
    sound.onConnect(function (_piece, figure, _target, targetFigure) {
      figure.shape.stroke('yellow');
      targetFigure.shape.stroke('yellow');
      audio.play();
      sound.redraw();
      setTimeout(function () {
        figure.shape.stroke('black');
        targetFigure.shape.stroke('black');
        sound.redraw();
      }, 100);
    });
    sound.onDisconnect(function () {
      audio.play();
    });
    registerButtons('sound', sound);
  };
});
</script>
