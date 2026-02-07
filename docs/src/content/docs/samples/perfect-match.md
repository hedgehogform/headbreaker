---
title: Perfect Match
description: Puzzle where pieces snap to their target positions when close enough.
draft: false
---

## Code

```javascript
const perfect = new headbreaker.Canvas('perfect-canvas', {
  width: 800, height: 300,
  pieceSize: 100, proximity: 20,
  borderFill: 10,
  strokeWidth: 2, strokeColor: '#00200B',
  lineSoftness: 0.0
});

perfect.sketchPiece({
  structure: { right: headbreaker.Tab, down: headbreaker.Slot },
  metadata: { id: 'a', targetPosition: { x: 100, y: 100 }, color: '#0EC430' }
});
perfect.sketchPiece({
  structure: { right: headbreaker.Slot, left: headbreaker.Slot },
  metadata: { id: 'b', targetPosition: { x: 200, y: 100 }, color: '#098520' }
});
perfect.sketchPiece({
  structure: { down: headbreaker.Tab, left: headbreaker.Tab },
  metadata: { id: 'c', targetPosition: { x: 330, y: 80 }, color: '#04380D' }
});
// ... more pieces ...
perfect.draw();
```

## Demo

<div id="perfect-canvas" class="demo-canvas"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const perfect = new headbreaker.Canvas('perfect-canvas', {
    width: 800, height: 300,
    pieceSize: 100, proximity: 20,
    borderFill: 10,
    strokeWidth: 2, strokeColor: '#00200B',
    lineSoftness: 0.0
  });
  perfect.sketchPiece({
    structure: { right: headbreaker.Tab, down: headbreaker.Slot },
    metadata: { id: 'a', targetPosition: { x: 100, y: 100 }, color: '#0EC430' }
  });
  perfect.sketchPiece({
    structure: { right: headbreaker.Slot, left: headbreaker.Slot },
    metadata: { id: 'b', targetPosition: { x: 200, y: 100 }, color: '#098520' }
  });
  perfect.sketchPiece({
    structure: { down: headbreaker.Tab, left: headbreaker.Tab },
    metadata: { id: 'c', targetPosition: { x: 330, y: 80 }, color: '#04380D' }
  });
  perfect.sketchPiece({
    structure: { up: headbreaker.Slot },
    metadata: { id: 'd', targetPosition: { x: 480, y: 130 }, color: '#054511' }
  });
  perfect.sketchPiece({
    structure: { up: headbreaker.Tab },
    metadata: { id: 'e', targetPosition: { x: 530, y: 80 }, color: '#04330C' }
  });
  perfect.draw();
});
</script>
