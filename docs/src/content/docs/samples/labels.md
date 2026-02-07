---
title: Labels
description: Puzzle pieces with text labels and custom connection requirements.
draft: false
---

## Code

```javascript
const labels = new headbreaker.Canvas('labels-canvas', {
  width: 400, height: 400,
  pieceSize: 80, proximity: 25,
  borderFill: 10, strokeWidth: 2,
  lineSoftness: 0.18,
});

labels.sketchPiece({
  structure: { right: headbreaker.Tab },
  metadata: {
    id: 'tree-kanji',
    color: '#23599E',
    strokeColor: '#18396B',
    label: { text: '木', fontSize: 70, x: -5, y: 5 }
  }
});

labels.sketchPiece({
  structure: { left: headbreaker.Slot },
  metadata: {
    id: 'tree-emoji',
    color: '#EBB34B',
    strokeColor: '#695024',
    label: { text: '🌳', fontSize: 70, x: 5, y: 0 }
  }
});

// ... more pieces ...
labels.shuffle(0.6);
labels.draw();
labels.attachConnectionRequirement(
  (one, other) =>
    one.metadata.id.replace('-kanji', '') ==
    other.metadata.id.replace('-emoji', '')
);
```

## Demo

<div id="labels-canvas" class="demo-canvas"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var labels = new headbreaker.Canvas('labels-canvas', {
    width: 400, height: 400,
    pieceSize: 80, proximity: 25,
    borderFill: 10, strokeWidth: 2,
    lineSoftness: 0.18,
  });
  labels.sketchPiece({
    structure: { right: headbreaker.Tab },
    metadata: { id: 'tree-kanji', color: '#23599E', strokeColor: '#18396B', label: { text: '木', fontSize: 70, x: -5, y: 5 } }
  });
  labels.sketchPiece({
    structure: { right: headbreaker.Tab },
    metadata: { id: 'fire-kanji', color: '#23599E', strokeColor: '#18396B', label: { text: '火', fontSize: 70, x: -5, y: 5 } }
  });
  labels.sketchPiece({
    structure: { right: headbreaker.Tab },
    metadata: { id: 'water-kanji', color: '#23599E', strokeColor: '#18396B', label: { text: '水', fontSize: 70, x: -5, y: 5 } }
  });
  labels.sketchPiece({
    structure: { left: headbreaker.Slot },
    metadata: { id: 'water-emoji', color: '#EBB34B', strokeColor: '#695024', label: { text: '💧', fontSize: 70, x: 5, y: 0 } }
  });
  labels.sketchPiece({
    structure: { left: headbreaker.Slot },
    metadata: { id: 'tree-emoji', color: '#EBB34B', strokeColor: '#695024', label: { text: '🌳', fontSize: 70, x: 5, y: 0 } }
  });
  labels.sketchPiece({
    structure: { left: headbreaker.Slot },
    metadata: { id: 'fire-emoji', color: '#EBB34B', strokeColor: '#695024', label: { text: '🔥', fontSize: 70, x: 5, y: 0 } }
  });
  labels.shuffle(0.6);
  labels.draw();
  labels.attachConnectionRequirement(function (one, other) {
    return one.metadata.id.replace('-kanji', '') == other.metadata.id.replace('-emoji', '');
  });
});
</script>
