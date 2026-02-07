---
title: Keyboard Gestures
description: Drag pieces individually or as a group using shift and ctrl keys.
draft: false
---

## Code

```javascript
let amaral = new Image();
amaral.src = 'static/amaral.jpg';
amaral.onload = () => {
  const keyboard = new headbreaker.Canvas('keyboard-canvas', {
    width: 800, height: 650, pieceSize: 60,
    image: amaral, strokeWidth: 2.5, strokeColor: '#F0F0F0',
    outline: new headbreaker.outline.Rounded()
  });

  keyboard.adjustImagesToPuzzleWidth();
  keyboard.autogenerate({
    horizontalPiecesCount: 6,
    verticalPiecesCount: 7,
    insertsGenerator: headbreaker.generators.random
  });

  // make canvas focusable and listen
  // to ctrl and shift keys in order to force
  // pieces to be dragged individually or as a whole,
  // respectively
  keyboard.registerKeyboardGestures();
  keyboard.draw();
}
```

:::tip
Try dragging pieces from the borders or the center while pressing `shift` and `ctrl` keys.
:::

## Demo

<div id="keyboard-canvas" class="demo-canvas"></div>
<div class="demo-buttons">
  <button id="keyboard-shuffle">Shuffle</button>
  <button id="keyboard-shuffle-grid">Shuffle Grid</button>
  <button id="keyboard-shuffle-columns">Shuffle Columns</button>
  <button id="keyboard-solve">Solve</button>
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
  var amaral = new Image();
  amaral.src = '/headbreaker/static/amaral.jpg';
  amaral.onload = function () {
    var keyboard = new headbreaker.Canvas('keyboard-canvas', {
      width: 800, height: 650, pieceSize: 60,
      image: amaral, strokeWidth: 2.5, strokeColor: '#F0F0F0',
      outline: new headbreaker.outline.Rounded()
    });
    keyboard.adjustImagesToPuzzleWidth();
    keyboard.autogenerate({
      horizontalPiecesCount: 6,
      verticalPiecesCount: 7,
      insertsGenerator: headbreaker.generators.random
    });
    keyboard.registerKeyboardGestures();
    keyboard.draw();
    registerButtons('keyboard', keyboard);
  };
});
</script>
