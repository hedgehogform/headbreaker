---
title: Background
description: Puzzle with an image background split across pieces.
draft: false
---

## Code

```javascript
let vangogh = new Image();
vangogh.src = 'static/vangogh.jpg';
vangogh.onload = () => {
  const background = new headbreaker.Canvas('background-canvas', {
    width: 800, height: 650,
    pieceSize: 100, proximity: 20,
    borderFill: 10, strokeWidth: 2,
    lineSoftness: 0.12, image: vangogh,
    // optional, but it must be set in order to activate image scaling
    maxPiecesCount: {x: 5, y: 5}
  });

  background.adjustImagesToPuzzleHeight();
  background.sketchPiece({
    structure: 'TS--',
    metadata: { id: 'a', targetPosition: { x: 100, y: 100 } },
  });
  background.sketchPiece({
    structure: 'SSS-',
    metadata: { id: 'b', targetPosition: { x: 200, y: 100 } },
  });
  // ... more pieces ...
  background.sketchPiece({
    structure: '--TT',
    metadata: { id: 'y', targetPosition: { x: 500, y: 500 },
      currentPosition: { x: 570, y: 560 } }
  });
  background.draw();
}
```

## Demo

<div id="background-canvas" class="demo-canvas"></div>
<div class="demo-buttons">
  <button id="background-shuffle">Shuffle</button>
  <button id="background-shuffle-grid">Shuffle Grid</button>
  <button id="background-shuffle-columns">Shuffle Columns</button>
  <button id="background-solve">Solve</button>
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
  var vangogh = new Image();
  vangogh.src = '/headbreaker/static/vangogh.jpg';
  vangogh.onload = function () {
    var background = new headbreaker.Canvas('background-canvas', {
      width: 800, height: 650,
      pieceSize: 100, proximity: 20,
      borderFill: 10, strokeWidth: 2,
      lineSoftness: 0.12, image: vangogh,
      maxPiecesCount: {x: 5, y: 5}
    });
    background.adjustImagesToPuzzleHeight();
    background.sketchPiece({ structure: 'TS--', metadata: { id: 'a', targetPosition: { x: 100, y: 100 } } });
    background.sketchPiece({ structure: 'SSS-', metadata: { id: 'b', targetPosition: { x: 200, y: 100 } } });
    background.sketchPiece({ structure: 'STT-', metadata: { id: 'c', targetPosition: { x: 300, y: 100 } } });
    background.sketchPiece({ structure: 'STT-', metadata: { id: 'd', targetPosition: { x: 400, y: 100 } } });
    background.sketchPiece({ structure: '-TT-', metadata: { id: 'e', targetPosition: { x: 500, y: 100 } } });
    background.sketchPiece({ structure: 'TS-T', metadata: { id: 'f', targetPosition: { x: 100, y: 200 } } });
    background.sketchPiece({ structure: 'SSST', metadata: { id: 'g', targetPosition: { x: 200, y: 200 } } });
    background.sketchPiece({ structure: 'STTS', metadata: { id: 'h', targetPosition: { x: 300, y: 200 } } });
    background.sketchPiece({ structure: 'TSTS', metadata: { id: 'i', targetPosition: { x: 400, y: 200 } } });
    background.sketchPiece({ structure: '-SSS', metadata: { id: 'j', targetPosition: { x: 500, y: 200 } } });
    background.sketchPiece({ structure: 'ST-T', metadata: { id: 'k', targetPosition: { x: 100, y: 300 } } });
    background.sketchPiece({ structure: 'TSTT', metadata: { id: 'l', targetPosition: { x: 200, y: 300 } } });
    background.sketchPiece({ structure: 'STSS', metadata: { id: 'm', targetPosition: { x: 300, y: 300 } } });
    background.sketchPiece({ structure: 'TTTT', metadata: { id: 'n', targetPosition: { x: 400, y: 300 } } });
    background.sketchPiece({ structure: '-SST', metadata: { id: 'o', targetPosition: { x: 500, y: 300 } } });
    background.sketchPiece({ structure: 'ST-S', metadata: { id: 'p', targetPosition: { x: 100, y: 400 } } });
    background.sketchPiece({ structure: 'TSTT', metadata: { id: 'q', targetPosition: { x: 200, y: 400 } } });
    background.sketchPiece({ structure: 'TTSS', metadata: { id: 'r', targetPosition: { x: 300, y: 400 } } });
    background.sketchPiece({ structure: 'SSSS', metadata: { id: 's', targetPosition: { x: 400, y: 400 } } });
    background.sketchPiece({ structure: '-STT', metadata: { id: 't', targetPosition: { x: 500, y: 400 }, currentPosition: { x: 613, y: 386 } } });
    background.sketchPiece({ structure: 'T--S', metadata: { id: 'u', targetPosition: { x: 100, y: 500 } } });
    background.sketchPiece({ structure: 'T-ST', metadata: { id: 'v', targetPosition: { x: 200, y: 500 } } });
    background.sketchPiece({ structure: 'T-SS', metadata: { id: 'w', targetPosition: { x: 300, y: 500 } } });
    background.sketchPiece({ structure: 'S-ST', metadata: { id: 'x', targetPosition: { x: 400, y: 500 }, currentPosition: { x: 425, y: 530 } } });
    background.sketchPiece({ structure: '--TT', metadata: { id: 'y', targetPosition: { x: 500, y: 500 }, currentPosition: { x: 570, y: 560 } } });
    background.draw();
    registerButtons('background', background);
  };
});
</script>
