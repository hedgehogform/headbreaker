---
title: Irregular
description: Puzzle with pieces of different sizes.
draft: false
---

## Code

```javascript
const irregular = new headbreaker.Canvas('irregular-canvas', {
  proximity: 25,
  width: 500, height: 300,
  outline: new headbreaker.outline.Rounded()
});
irregular.sketchPiece({
  structure: { right: headbreaker.Slot, left: headbreaker.Slot },
  metadata: { id: 'a', color: '#B87D32' },
  size: headbreaker.diameter({x: 50, y: 50})
});
// ... more pieces with different sizes ...
irregular.sketchPiece({
  structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Slot, left: headbreaker.Tab },
  metadata: { id: 'd', color: '#A4C234' },
  size: headbreaker.diameter({x: 100, y: 50})
});
irregular.sketchPiece({
  structure: { up: headbreaker.Slot, right: headbreaker.Slot, down: headbreaker.Tab, left: headbreaker.Tab },
  metadata: { id: 'g', color: '#B83361' },
  size: headbreaker.diameter({x: 50, y: 100})
});
irregular.draw();
```

## Demo

<div id="irregular-canvas" class="demo-canvas"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const irregular = new headbreaker.Canvas('irregular-canvas', {
    proximity: 25,
    width: 500, height: 300,
    outline: new headbreaker.outline.Rounded()
  });
  irregular.sketchPiece({
    structure: { right: headbreaker.Slot, left: headbreaker.Slot },
    metadata: { id: 'a', color: '#B87D32' },
    size: headbreaker.diameter({x: 50, y: 50})
  });
  irregular.sketchPiece({
    structure: { up: headbreaker.Tab, right: headbreaker.Tab, down: headbreaker.Tab, left: headbreaker.Tab },
    metadata: { id: 'b', color: '#37AB8C' },
    size: headbreaker.diameter({x: 100, y: 50})
  });
  irregular.sketchPiece({
    structure: { right: headbreaker.Slot, left: headbreaker.Slot },
    metadata: { id: 'c', color: '#B87D32' },
    size: headbreaker.diameter({x: 50, y: 50})
  });
  irregular.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Tab, down: headbreaker.Slot, left: headbreaker.Tab },
    metadata: { id: 'd', color: '#A4C234' },
    size: headbreaker.diameter({x: 100, y: 50})
  });
  irregular.sketchPiece({
    structure: { up: headbreaker.Tab, right: headbreaker.Tab, down: headbreaker.Slot, left: headbreaker.Slot },
    metadata: { id: 'e', color: '#3934C2' },
    size: headbreaker.diameter({x: 50, y: 100})
  });
  irregular.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Slot, down: headbreaker.Tab, left: headbreaker.Tab },
    metadata: { id: 'f', color: '#B83361' },
    size: headbreaker.diameter({x: 50, y: 100})
  });
  irregular.sketchPiece({
    structure: { up: headbreaker.Slot, right: headbreaker.Slot, down: headbreaker.Tab, left: headbreaker.Tab },
    metadata: { id: 'g', color: '#B83361' },
    size: headbreaker.diameter({x: 50, y: 100})
  });
  irregular.shuffle(0.7);
  irregular.draw();
});
</script>
