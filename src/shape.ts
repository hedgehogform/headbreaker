/**
 * @module shape
 *
 * Deterministic geometry variation for rendered jigsaw piece edges.
 */

export type Side = 'left' | 'up' | 'right' | 'down';

/**
 * A subtle geometry profile shared by both sides of one puzzle seam.
 */
export interface EdgeProfile {
  /** Moves the tab/slot center along the edge, as a fraction of the inset size. */
  offset: number;
  /** Scales the tab/slot width. */
  width: number;
  /** Scales the tab/slot depth. */
  depth: number;
}

/**
 * Per-side rendered shape profiles for a piece.
 */
export type PieceShape = Partial<Record<Side, EdgeProfile>>;

/**
 * Options controlling generated piece shape variation.
 */
export interface ShapeVariationOptions {
  /**
   * Maximum absolute center offset as a fraction of each edge's inset.
   * Defaults to `0.12`.
   */
  offset?: number;
  /**
   * Maximum width delta around `1`. Defaults to `0.1`.
   */
  width?: number;
  /**
   * Maximum depth delta around `1`. Defaults to `0.08`.
   */
  depth?: number;
}

export const defaultShapeVariation: Required<ShapeVariationOptions> = {
  offset: 0.12,
  width: 0.1,
  depth: 0.08,
};

function normalizeOptions(
  options: ShapeVariationOptions = {},
): Required<ShapeVariationOptions> {
  return {
    offset: Math.max(0, options.offset ?? defaultShapeVariation.offset),
    width: Math.max(0, options.width ?? defaultShapeVariation.width),
    depth: Math.max(0, options.depth ?? defaultShapeVariation.depth),
  };
}

function unit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function signed(seed: number): number {
  return unit(seed) * 2 - 1;
}

/**
 * Creates a deterministic edge profile for a grid seam.
 *
 * @param {number} x - Seam x coordinate.
 * @param {number} y - Seam y coordinate.
 * @param {'horizontal' | 'vertical'} axis - Seam orientation.
 * @param {ShapeVariationOptions} [options] - Variation bounds.
 * @returns {EdgeProfile} A deterministic profile for that seam.
 */
export function edgeProfile(
  x: number,
  y: number,
  axis: 'horizontal' | 'vertical',
  options: ShapeVariationOptions = {},
): EdgeProfile {
  const normalized = normalizeOptions(options);
  const base
    = (x + 1) * 73856093
      + (y + 1) * 19349663
      + (axis === 'horizontal' ? 83492791 : 2971215073);
  return {
    offset: normalized.offset === 0 ? 0 : signed(base) * normalized.offset,
    width: normalized.width === 0 ? 1 : 1 + signed(base + 1) * normalized.width,
    depth: normalized.depth === 0 ? 1 : 1 + signed(base + 2) * normalized.depth,
  };
}

export function cloneProfile(profile: EdgeProfile): EdgeProfile {
  return { ...profile };
}
