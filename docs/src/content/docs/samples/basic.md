---
title: Basic
description: A simple puzzle with manually placed colored pieces.
draft: false
---

## Code

```javascript
const basic = new headbreaker.Canvas('basic-canvas', {
  width: 500, height: 300, pieceSize: 50, proximity: 10
});
basic.sketchPiece({
  structure: { right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Slot },
  metadata: { id: 'a', currentPosition: { x: 50, y: 50 }, color: '#B87D32' }
});
basic.sketchPiece({
  structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Slot },
  metadata: { id: 'b', currentPosition: { x: 100, y: 50 }, color: '#B83361' }
});
basic.sketchPiece({
  structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Slot, left: headbreaker.Tab },
  metadata: { id: 'g', currentPosition: { x: 100, y: 190 } }
});
// ... more pieces ...
basic.draw();
```

## Demo

<div id="basic-canvas" class="demo-canvas"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const basic = new headbreaker.Canvas('basic-canvas', { width: 500, height: 300 });
  basic.sketchPiece({
    structure: { right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Slot },
    metadata: { id: 'a', currentPosition: { x: 50, y: 50 }, color: '#B87D32' }
  });
  basic.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Slot },
    metadata: { id: 'b', currentPosition: { x: 100, y: 50 }, color: '#B83361' }
  });
  basic.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Slot, left: headbreaker.Tab },
    metadata: { id: 'g', currentPosition: { x: 100, y: 190 } }
  });
  basic.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Slot },
    metadata: { id: 'c', currentPosition: { x: 150, y: 50 }, color: '#B83361' }
  });
  basic.sketchPiece({
    structure: { up: headbreaker.Slot, down: headbreaker.Slot, left: headbreaker.Slot },
    metadata: { id: 'd', currentPosition: { x: 150, y: 100 }, color: '#37AB8C' }
  });
  basic.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Slot, down: headbreaker.Slot, left: headbreaker.Slot },
    metadata: { id: 'e', currentPosition: { x: 250, y: 200 }, color: '#3934C2' }
  });
  basic.sketchPiece({
    structure: { up: headbreaker.Tab, right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Tab },
    metadata: { id: 'f', currentPosition: { x: 250, y: 150 }, color: '#A4C234' }
  });
  basic.draw();
});
</script>
