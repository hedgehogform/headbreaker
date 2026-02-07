---
title: Rectangular
description: Puzzle with non-square rectangular pieces.
draft: false
---

## Code

```javascript
let quinquela = new Image();
quinquela.src = 'static/quinquela.jpg';
quinquela.onload = () => {
  const rectangular = new headbreaker.Canvas('rectangular-canvas', {
    width: 800, height: 650,
    pieceSize: {x: 200, y: 120}, proximity: 20,
    borderFill: {x: 20, y: 12}, strokeWidth: 1.5,
    lineSoftness: 0.18, image: quinquela
  });

  rectangular.adjustImagesToPuzzleWidth();
  rectangular.autogenerate({
    horizontalPiecesCount: 3,
    verticalPiecesCount: 3
  });
  rectangular.draw();
}
```

## Demo

<div id="rectangular-canvas" class="demo-canvas"></div>
<div class="demo-buttons">
  <button id="rectangular-shuffle">Shuffle</button>
  <button id="rectangular-shuffle-grid">Shuffle Grid</button>
  <button id="rectangular-shuffle-columns">Shuffle Columns</button>
  <button id="rectangular-solve">Solve</button>
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
  var quinquela = new Image();
  quinquela.src = '/headbreaker/static/quinquela.jpg';
  quinquela.onload = function () {
    var rectangular = new headbreaker.Canvas('rectangular-canvas', {
      width: 800, height: 650,
      pieceSize: {x: 200, y: 120}, proximity: 20,
      borderFill: {x: 20, y: 12}, strokeWidth: 1.5,
      lineSoftness: 0.18, image: quinquela
    });
    rectangular.adjustImagesToPuzzleWidth();
    rectangular.autogenerate({
      horizontalPiecesCount: 3,
      verticalPiecesCount: 3
    });
    rectangular.draw();
    registerButtons('rectangular', rectangular);
  };
});
</script>
