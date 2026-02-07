"use strict";
var headbreaker = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Anchor: () => Anchor,
    Canvas: () => Canvas,
    Classic: () => Classic,
    DummyPainter: () => DummyPainter,
    Horizontal: () => Horizontal,
    InsertSequence: () => InsertSequence,
    KonvaPainter: () => KonvaPainter,
    Manufacturer: () => Manufacturer,
    Metadata: () => metadata_exports,
    None: () => None,
    NullValidator: () => NullValidator,
    Outline: () => outline_exports,
    Painter: () => Painter,
    Pair: () => pair_exports,
    Piece: () => Piece,
    PieceValidator: () => PieceValidator,
    Puzzle: () => Puzzle,
    PuzzleValidator: () => PuzzleValidator,
    Rounded: () => Rounded,
    Shuffler: () => shuffler_exports,
    Slot: () => Slot,
    SpatialMetadata: () => spatial_metadata_exports,
    Squared: () => Squared,
    Structure: () => structure_exports,
    Tab: () => Tab,
    Vector: () => vector_exports,
    Vertical: () => Vertical,
    anchor: () => anchor,
    apply: () => apply,
    cast: () => cast,
    connector: () => connector_exports,
    copy: () => copy,
    diameter: () => diameter,
    diff: () => diff2,
    divide: () => divide,
    dragMode: () => drag_mode_exports,
    equal: () => equal2,
    fixed: () => fixed,
    flipflop: () => flipflop,
    generators: () => sequence_exports,
    inner: () => inner,
    max: () => max,
    min: () => min,
    minus: () => minus,
    multiply: () => multiply,
    outline: () => outline_exports,
    painters: () => painters,
    plus: () => plus,
    radius: () => radius,
    randomSequence: () => random2,
    twoAndTwo: () => twoAndTwo,
    update: () => update,
    vector: () => vector,
    zero: () => zero
  });

  // src/outline.ts
  var outline_exports = {};
  __export(outline_exports, {
    Classic: () => Classic,
    Rounded: () => Rounded,
    Squared: () => Squared
  });

  // src/vector.ts
  var vector_exports = {};
  __export(vector_exports, {
    apply: () => apply,
    cast: () => cast,
    copy: () => copy,
    diff: () => diff2,
    divide: () => divide,
    equal: () => equal2,
    inner: () => inner,
    max: () => max,
    min: () => min,
    minus: () => minus,
    multiply: () => multiply,
    plus: () => plus,
    update: () => update,
    vector: () => vector,
    zero: () => zero
  });

  // src/pair.ts
  var pair_exports = {};
  __export(pair_exports, {
    diff: () => diff,
    equal: () => equal,
    isNull: () => isNull
  });
  function isNull(x, y) {
    return equal(x, y, 0, 0);
  }
  function equal(x1, y1, x2, y2, delta = 0) {
    return Math.abs(x1 - x2) <= delta && Math.abs(y1 - y2) <= delta;
  }
  function diff(x1, y1, x2, y2) {
    return [x1 - x2, y1 - y2];
  }

  // src/vector.ts
  function vector(x, y) {
    return { x, y };
  }
  function cast(value) {
    if (value == null) {
      return vector(0, 0);
    }
    if (typeof value === "number") {
      return vector(value, value);
    }
    return value;
  }
  function zero() {
    return vector(0, 0);
  }
  function equal2(one, other, delta = 0) {
    return equal(one.x, one.y, other.x, other.y, delta);
  }
  function copy({ x, y }) {
    return { x, y };
  }
  function update(v, x, y) {
    v.x = x;
    v.y = y;
  }
  function diff2(one, other) {
    return diff(one.x, one.y, other.x, other.y);
  }
  function multiply(one, other) {
    return apply(one, other, (v1, v2) => v1 * v2);
  }
  function divide(one, other) {
    return apply(one, other, (v1, v2) => v1 / v2);
  }
  function plus(one, other) {
    return apply(one, other, (v1, v2) => v1 + v2);
  }
  function minus(one, other) {
    return apply(one, other, (v1, v2) => v1 - v2);
  }
  function min(one, other) {
    return apply(one, other, Math.min);
  }
  function max(one, other) {
    return apply(one, other, Math.max);
  }
  function apply(one, other, f) {
    const first = cast(one);
    const second = cast(other);
    return { x: f(first.x, second.x), y: f(first.y, second.y) };
  }
  var inner = {
    min(one) {
      return this.apply(one, Math.min);
    },
    max(one) {
      return this.apply(one, Math.max);
    },
    apply(one, f) {
      return f(one.x, one.y);
    }
  };

  // src/outline.ts
  function select(insert, t, s, n) {
    return insert.isTab() ? t : insert.isSlot() ? s : n;
  }
  var sl = (p, t, s, n) => select(p.left, t, s, n);
  var sr = (p, t, s, n) => select(p.right, t, s, n);
  var su = (p, t, s, n) => select(p.up, t, s, n);
  var sd = (p, t, s, n) => select(p.down, t, s, n);
  var Squared = class {
    draw(piece, size = 50, borderFill = 0) {
      const sizeVector = cast(size);
      const offset = divide(multiply(borderFill, 5), sizeVector);
      const selNum = (insert, t, s, n) => select(insert, t, s, n);
      return [
        0 - offset.x,
        0 - offset.y,
        1,
        0 - offset.y,
        2,
        selNum(piece.up, -1 - offset.y, 1 - offset.y, 0 - offset.y),
        3,
        0 - offset.y,
        4 + offset.x,
        0 - offset.y,
        4 + offset.x,
        1,
        selNum(piece.right, 5 + offset.x, 3 + offset.x, 4 + offset.x),
        2,
        4 + offset.x,
        3,
        4 + offset.x,
        4 + offset.y,
        3,
        4 + offset.y,
        2,
        selNum(piece.down, 5 + offset.y, 3 + offset.y, 4 + offset.y),
        1,
        4 + offset.y,
        0 - offset.x,
        4 + offset.y,
        0 - offset.x,
        3,
        selNum(piece.left, -1 - offset.x, 1 - offset.x, 0 - offset.x),
        2,
        0 - offset.x,
        1
      ].map((it, index) => it * (index % 2 === 0 ? sizeVector.x : sizeVector.y) / 5);
    }
    isBezier() {
      return false;
    }
  };
  var Rounded = class {
    constructor({
      bezelize = false,
      bezelDepth = 2 / 5,
      insertDepth = 4 / 5,
      borderLength = 1 / 3,
      referenceInsertAxis = null
    } = {}) {
      this.bezelize = bezelize;
      this.bezelDepth = bezelDepth;
      this.insertDepth = insertDepth;
      this.borderLength = borderLength;
      this.referenceInsertAxis = referenceInsertAxis;
    }
    referenceInsertAxisLength(fullSize) {
      return this.referenceInsertAxis ? this.referenceInsertAxis.atVector(fullSize) : inner.min(fullSize);
    }
    draw(p, size = 150, _borderFill = 0) {
      const fullSize = cast(size);
      const r = Math.trunc(this.referenceInsertAxisLength(fullSize) * (1 - 2 * this.borderLength) * 100) / 100;
      const s = divide(minus(fullSize, r), 2);
      const o = multiply(r, this.insertDepth);
      const b = multiply(inner.min(s), this.bezelDepth);
      const [b0, b1, b2, b3] = this.bezels(p);
      const nx = (c) => c ? b.x : 0;
      const ny = (c) => c ? b.y : 0;
      const rsy = r + s.y;
      const rsx = r + s.x;
      const r2sy = r + 2 * s.y;
      const r2sx = r + 2 * s.x;
      return [
        nx(b0),
        0,
        ...b0 ? [0, 0, 0, 0, 0, b.y] : [],
        0,
        ny(b0),
        0,
        s.y,
        0,
        s.y,
        ...sl(
          p,
          [-o.x, s.y, -o.x, rsy],
          [o.x, s.y, o.x, rsy],
          [0, s.y, 0, rsy]
        ),
        0,
        rsy,
        0,
        rsy,
        0,
        r2sy,
        0,
        r2sy - ny(b1),
        ...b1 ? [0, r2sy, 0, r2sy, b.x, r2sy] : [],
        nx(b1),
        r2sy,
        s.x,
        r2sy,
        s.x,
        r2sy,
        ...sd(
          p,
          [s.x, r2sy + o.y, rsx, r2sy + o.y],
          [s.x, r2sy - o.y, rsx, r2sy - o.y],
          [s.x, r2sy, rsx, r2sy]
        ),
        rsx,
        r2sy,
        rsx,
        r2sy,
        r2sx,
        r2sy,
        r2sx - nx(b2),
        r2sy,
        ...b2 ? [r2sx, r2sy, r2sx, r2sy, r2sx, r2sy - b.y] : [],
        r2sx,
        r2sy - ny(b2),
        r2sx,
        rsy,
        r2sx,
        rsy,
        ...sr(
          p,
          [r2sx + o.x, rsy, r2sx + o.x, s.y],
          [r2sx - o.x, rsy, r2sx - o.x, s.y],
          [r2sx, rsy, r2sx, s.y]
        ),
        r2sx,
        s.y,
        r2sx,
        s.y,
        r2sx,
        0,
        r2sx,
        ny(b3),
        ...b3 ? [r2sx, 0, r2sx, 0, r2sx - b.x, 0] : [],
        r2sx - nx(b3),
        0,
        rsx,
        0,
        rsx,
        0,
        ...su(
          p,
          [rsx, -o.y, s.x, -o.y],
          [rsx, o.y, s.x, o.y],
          [rsx, 0, s.x, 0]
        ),
        s.x,
        0,
        s.x,
        0,
        0,
        0,
        b0 ? b.x : 0,
        0
      ];
    }
    bezels(p) {
      if (this.bezelize) {
        return [
          p.left.isNone() && p.up.isNone(),
          p.left.isNone() && p.down.isNone(),
          p.right.isNone() && p.down.isNone(),
          p.right.isNone() && p.up.isNone()
        ];
      }
      return [false, false, false, false];
    }
    isBezier() {
      return true;
    }
  };
  var Classic = new Squared();

  // src/painter.ts
  var Painter = class {
    resize(_canvas, _width, _height) {
    }
    initialize(_canvas, _id) {
    }
    reinitialize(_canvas) {
    }
    draw(_canvas) {
    }
    scale(_canvas, _factor) {
    }
    sketch(_canvas, _piece, _figure, _outline) {
    }
    fill(_canvas, _piece, _figure) {
    }
    label(_canvas, _piece, _figure) {
    }
    physicalTranslate(_canvas, _group, _piece) {
    }
    logicalTranslate(_canvas, _piece, _group) {
    }
    onDrag(_canvas, _piece, _group, _f) {
    }
    onDragEnd(_canvas, _piece, _group, _f) {
    }
    registerKeyboardGestures(_canvas, _gestures) {
    }
  };

  // src/dummy-painter.ts
  var DummyPainter = class extends Painter {
    initialize(canvas, _id) {
      canvas["__nullLayer__"] = { drawn: false, figures: 0 };
    }
    draw(canvas) {
      canvas["__nullLayer__"].drawn = true;
    }
    sketch(canvas, _piece, _figure, _outline) {
      canvas["__nullLayer__"].figures++;
    }
  };

  // src/konva-painter.ts
  var Konva;
  try {
    Konva = typeof globalThis !== "undefined" && globalThis.Konva ? globalThis.Konva : null;
  } catch (_e) {
    Konva = null;
  }
  if (!Konva) {
    Konva = {
      Stage: class {
        constructor(_options) {
          throw new Error("Konva not loaded");
        }
      }
    };
  }
  function currentPositionDiff(model, group) {
    return diff(group.x(), group.y(), model.metadata.currentPosition.x, model.metadata.currentPosition.y);
  }
  var KonvaPainter = class extends Painter {
    initialize(canvas, id) {
      const stage = new Konva.Stage({
        container: id,
        width: canvas.width,
        height: canvas.height,
        draggable: !canvas.fixed
      });
      this._initializeLayer(stage, canvas);
    }
    _initializeLayer(stage, canvas) {
      const layer = new Konva.Layer();
      stage.add(layer);
      canvas["__konvaLayer__"] = layer;
    }
    draw(canvas) {
      canvas["__konvaLayer__"].draw();
    }
    reinitialize(canvas) {
      const layer = canvas["__konvaLayer__"];
      const stage = layer.getStage();
      layer.destroy();
      this._initializeLayer(stage, canvas);
    }
    resize(canvas, width, height) {
      const layer = canvas["__konvaLayer__"];
      const stage = layer.getStage();
      stage.width(width);
      stage.height(height);
    }
    scale(canvas, factor) {
      canvas["__konvaLayer__"].getStage().scale(factor);
    }
    sketch(canvas, piece, figure, outline) {
      figure.group = new Konva.Group({
        x: piece.metadata.currentPosition.x,
        y: piece.metadata.currentPosition.y,
        draggable: !piece.metadata.fixed,
        dragBoundFunc: canvas.preventOffstageDrag ? (position) => {
          const furthermost = minus(vector(canvas.width, canvas.height), piece.size.radius);
          return max(min(position, furthermost), piece.size.radius);
        } : null
      });
      figure.shape = new Konva.Line({
        points: outline.draw(piece, piece.diameter, canvas.borderFill),
        bezier: outline.isBezier(),
        tension: outline.isBezier() ? null : canvas.lineSoftness,
        stroke: piece.metadata.strokeColor || canvas.strokeColor,
        strokeWidth: canvas.strokeWidth,
        closed: true,
        ...multiply(piece.radius, -1)
      });
      this.fill(canvas, piece, figure);
      figure.group.add(figure.shape);
      canvas["__konvaLayer__"].add(figure.group);
    }
    fill(canvas, piece, figure) {
      const image = canvas.imageMetadataFor(piece);
      figure.shape.fill(!image ? piece.metadata.color || "black" : null);
      figure.shape.fillPatternImage(image && image.content);
      figure.shape.fillPatternScale(image && { x: image.scale, y: image.scale });
      figure.shape.fillPatternOffset(image && divide(image.offset, image.scale));
    }
    label(_canvas, piece, figure) {
      figure.label = new Konva.Text({
        ...minus({
          x: piece.metadata.label.x || figure.group.width() / 2,
          y: piece.metadata.label.y || figure.group.height() / 2
        }, piece.radius),
        text: piece.metadata.label.text,
        fontSize: piece.metadata.label.fontSize,
        fontFamily: piece.metadata.label.fontFamily || "Sans Serif",
        fill: piece.metadata.label.color || "white"
      });
      figure.group.add(figure.label);
    }
    physicalTranslate(_canvas, group, piece) {
      group.x(piece.centralAnchor.x);
      group.y(piece.centralAnchor.y);
    }
    logicalTranslate(_canvas, piece, group) {
      update(piece.metadata.currentPosition, group.x(), group.y());
    }
    onDrag(canvas, piece, group, f) {
      group.on("mouseover", () => {
        document.body.style.cursor = "pointer";
      });
      group.on("mouseout", () => {
        document.body.style.cursor = "default";
      });
      group.on("dragmove", () => {
        const [dx, dy] = currentPositionDiff(piece, group);
        group.zIndex(canvas.figuresCount - 1);
        f(dx, dy);
      });
    }
    onDragEnd(_canvas, _piece, group, f) {
      group.on("dragend", () => {
        f();
      });
    }
    registerKeyboardGestures(canvas, gestures) {
      const container = canvas["__konvaLayer__"].getStage().container();
      container.tabIndex = -1;
      this._registerKeyDown(canvas, container, gestures);
      this._registerKeyUp(canvas, container, gestures);
    }
    _registerKeyDown(canvas, container, gestures) {
      container.addEventListener("keydown", (e) => {
        for (const keyCode in gestures) {
          if (e.keyCode == keyCode) {
            gestures[keyCode](canvas.puzzle);
          }
        }
      });
    }
    _registerKeyUp(canvas, container, gestures) {
      container.addEventListener("keyup", (e) => {
        for (const keyCode in gestures) {
          if (e.keyCode == keyCode) {
            canvas.puzzle.tryDisconnectionWhileDragging();
          }
        }
      });
    }
  };

  // src/between.ts
  function between(value, min2, max2) {
    return min2 <= value && value <= max2;
  }

  // src/anchor.ts
  var Anchor = class _Anchor {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    equal(other) {
      return this.isAt(other.x, other.y);
    }
    isAt(x, y) {
      return equal(this.x, this.y, x, y);
    }
    translated(dx, dy) {
      return this.copy().translate(dx, dy);
    }
    translate(dx, dy) {
      this.x += dx;
      this.y += dy;
      return this;
    }
    closeTo(other, tolerance) {
      return between(this.x, other.x - tolerance, other.x + tolerance) && between(this.y, other.y - tolerance, other.y + tolerance);
    }
    copy() {
      return new _Anchor(this.x, this.y);
    }
    diff(other) {
      return diff(this.x, this.y, other.x, other.y);
    }
    asPair() {
      return [this.x, this.y];
    }
    asVector() {
      return vector(this.x, this.y);
    }
    export() {
      return this.asVector();
    }
    static atRandom(maxX, maxY) {
      return new _Anchor(Math.random() * maxX, Math.random() * maxY);
    }
    static import(v) {
      return anchor(v.x, v.y);
    }
  };
  function anchor(x, y) {
    return new Anchor(x, y);
  }

  // src/size.ts
  function radius(value) {
    const v = cast(value);
    return {
      radius: v,
      diameter: multiply(v, 2)
    };
  }
  function diameter(value) {
    const v = cast(value);
    return {
      radius: multiply(v, 0.5),
      diameter: v
    };
  }

  // src/insert.ts
  var Tab = {
    isSlot: () => false,
    isTab: () => true,
    isNone: () => false,
    match: (other) => other.isSlot(),
    toString: () => "Tab",
    complement: () => Slot,
    serialize: () => "T"
  };
  var Slot = {
    isSlot: () => true,
    isTab: () => false,
    isNone: () => false,
    match: (other) => other.isTab(),
    toString: () => "Slot",
    complement: () => Tab,
    serialize: () => "S"
  };
  var None = {
    isSlot: () => false,
    isTab: () => false,
    isNone: () => true,
    match: (_other) => false,
    toString: () => "None",
    complement: () => None,
    serialize: () => "-"
  };

  // src/axis.ts
  var Vertical = {
    atVector(vector2) {
      return vector2.y;
    },
    atDimension(image) {
      return image.height;
    }
  };
  var Horizontal = {
    atVector(vector2) {
      return vector2.x;
    },
    atDimension(image) {
      return image.width;
    }
  };

  // src/connector.ts
  var connector_exports = {};
  __export(connector_exports, {
    Connector: () => Connector,
    noConnectionRequirements: () => noConnectionRequirements
  });

  // src/prelude.ts
  function pivot(one, other, back = false) {
    return back ? [one, other] : [other, one];
  }
  function orthogonalMap(values, mapper, replacement = null) {
    return values.map((it) => {
      const value = it || replacement;
      return value ? mapper(value) : value;
    });
  }
  function orthogonalTransform(values, mapper, replacement = null) {
    const [right, down, left, up] = orthogonalMap(values, mapper, replacement);
    return { right, down, left, up };
  }
  function itself(arg) {
    return arg;
  }

  // src/connector.ts
  function noConnectionRequirements(_one, _other) {
    return true;
  }
  var Connector = class _Connector {
    constructor(axis, forward, backward) {
      this.axis = axis;
      this.accessor = {
        forward,
        backward,
        forwardAnchor: `${forward}Anchor`,
        backwardAnchor: `${backward}Anchor`,
        forwardConnection: `${forward}Connection`,
        backwardConnection: `${backward}Connection`
      };
      this.requirement = noConnectionRequirements;
    }
    getInsert(piece, key) {
      return piece[key];
    }
    getAnchor(piece, key) {
      return piece[key];
    }
    getConnection(piece, key) {
      return piece[key];
    }
    setConnection(piece, key, value) {
      piece[key] = value;
    }
    attract(one, other, back = false) {
      const [iron, magnet] = pivot(one, other, back);
      let dx, dy;
      if (magnet.centralAnchor[this.axis] > iron.centralAnchor[this.axis]) {
        [dx, dy] = this.getAnchor(magnet, this.accessor.backwardAnchor).diff(this.getAnchor(iron, this.accessor.forwardAnchor));
      } else {
        [dx, dy] = this.getAnchor(magnet, this.accessor.forwardAnchor).diff(this.getAnchor(iron, this.accessor.backwardAnchor));
      }
      iron.push(dx, dy);
    }
    openMovement(one, delta) {
      return delta > 0 && !this.getConnection(one, this.accessor.forwardConnection) || delta < 0 && !this.getConnection(one, this.accessor.backwardConnection) || delta === 0;
    }
    canConnectWith(one, other, proximity) {
      return this.closeTo(one, other, proximity) && this.match(one, other) && this.requirement(one, other);
    }
    closeTo(one, other, proximity) {
      return this.getAnchor(one, this.accessor.forwardAnchor).closeTo(this.getAnchor(other, this.accessor.backwardAnchor), proximity);
    }
    match(one, other) {
      return this.getInsert(one, this.accessor.forward).match(this.getInsert(other, this.accessor.backward));
    }
    connectWith(one, other, proximity, back) {
      if (!this.canConnectWith(one, other, proximity)) {
        throw new Error(`can not connect ${this.accessor.forward}!`);
      }
      if (this.getConnection(one, this.accessor.forwardConnection) !== other) {
        this.attract(other, one, back);
        this.setConnection(one, this.accessor.forwardConnection, other);
        this.setConnection(other, this.accessor.backwardConnection, one);
        one.fireConnect(other);
      }
    }
    attachRequirement(requirement) {
      this.requirement = requirement;
    }
    static horizontal() {
      return new _Connector("x", "right", "left");
    }
    static vertical() {
      return new _Connector("y", "down", "up");
    }
  };

  // src/structure.ts
  var structure_exports = {};
  __export(structure_exports, {
    asStructure: () => asStructure,
    deserialize: () => deserialize,
    serialize: () => serialize
  });
  function parseInsert(insert) {
    return insert === "S" ? Slot : insert === "T" ? Tab : None;
  }
  function serialize(structure) {
    return orthogonalMap(
      [structure.right, structure.down, structure.left, structure.up],
      (it) => it.serialize(),
      None
    ).join("");
  }
  function deserialize(str) {
    if (str.length !== 4) {
      throw new Error("structure string must be 4-chars long");
    }
    return {
      right: parseInsert(str[0]),
      down: parseInsert(str[1]),
      left: parseInsert(str[2]),
      up: parseInsert(str[3])
    };
  }
  function asStructure(structureLike) {
    if (typeof structureLike === "string") {
      return deserialize(structureLike);
    }
    return structureLike;
  }

  // src/piece.ts
  var Piece = class _Piece {
    constructor({ up = None, down = None, left = None, right = None } = {}, config = {}) {
      this.upConnection = null;
      this.downConnection = null;
      this.leftConnection = null;
      this.rightConnection = null;
      this._horizontalConnector = null;
      this._verticalConnector = null;
      this.translateListeners = [];
      this.connectListeners = [];
      this.disconnectListeners = [];
      this.up = up;
      this.down = down;
      this.left = left;
      this.right = right;
      this.metadata = {};
      this.centralAnchor = null;
      this._size = null;
      this.configure(config);
    }
    configure(config) {
      if (config.centralAnchor) {
        this.centerAround(Anchor.import(config.centralAnchor));
      }
      if (config.metadata) {
        this.annotate(config.metadata);
      }
      if (config.size) {
        this.resize(config.size);
      }
    }
    annotate(metadata) {
      Object.assign(this.metadata, metadata);
    }
    reannotate(metadata) {
      this.metadata = metadata;
    }
    belongTo(puzzle) {
      this.puzzle = puzzle;
    }
    get presentConnections() {
      return this.connections.filter(itself);
    }
    get connections() {
      return [
        this.rightConnection,
        this.downConnection,
        this.leftConnection,
        this.upConnection
      ];
    }
    get inserts() {
      return [this.right, this.down, this.left, this.up];
    }
    onTranslate(f) {
      this.translateListeners.push(f);
    }
    onConnect(f) {
      this.connectListeners.push(f);
    }
    onDisconnect(f) {
      this.disconnectListeners.push(f);
    }
    fireTranslate(dx, dy) {
      this.translateListeners.forEach((it) => it(this, dx, dy));
    }
    fireConnect(other) {
      this.connectListeners.forEach((it) => it(this, other));
    }
    fireDisconnect(others) {
      others.forEach((other) => {
        this.disconnectListeners.forEach((it) => it(this, other));
      });
    }
    connectVerticallyWith(other, back = false) {
      this.verticalConnector.connectWith(this, other, this.proximity, back);
    }
    attractVertically(other, back = false) {
      this.verticalConnector.attract(this, other, back);
    }
    connectHorizontallyWith(other, back = false) {
      this.horizontalConnector.connectWith(this, other, this.proximity, back);
    }
    attractHorizontally(other, back = false) {
      this.horizontalConnector.attract(this, other, back);
    }
    tryConnectWith(other, back = false) {
      this.tryConnectHorizontallyWith(other, back);
      this.tryConnectVerticallyWith(other, back);
    }
    tryConnectHorizontallyWith(other, back = false) {
      if (this.canConnectHorizontallyWith(other)) {
        this.connectHorizontallyWith(other, back);
      }
    }
    tryConnectVerticallyWith(other, back = false) {
      if (this.canConnectVerticallyWith(other)) {
        this.connectVerticallyWith(other, back);
      }
    }
    disconnect() {
      if (!this.connected) return;
      const connections = this.presentConnections;
      if (this.upConnection) {
        this.upConnection.downConnection = null;
        this.upConnection = null;
      }
      if (this.downConnection) {
        this.downConnection.upConnection = null;
        this.downConnection = null;
      }
      if (this.leftConnection) {
        this.leftConnection.rightConnection = null;
        this.leftConnection = null;
      }
      if (this.rightConnection) {
        this.rightConnection.leftConnection = null;
        this.rightConnection = null;
      }
      this.fireDisconnect(connections);
    }
    centerAround(a) {
      if (this.centralAnchor) {
        throw new Error("this pieces has already being centered. Use recenterAround instead");
      }
      this.centralAnchor = a;
    }
    locateAt(x, y) {
      this.centerAround(anchor(x, y));
    }
    isAt(x, y) {
      return this.centralAnchor.isAt(x, y);
    }
    recenterAround(a, quiet = false) {
      const [dx, dy] = a.diff(this.centralAnchor);
      this.translate(dx, dy, quiet);
    }
    relocateTo(x, y, quiet = false) {
      this.recenterAround(anchor(x, y), quiet);
    }
    translate(dx, dy, quiet = false) {
      if (!isNull(dx, dy)) {
        this.centralAnchor.translate(dx, dy);
        if (!quiet) {
          this.fireTranslate(dx, dy);
        }
      }
    }
    push(dx, dy, quiet = false, pushedPieces = [this]) {
      this.translate(dx, dy, quiet);
      const stationaries = this.presentConnections.filter((it) => pushedPieces.indexOf(it) === -1);
      pushedPieces.push(...stationaries);
      stationaries.forEach((it) => it.push(dx, dy, false, pushedPieces));
    }
    drag(dx, dy, quiet = false) {
      if (isNull(dx, dy)) return;
      if (this.dragShouldDisconnect(dx, dy)) {
        this.disconnect();
        this.translate(dx, dy, quiet);
      } else {
        this.push(dx, dy, quiet);
      }
    }
    dragShouldDisconnect(dx, dy) {
      return this.puzzle.dragShouldDisconnect(this, dx, dy);
    }
    drop() {
      this.puzzle.autoconnectWith(this);
    }
    dragAndDrop(dx, dy) {
      this.drag(dx, dy);
      this.drop();
    }
    canConnectHorizontallyWith(other) {
      return this.horizontalConnector.canConnectWith(this, other, this.proximity);
    }
    canConnectVerticallyWith(other) {
      return this.verticalConnector.canConnectWith(this, other, this.proximity);
    }
    verticallyCloseTo(other) {
      return this.verticalConnector.closeTo(this, other, this.proximity);
    }
    horizontallyCloseTo(other) {
      return this.horizontalConnector.closeTo(this, other, this.proximity);
    }
    verticallyMatch(other) {
      return this.verticalConnector.match(this, other);
    }
    horizontallyMatch(other) {
      return this.horizontalConnector.match(this, other);
    }
    get connected() {
      return !!(this.upConnection || this.downConnection || this.leftConnection || this.rightConnection);
    }
    get downAnchor() {
      return this.centralAnchor.translated(0, this.radius.y);
    }
    get rightAnchor() {
      return this.centralAnchor.translated(this.radius.x, 0);
    }
    get upAnchor() {
      return this.centralAnchor.translated(0, -this.radius.y);
    }
    get leftAnchor() {
      return this.centralAnchor.translated(-this.radius.x, 0);
    }
    resize(size) {
      this._size = size;
    }
    get radius() {
      return this.size.radius;
    }
    get diameter() {
      return this.size.diameter;
    }
    get size() {
      return this._size || this.puzzle.pieceSize;
    }
    get proximity() {
      return this.puzzle.proximity;
    }
    get id() {
      return this.metadata.id;
    }
    get horizontalConnector() {
      return this.getConnector("horizontal");
    }
    get verticalConnector() {
      return this.getConnector("vertical");
    }
    getConnector(kind) {
      const _connector = `_${kind}Connector`;
      if (this.puzzle && !this[_connector]) {
        return kind === "horizontal" ? this.puzzle.horizontalConnector : this.puzzle.verticalConnector;
      }
      if (!this[_connector]) {
        this[_connector] = Connector[kind]();
      }
      return this[_connector];
    }
    export({ compact = false } = {}) {
      const base = {
        centralAnchor: this.centralAnchor ? this.centralAnchor.export() : null,
        structure: serialize(this),
        metadata: this.metadata
      };
      if (this._size) {
        base.size = { radius: this._size.radius };
      }
      return compact ? base : Object.assign(base, {
        connections: orthogonalTransform(this.connections, (it) => ({ id: it.id }))
      });
    }
    static import(dump) {
      return new _Piece(
        deserialize(dump.structure),
        { centralAnchor: dump.centralAnchor ?? void 0, metadata: dump.metadata, size: dump.size }
      );
    }
  };

  // src/validator.ts
  var AbstractValidator = class {
    constructor() {
      this.validListeners = [];
      this._valid = void 0;
    }
    validate(puzzle) {
      const wasValid = this._valid;
      this.updateValidity(puzzle);
      if (this._valid && !wasValid) {
        this.fireValid(puzzle);
      }
    }
    updateValidity(puzzle) {
      this._valid = this.isValid(puzzle);
    }
    fireValid(puzzle) {
      this.validListeners.forEach((it) => it(puzzle));
    }
    onValid(f) {
      this.validListeners.push(f);
    }
    get valid() {
      return this._valid;
    }
    get isNull() {
      return false;
    }
  };
  var PieceValidator = class extends AbstractValidator {
    constructor(f) {
      super();
      this.condition = f;
    }
    isValid(puzzle) {
      return puzzle.pieces.every((it) => this.condition(it));
    }
  };
  var _PuzzleValidator = class _PuzzleValidator extends AbstractValidator {
    constructor(f) {
      super();
      this.condition = f;
    }
    isValid(puzzle) {
      return this.condition(puzzle);
    }
    static equalDiffs([dx0, dy0], [dx, dy]) {
      return equal(dx0, dy0, dx, dy, _PuzzleValidator.DIFF_DELTA);
    }
    static relativeRefs(expected) {
      return (puzzle) => {
        function d(x, y, index) {
          return diff(x, y, ...expected[index]);
        }
        const refs = puzzle.refs;
        const [x0, y0] = refs[0];
        const diff0 = d(x0, y0, 0);
        return refs.every(([x, y], index) => _PuzzleValidator.equalDiffs(diff0, d(x, y, index)));
      };
    }
  };
  _PuzzleValidator.DIFF_DELTA = 0.01;
  _PuzzleValidator.connected = (puzzle) => puzzle.connected;
  var PuzzleValidator = _PuzzleValidator;
  var NullValidator = class extends AbstractValidator {
    isValid(_puzzle) {
      return false;
    }
    get isNull() {
      return true;
    }
  };

  // src/shuffler.ts
  var shuffler_exports = {};
  __export(shuffler_exports, {
    columns: () => columns,
    grid: () => grid,
    line: () => line,
    noise: () => noise,
    noop: () => noop,
    padder: () => padder,
    random: () => random
  });
  function sampleIndex(list) {
    return Math.round(Math.random() * (list.length - 1));
  }
  function random(maxX, maxY) {
    return (pieces) => pieces.map((_it) => Anchor.atRandom(maxX, maxY));
  }
  var grid = (pieces) => {
    const destinations = pieces.map((it) => it.centralAnchor.asVector());
    for (let i = 0; i < destinations.length; i++) {
      const j = sampleIndex(destinations);
      const temp = destinations[j];
      destinations[j] = destinations[i];
      destinations[i] = temp;
    }
    return destinations;
  };
  var columns = (pieces) => {
    const destinations = pieces.map((it) => it.centralAnchor.asVector());
    const columnsMap = /* @__PURE__ */ new Map();
    for (const destination of destinations) {
      if (!columnsMap.get(destination.x)) {
        columnsMap.set(destination.x, destinations.filter((it) => it.x === destination.x));
      }
      const column = columnsMap.get(destination.x);
      const j = sampleIndex(column);
      const temp = column[j].y;
      column[j].y = destination.y;
      destination.y = temp;
    }
    return destinations;
  };
  var line = (pieces) => {
    const destinations = pieces.map((it) => it.centralAnchor.asVector());
    const cols = new Set(destinations.map((it) => it.x));
    const maxX = Math.max(...cols);
    const minX = Math.min(...cols);
    const width = (maxX - minX) / (cols.size - 1);
    const pivotX = minX + width / 2;
    const lineLength = destinations.length * width;
    const linePivot = destinations.filter((it) => it.x < pivotX).length * width;
    const init = [];
    const tail = [];
    for (let i = 0; i < linePivot; i += width) {
      init.push(i);
    }
    for (let i = init[init.length - 1] + width; i < lineLength; i += width) {
      tail.push(i);
    }
    for (const destination of destinations) {
      const source = destination.x < pivotX ? init : tail;
      const index = sampleIndex(source);
      destination.y = 0;
      destination.x = source[index];
      source.splice(index, 1);
    }
    return destinations;
  };
  function padder(padding, width, height) {
    return (pieces) => {
      const destinations = pieces.map((it) => it.centralAnchor.asVector());
      let dx = 0;
      let dy = 0;
      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const destination = destinations[i + width * j];
          destination.x += dx;
          destination.y += dy;
          dx += padding;
        }
        dx = 0;
        dy += padding;
      }
      return destinations;
    };
  }
  function noise(maxDistance) {
    return (pieces) => {
      return pieces.map((it) => Anchor.atRandom(2 * maxDistance.x, 2 * maxDistance.y).translate(-maxDistance.x, -maxDistance.y).translate(it.centralAnchor.x, it.centralAnchor.y).asVector());
    };
  }
  var noop = (pieces) => pieces.map((it) => it.centralAnchor);

  // src/drag-mode.ts
  var drag_mode_exports = {};
  __export(drag_mode_exports, {
    ForceConnection: () => ForceConnection,
    ForceDisconnection: () => ForceDisconnection,
    TryDisconnection: () => TryDisconnection
  });
  var TryDisconnection = {
    dragShouldDisconnect(piece, dx, dy) {
      return piece.horizontalConnector.openMovement(piece, dx) && piece.verticalConnector.openMovement(piece, dy);
    }
  };
  var ForceDisconnection = {
    dragShouldDisconnect(_piece, _dx, _dy) {
      return true;
    }
  };
  var ForceConnection = {
    dragShouldDisconnect(_piece, _dx, _dy) {
      return false;
    }
  };

  // src/puzzle.ts
  var Puzzle = class _Puzzle {
    constructor({ pieceRadius = 2, proximity = 1 } = {}) {
      this.pieceSize = radius(pieceRadius);
      this.proximity = proximity;
      this.pieces = [];
      this.validator = new NullValidator();
      this.dragMode = TryDisconnection;
      this.horizontalConnector = Connector.horizontal();
      this.verticalConnector = Connector.vertical();
    }
    newPiece(structure = {}, config = {}) {
      const piece = new Piece(structure, config);
      this.addPiece(piece);
      return piece;
    }
    addPiece(piece) {
      this.pieces.push(piece);
      piece.belongTo(this);
    }
    addPieces(pieces) {
      pieces.forEach((it) => this.addPiece(it));
    }
    annotate(metadata) {
      this.pieces.forEach((piece, index) => piece.annotate(metadata[index]));
    }
    relocateTo(points) {
      this.pieces.forEach((piece, index) => piece.relocateTo(...points[index]));
    }
    autoconnect() {
      this.pieces.forEach((it) => this.autoconnectWith(it));
    }
    disconnect() {
      this.pieces.forEach((it) => it.disconnect());
    }
    autoconnectWith(piece) {
      this.pieces.filter((it) => it !== piece).forEach((other) => {
        piece.tryConnectWith(other);
        other.tryConnectWith(piece, true);
      });
    }
    shuffle(maxX, maxY) {
      this.shuffleWith(random(maxX, maxY));
    }
    shuffleWith(shuffler) {
      this.disconnect();
      shuffler(this.pieces).forEach(({ x, y }, index) => {
        this.pieces[index].relocateTo(x, y);
      });
      this.autoconnect();
    }
    translate(dx, dy) {
      this.pieces.forEach((it) => it.translate(dx, dy));
    }
    reframe(min2, max2) {
      let dx;
      const leftOffstage = min2.x - Math.min(...this.pieces.map((it) => it.leftAnchor.x));
      if (leftOffstage > 0) {
        dx = leftOffstage;
      } else {
        const rightOffstage = max2.x - Math.max(...this.pieces.map((it) => it.rightAnchor.x));
        dx = rightOffstage < 0 ? rightOffstage : 0;
      }
      let dy;
      const upOffstage = min2.y - Math.min(...this.pieces.map((it) => it.upAnchor.y));
      if (upOffstage > 0) {
        dy = upOffstage;
      } else {
        const downOffstage = max2.y - Math.max(...this.pieces.map((it) => it.downAnchor.y));
        dy = downOffstage < 0 ? downOffstage : 0;
      }
      this.translate(dx, dy);
    }
    onTranslate(f) {
      this.pieces.forEach((it) => it.onTranslate(f));
    }
    onConnect(f) {
      this.pieces.forEach((it) => it.onConnect(f));
    }
    onDisconnect(f) {
      this.pieces.forEach((it) => it.onDisconnect(f));
    }
    onValid(f) {
      this.validator.onValid(f);
    }
    get points() {
      return this.pieces.map((it) => it.centralAnchor.asPair());
    }
    get refs() {
      return this.points.map(([x, y], index) => {
        const d = this.pieces[index].diameter;
        return [x / d.x, y / d.y];
      });
    }
    get metadata() {
      return this.pieces.map((it) => it.metadata);
    }
    get head() {
      return this.pieces[0];
    }
    get headAnchor() {
      return this.head.centralAnchor;
    }
    get verticalRequirement() {
      return this.verticalConnector.requirement;
    }
    get horizontalRequirement() {
      return this.horizontalConnector.requirement;
    }
    attachHorizontalConnectionRequirement(requirement) {
      this.horizontalConnector.attachRequirement(requirement);
    }
    attachVerticalConnectionRequirement(requirement) {
      this.verticalConnector.attachRequirement(requirement);
    }
    attachConnectionRequirement(requirement) {
      this.attachHorizontalConnectionRequirement(requirement);
      this.attachVerticalConnectionRequirement(requirement);
    }
    clearConnectionRequirements() {
      this.attachConnectionRequirement(noConnectionRequirements);
    }
    attachValidator(validator) {
      this.validator = validator;
    }
    isValid() {
      return this.validator.isValid(this);
    }
    get valid() {
      return this.validator.valid;
    }
    validate() {
      this.validator.validate(this);
    }
    updateValidity() {
      this.validator.validate(this);
    }
    get connected() {
      return this.pieces.every((it) => it.connected);
    }
    get pieceDiameter() {
      return this.pieceSize.diameter;
    }
    get pieceRadius() {
      return this.pieceSize.radius;
    }
    forceConnectionWhileDragging() {
      this.dragMode = ForceConnection;
    }
    forceDisconnectionWhileDragging() {
      this.dragMode = ForceDisconnection;
    }
    tryDisconnectionWhileDragging() {
      this.dragMode = TryDisconnection;
    }
    dragShouldDisconnect(piece, dx, dy) {
      return this.dragMode.dragShouldDisconnect(piece, dx, dy);
    }
    export(options = {}) {
      return {
        pieceRadius: this.pieceRadius,
        proximity: this.proximity,
        pieces: this.pieces.map((it) => it.export(options))
      };
    }
    static import(dump) {
      const puzzle = new _Puzzle({ pieceRadius: dump.pieceRadius, proximity: dump.proximity });
      puzzle.addPieces(dump.pieces.map((it) => Piece.import(it)));
      puzzle.autoconnect();
      return puzzle;
    }
  };

  // src/sequence.ts
  var sequence_exports = {};
  __export(sequence_exports, {
    InsertSequence: () => InsertSequence,
    fixed: () => fixed,
    flipflop: () => flipflop,
    random: () => random2,
    twoAndTwo: () => twoAndTwo
  });
  function fixed(_n) {
    return Tab;
  }
  function flipflop(n) {
    return n % 2 === 0 ? Tab : Slot;
  }
  function twoAndTwo(n) {
    return n % 4 < 2 ? Tab : Slot;
  }
  function random2(_) {
    return Math.random() < 0.5 ? Tab : Slot;
  }
  var InsertSequence = class {
    constructor(generator) {
      this.generator = generator;
      this.n = 0;
      this._current = None;
    }
    previousComplement() {
      return this._previous.complement();
    }
    current(max2) {
      if (this.n === max2) {
        return None;
      }
      return this._current;
    }
    next() {
      this._previous = this._current;
      this._current = this.generator(this.n++);
      return this._current;
    }
  };

  // src/metadata.ts
  var metadata_exports = {};
  __export(metadata_exports, {
    copy: () => copy2
  });
  function copy2(metadata) {
    return JSON.parse(JSON.stringify(metadata));
  }

  // src/manufacturer.ts
  var Manufacturer = class {
    constructor() {
      this.insertsGenerator = fixed;
      this.metadata = [];
      this.headAnchor = null;
    }
    withMetadata(metadata) {
      this.metadata = metadata;
    }
    withInsertsGenerator(generator) {
      this.insertsGenerator = generator || this.insertsGenerator;
    }
    withHeadAt(a) {
      this.headAnchor = a;
    }
    withStructure(structure) {
      this.structure = structure;
    }
    withDimensions(width, height) {
      this.width = width;
      this.height = height;
    }
    build() {
      const puzzle = new Puzzle(this.structure);
      const positioner = new Positioner(puzzle, this.headAnchor);
      let verticalSequence = this._newSequence();
      let horizontalSequence;
      for (let y = 0; y < this.height; y++) {
        horizontalSequence = this._newSequence();
        verticalSequence.next();
        for (let x = 0; x < this.width; x++) {
          horizontalSequence.next();
          const piece = this._buildPiece(puzzle, horizontalSequence, verticalSequence);
          piece.centerAround(positioner.naturalAnchor(x, y));
        }
      }
      this._annotateAll(puzzle.pieces);
      return puzzle;
    }
    _annotateAll(pieces) {
      pieces.forEach((piece, index) => this._annotate(piece, index));
    }
    _annotate(piece, index) {
      const baseMetadata = this.metadata[index];
      const metadata = baseMetadata ? copy2(baseMetadata) : {};
      metadata.id = metadata.id || String(index + 1);
      piece.annotate(metadata);
    }
    _newSequence() {
      return new InsertSequence(this.insertsGenerator);
    }
    _buildPiece(puzzle, horizontalSequence, verticalSequence) {
      return puzzle.newPiece({
        left: horizontalSequence.previousComplement(),
        up: verticalSequence.previousComplement(),
        right: horizontalSequence.current(this.width),
        down: verticalSequence.current(this.height)
      });
    }
  };
  var Positioner = class {
    constructor(puzzle, headAnchor) {
      this.puzzle = puzzle;
      if (headAnchor) {
        this.offset = headAnchor.asVector();
      } else {
        this.offset = this.pieceDiameter;
      }
    }
    get pieceDiameter() {
      return this.puzzle.pieceDiameter;
    }
    naturalAnchor(x, y) {
      return anchor(
        x * this.pieceDiameter.x + this.offset.x,
        y * this.pieceDiameter.y + this.offset.y
      );
    }
  };

  // src/image-metadata.ts
  function asImageMetadata(imageLike) {
    if (!imageLike) return null;
    if (typeof HTMLImageElement !== "undefined" && imageLike instanceof HTMLImageElement) {
      return { content: imageLike, offset: vector(1, 1), scale: 1 };
    }
    if (typeof HTMLCanvasElement !== "undefined" && imageLike instanceof HTMLCanvasElement) {
      return { content: imageLike, offset: vector(1, 1), scale: 1 };
    }
    if (imageLike.content) {
      return imageLike;
    }
    return null;
  }

  // src/spatial-metadata.ts
  var spatial_metadata_exports = {};
  __export(spatial_metadata_exports, {
    absolutePosition: () => absolutePosition,
    initialize: () => initialize,
    relativePosition: () => relativePosition,
    solved: () => solved
  });
  function diffToTarget(piece) {
    return diff2(piece.metadata.targetPosition, piece.centralAnchor.asVector());
  }
  var solved = (puzzle) => relativePosition(puzzle) && PuzzleValidator.connected(puzzle);
  var relativePosition = (puzzle) => {
    const diff0 = diffToTarget(puzzle.head);
    return puzzle.pieces.every((piece) => PuzzleValidator.equalDiffs(diff0, diffToTarget(piece)));
  };
  var absolutePosition = (piece) => equal2(piece.centralAnchor.asVector(), piece.metadata.targetPosition);
  function initialize(metadata, target, current) {
    metadata.targetPosition = metadata.targetPosition || target;
    metadata.currentPosition = metadata.currentPosition || current || copy(metadata.targetPosition);
  }

  // src/canvas.ts
  var Canvas = class {
    constructor(id, {
      width,
      height,
      pieceSize = 50,
      proximity = 10,
      borderFill = 0,
      strokeWidth = 3,
      strokeColor = "black",
      lineSoftness = 0,
      preventOffstageDrag = false,
      image = null,
      fixed: fixed2 = false,
      painter = null,
      puzzleDiameter = null,
      maxPiecesCount = null,
      outline = null
    }) {
      this._puzzle = null;
      this.figures = {};
      this.templates = {};
      this._figurePadding = null;
      this._drawn = false;
      this.autoconnected = false;
      this.width = width;
      this.height = height;
      this.pieceSize = diameter(pieceSize);
      this.borderFill = cast(borderFill);
      this.imageMetadata = asImageMetadata(image);
      this.strokeWidth = strokeWidth;
      this.strokeColor = strokeColor;
      this.lineSoftness = lineSoftness;
      this.preventOffstageDrag = preventOffstageDrag;
      this.proximity = proximity;
      this.fixed = fixed2;
      this._painter = painter || new (globalThis["headbreaker"]?.["painters"]?.["Konva"] ?? class {
        initialize() {
        }
      })();
      this._painter.initialize(this, id);
      this._maxPiecesCount = maxPiecesCount ? cast(maxPiecesCount) : null;
      this._puzzleDiameter = puzzleDiameter ? cast(puzzleDiameter) : null;
      this._imageAdjuster = itself;
      this._outline = outline || Classic;
    }
    sketchPiece({ structure, size = void 0, metadata }) {
      initialize(metadata, zero());
      this.renderPiece(this._newPiece(structure, size ?? null, metadata));
    }
    renderPiece(piece) {
      const figure = { label: null, group: null, shape: null };
      this.figures[piece.metadata.id] = figure;
      this._painter.sketch(this, piece, figure, this._outline);
      const label = piece.metadata.label;
      if (label && label.text) {
        label.fontSize = label.fontSize || piece.diameter.y * 0.55;
        label.y = label.y || (piece.diameter.y - label.fontSize) / 2;
        this._painter.label(this, piece, figure);
      }
      this._bindGroupToPiece(figure.group, piece);
      this._bindPieceToGroup(piece, figure.group);
    }
    renderPieces(pieces) {
      pieces.forEach((it) => {
        this._annotatePiecePosition(it);
        this.renderPiece(it);
      });
    }
    renderPuzzle(puzzle) {
      this.pieceSize = puzzle.pieceSize;
      this.proximity = puzzle.proximity * 2;
      this._puzzle = puzzle;
      this.renderPieces(puzzle.pieces);
    }
    autogenerate({
      horizontalPiecesCount = 5,
      verticalPiecesCount = 5,
      insertsGenerator = twoAndTwo,
      metadata = []
    } = {}) {
      const manufacturer = new Manufacturer();
      manufacturer.withDimensions(horizontalPiecesCount, verticalPiecesCount);
      manufacturer.withInsertsGenerator(insertsGenerator);
      manufacturer.withMetadata(metadata);
      this.autogenerateWithManufacturer(manufacturer);
    }
    autogenerateWithManufacturer(manufacturer) {
      manufacturer.withStructure(this.settings);
      this._puzzle = manufacturer.build();
      this._maxPiecesCount = vector(manufacturer.width, manufacturer.height);
      this.renderPieces(this.puzzle.pieces);
    }
    defineTemplate(name, template) {
      this.templates[name] = template;
    }
    sketchPieceUsingTemplate(id, templateName) {
      const options = this.templates[templateName];
      if (!options) {
        throw new Error(`Unknown template ${id}`);
      }
      const metadata = copy2(options.metadata);
      metadata.id = id;
      this.sketchPiece({ structure: options.structure, metadata });
    }
    shuffle(farness = 1) {
      const offset = this.pieceRadius;
      this.puzzle.shuffle(farness * (this.width - offset.x), farness * (this.height - offset.y));
      this.puzzle.translate(offset.x, offset.y);
      this.autoconnected = true;
    }
    shuffleColumns(farness = 1) {
      this.shuffleWith(farness, columns);
    }
    shuffleGrid(farness = 1) {
      this.shuffleWith(farness, grid);
    }
    shuffleLine(farness = 1) {
      this.shuffleWith(farness, line);
    }
    shuffleWith(farness, shuffler) {
      this.solve();
      this.puzzle.shuffleWith(padder(this.proximity * 3, this.maxPiecesCount.x, this.maxPiecesCount.y));
      this.puzzle.shuffleWith(shuffler);
      this.puzzle.shuffleWith(noise(cast(this.proximity * farness / 2)));
      this.autoconnected = true;
    }
    solve() {
      this.puzzle.pieces.forEach((it) => {
        const { x, y } = it.metadata.targetPosition;
        it.relocateTo(x, y);
      });
      this.autoconnect();
    }
    autoconnect() {
      this.puzzle.autoconnect();
      this.autoconnected = true;
    }
    registerKeyboardGestures(gestures = {
      16: (puzzle) => puzzle.forceConnectionWhileDragging(),
      17: (puzzle) => puzzle.forceDisconnectionWhileDragging()
    }) {
      this._painter.registerKeyboardGestures(this, gestures);
    }
    draw() {
      if (this._drawn) {
        throw new Error("This canvas has already been drawn. Call redraw instead");
      }
      if (!this.autoconnected) {
        this.autoconnect();
      }
      this.puzzle.updateValidity();
      this.autoconnected = false;
      this.redraw();
      this._drawn = true;
    }
    redraw() {
      this._painter.draw(this);
    }
    refill() {
      this.puzzle.pieces.forEach((piece) => {
        this._painter.fill(this, piece, this.getFigure(piece));
      });
    }
    clear() {
      this._puzzle = null;
      this.figures = {};
      this.templates = {};
      this._figurePadding = null;
      this._drawn = false;
      this._painter.reinitialize(this);
    }
    attachConnectionRequirement(requirement) {
      this.puzzle.attachConnectionRequirement(requirement);
    }
    clearConnectionRequirements() {
      this.puzzle.clearConnectionRequirements();
    }
    attachValidator(validator) {
      this.puzzle.attachValidator(validator);
    }
    attachSolvedValidator() {
      this.puzzle.attachValidator(new PuzzleValidator(solved));
    }
    attachRelativePositionValidator() {
      this.puzzle.attachValidator(new PuzzleValidator(relativePosition));
    }
    attachRelativeRefsValidator(expected) {
      this.puzzle.attachValidator(new PuzzleValidator(PuzzleValidator.relativeRefs(expected)));
    }
    attachAbsolutePositionValidator() {
      this.puzzle.attachValidator(new PieceValidator(absolutePosition));
    }
    onConnect(f) {
      this.puzzle.onConnect((piece, target) => {
        f(piece, this.getFigure(piece), target, this.getFigure(target));
      });
    }
    onDisconnect(f) {
      this.puzzle.onDisconnect((piece, target) => {
        f(piece, this.getFigure(piece), target, this.getFigure(target));
      });
    }
    onTranslate(f) {
      this.puzzle.onTranslate((piece, dx, dy) => {
        f(piece, this.getFigure(piece), dx, dy);
      });
    }
    reframeWithinDimensions() {
      if (!this.fixed) throw new Error("Only fixed canvas can be reframed");
      this.puzzle.reframe(
        this.figurePadding,
        minus(vector(this.width, this.height), this.figurePadding)
      );
    }
    onValid(f) {
      this.puzzle.onValid(f);
    }
    get valid() {
      return this.puzzle.valid;
    }
    getFigure(piece) {
      return this.getFigureById(piece.metadata.id);
    }
    getFigureById(id) {
      return this.figures[id];
    }
    resize(width, height) {
      this.width = width;
      this.height = height;
      this._painter.resize(this, width, height);
    }
    scale(factor) {
      this._painter.scale(this, cast(factor));
    }
    _annotatePiecePosition(piece) {
      const p = piece.centralAnchor.asVector();
      initialize(piece.metadata, p, copy(p));
    }
    _bindGroupToPiece(group, piece) {
      piece.onTranslate((_piece, _dx, _dy) => {
        this._painter.physicalTranslate(this, group, piece);
        this._painter.logicalTranslate(this, piece, group);
      });
    }
    _bindPieceToGroup(piece, group) {
      this._painter.onDrag(this, piece, group, (dx, dy) => {
        if (!isNull(dx, dy)) {
          piece.drag(dx, dy, true);
          this._painter.logicalTranslate(this, piece, group);
          this.redraw();
        }
      });
      this._painter.onDragEnd(this, piece, group, () => {
        piece.drop();
        this.puzzle.validate();
        this.redraw();
      });
    }
    _baseImageMetadataFor(piece) {
      if (this.imageMetadata) {
        const s = piece.metadata.scale || this.imageMetadata.scale || 1;
        const offset = plus(
          piece.metadata.targetPosition || zero(),
          this.imageMetadata.offset || zero()
        );
        return { content: this.imageMetadata.content, offset, scale: s };
      }
      return asImageMetadata(piece.metadata.image);
    }
    imageMetadataFor(piece) {
      const base = this._baseImageMetadataFor(piece);
      if (!base) return null;
      return this._imageAdjuster(base);
    }
    adjustImagesToPuzzle(axis) {
      this._imageAdjuster = (image) => {
        const s = axis.atVector(this.puzzleDiameter) / axis.atDimension(image.content);
        const offset = plus(image.offset, minus(this.borderFill, this.pieceDiameter));
        return { content: image.content, scale: s, offset };
      };
    }
    adjustImagesToPuzzleWidth() {
      this.adjustImagesToPuzzle(Horizontal);
    }
    adjustImagesToPuzzleHeight() {
      this.adjustImagesToPuzzle(Vertical);
    }
    adjustImagesToPiece(axis) {
      this._imageAdjuster = (image) => {
        const s = axis.atVector(this.pieceDiameter) / axis.atDimension(image.content);
        const offset = plus(image.offset, this.borderFill);
        return { content: image.content, scale: s, offset };
      };
    }
    adjustImagesToPieceWidth() {
      this.adjustImagesToPiece(Horizontal);
    }
    adjustImagesToPieceHeight() {
      this.adjustImagesToPiece(Vertical);
    }
    _initializeEmptyPuzzle() {
      this._puzzle = new Puzzle(this.settings);
    }
    _newPiece(structureLike, size, metadata) {
      return this.puzzle.newPiece(
        asStructure(structureLike),
        { centralAnchor: vector(metadata.currentPosition.x, metadata.currentPosition.y), metadata, size: size ?? void 0 }
      );
    }
    get puzzleDiameter() {
      return this._puzzleDiameter || this.estimatedPuzzleDiameter;
    }
    get estimatedPuzzleDiameter() {
      return plus(multiply(this.pieceDiameter, this.maxPiecesCount), this.strokeWidth * 2);
    }
    get maxPiecesCount() {
      if (!this._maxPiecesCount) {
        throw new Error("max pieces count was not specified");
      }
      return this._maxPiecesCount;
    }
    get pieceRadius() {
      return this.pieceSize.radius;
    }
    get pieceDiameter() {
      return this.pieceSize.diameter;
    }
    get figurePadding() {
      if (!this._figurePadding) {
        this._figurePadding = plus(this.strokeWidth, this.borderFill);
      }
      return this._figurePadding;
    }
    get figuresCount() {
      return Object.values(this.figures).length;
    }
    get puzzle() {
      if (!this._puzzle) {
        this._initializeEmptyPuzzle();
      }
      return this._puzzle;
    }
    get settings() {
      return { pieceRadius: this.pieceRadius, proximity: this.proximity };
    }
  };

  // src/index.ts
  var painters = {
    Dummy: DummyPainter,
    Konva: KonvaPainter
  };
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=headbreaker.js.map