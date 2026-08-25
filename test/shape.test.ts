import { describe, expect, it } from 'vitest';
import { cloneProfile, defaultShapeVariation, edgeProfile } from '../src/shape';

describe('shape', () => {
  describe('defaultShapeVariation', () => {
    it('exposes default variation bounds', () => {
      expect(defaultShapeVariation).toEqual({
        offset: 0.12,
        width: 0.1,
        depth: 0.08,
      });
    });
  });

  describe('edgeProfile', () => {
    it('uses default variation bounds when options are omitted', () => {
      const profile = edgeProfile(1, 2, 'horizontal');

      expect(Math.abs(profile.offset)).toBeLessThanOrEqual(defaultShapeVariation.offset);
      expect(profile.width).toBeGreaterThanOrEqual(1 - defaultShapeVariation.width);
      expect(profile.width).toBeLessThanOrEqual(1 + defaultShapeVariation.width);
      expect(profile.depth).toBeGreaterThanOrEqual(1 - defaultShapeVariation.depth);
      expect(profile.depth).toBeLessThanOrEqual(1 + defaultShapeVariation.depth);
    });

    it('merges partial options with defaults', () => {
      const profile = edgeProfile(2, 3, 'vertical', { width: 0 });

      expect(Math.abs(profile.offset)).toBeLessThanOrEqual(defaultShapeVariation.offset);
      expect(profile.width).toBe(1);
      expect(profile.depth).toBeGreaterThanOrEqual(1 - defaultShapeVariation.depth);
      expect(profile.depth).toBeLessThanOrEqual(1 + defaultShapeVariation.depth);
    });

    it('returns deterministic profiles for the same seam', () => {
      expect(edgeProfile(4, 5, 'horizontal')).toEqual(edgeProfile(4, 5, 'horizontal'));
      expect(edgeProfile(4, 5, 'vertical', { offset: 0.2, width: 0.3, depth: 0.4 }))
        .toEqual(edgeProfile(4, 5, 'vertical', { offset: 0.2, width: 0.3, depth: 0.4 }));
    });

    it('varies profiles by seam and axis', () => {
      const horizontal = edgeProfile(4, 5, 'horizontal');

      expect(edgeProfile(5, 5, 'horizontal')).not.toEqual(horizontal);
      expect(edgeProfile(4, 5, 'vertical')).not.toEqual(horizontal);
    });

    it('returns a neutral profile when all bounds are zero', () => {
      expect(edgeProfile(10, 20, 'horizontal', { offset: 0, width: 0, depth: 0 })).toEqual({
        offset: 0,
        width: 1,
        depth: 1,
      });
    });

    it('clamps negative bounds to zero', () => {
      expect(edgeProfile(10, 20, 'vertical', { offset: -1, width: -1, depth: -1 })).toEqual({
        offset: 0,
        width: 1,
        depth: 1,
      });
    });

    it('keeps generated values inside configured non-negative bounds', () => {
      const options = { offset: 0.25, width: 0.35, depth: 0.45 };
      const profiles = [
        edgeProfile(0, 0, 'horizontal', options),
        edgeProfile(7, 9, 'horizontal', options),
        edgeProfile(7, 9, 'vertical', options),
      ];

      for (const profile of profiles) {
        expect(Math.abs(profile.offset)).toBeLessThanOrEqual(options.offset);
        expect(profile.width).toBeGreaterThanOrEqual(1 - options.width);
        expect(profile.width).toBeLessThanOrEqual(1 + options.width);
        expect(profile.depth).toBeGreaterThanOrEqual(1 - options.depth);
        expect(profile.depth).toBeLessThanOrEqual(1 + options.depth);
      }
    });
  });

  describe('cloneProfile', () => {
    it('returns an equal independent profile', () => {
      const original = edgeProfile(1, 1, 'vertical');
      const cloned = cloneProfile(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      cloned.offset = original.offset + 1;

      expect(original.offset).not.toBe(cloned.offset);
    });
  });
});
