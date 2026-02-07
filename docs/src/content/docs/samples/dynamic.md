---
title: Dynamic
description: Pieces with labels that update dynamically when connected or disconnected.
draft: false
---

## Code

```javascript
function updateLabel(piece, figure, delta) {
  piece.metadata.label.text = Number(piece.metadata.label.text) + delta;
  figure.label.text(piece.metadata.label.text);
}

const dynamic = new headbreaker.Canvas('dynamic-canvas', {
  width: 700, height: 700, pieceSize: 100,
  proximity: 20, borderFill: 10, lineSoftness: 0.2, strokeWidth: 0
});
dynamic.defineTemplate('A', {
  structure: 'TTSS',
  metadata: { label: { text: '0', x: 22 }, color: '#DB7BBF' }
});
dynamic.defineTemplate('B', {
  structure: 'TTTT',
  metadata: { label: { text: '0', x: 22 }, color: '#438D8F' }
});
dynamic.defineTemplate('C', {
  structure: 'SSSS',
  metadata: { label: { text: '0', x: 22 }, color: '#DBC967' }
});
// ... more templates ...

dynamic.sketchPieceUsingTemplate('a', 'A');
dynamic.sketchPieceUsingTemplate('b', 'A');
dynamic.sketchPieceUsingTemplate('c', 'B');
dynamic.sketchPieceUsingTemplate('d', 'C');
dynamic.sketchPieceUsingTemplate('e', 'C');
dynamic.sketchPieceUsingTemplate('f', 'D');
dynamic.sketchPieceUsingTemplate('g', 'E');
dynamic.shuffle(0.7);
dynamic.onConnect((piece, figure, target, targetFigure) => {
  updateLabel(piece, figure, 1);
  updateLabel(target, targetFigure, 1);
  dynamic.redraw();
});
dynamic.onDisconnect((piece, figure, target, targetFigure) => {
  updateLabel(piece, figure, -1);
  updateLabel(target, targetFigure, -1);
  dynamic.redraw();
});
dynamic.draw();
```

## Demo

<div id="dynamic-canvas" class="demo-canvas"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  function updateLabel(piece, figure, delta) {
    piece.metadata.label.text = Number(piece.metadata.label.text) + delta;
    figure.label.text(piece.metadata.label.text);
  }
  var dynamic = new headbreaker.Canvas('dynamic-canvas', {
    width: 700, height: 700, pieceSize: 100,
    proximity: 20, borderFill: 10, lineSoftness: 0.2, strokeWidth: 0
  });
  dynamic.defineTemplate('A', { structure: 'TTSS', metadata: { label: { text: '0', x: 22 }, color: '#DB7BBF' } });
  dynamic.defineTemplate('B', { structure: 'TTTT', metadata: { label: { text: '0', x: 22 }, color: '#438D8F' } });
  dynamic.defineTemplate('C', { structure: 'SSSS', metadata: { label: { text: '0', x: 22 }, color: '#DBC967' } });
  dynamic.defineTemplate('D', { structure: 'STTT', metadata: { label: { text: '0', x: 22 }, color: '#8F844A' } });
  dynamic.defineTemplate('E', { structure: 'SSTT', metadata: { label: { text: '0', x: 22 }, color: '#7DDADB' } });
  dynamic.sketchPieceUsingTemplate('a', 'A');
  dynamic.sketchPieceUsingTemplate('b', 'A');
  dynamic.sketchPieceUsingTemplate('c', 'B');
  dynamic.sketchPieceUsingTemplate('d', 'C');
  dynamic.sketchPieceUsingTemplate('e', 'C');
  dynamic.sketchPieceUsingTemplate('f', 'D');
  dynamic.sketchPieceUsingTemplate('g', 'E');
  dynamic.onConnect(function (piece, figure, target, targetFigure) {
    updateLabel(piece, figure, 1);
    updateLabel(target, targetFigure, 1);
    dynamic.redraw();
  });
  dynamic.onDisconnect(function (piece, figure, target, targetFigure) {
    updateLabel(piece, figure, -1);
    updateLabel(target, targetFigure, -1);
    dynamic.redraw();
  });
  dynamic.shuffle(0.7);
  dynamic.draw();
});
</script>
