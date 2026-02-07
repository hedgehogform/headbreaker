import { describe, it, expect } from 'vitest';
import { Tab, Slot, None } from '../src/insert';

describe('Insert', () => {
  describe('Tab', () => {
    it('isTab returns true', () => expect(Tab.isTab()).toBe(true));
    it('isSlot returns false', () => expect(Tab.isSlot()).toBe(false));
    it('isNone returns false', () => expect(Tab.isNone()).toBe(false));
    it('matches Slot', () => expect(Tab.match(Slot)).toBe(true));
    it('does not match Tab', () => expect(Tab.match(Tab)).toBe(false));
    it('does not match None', () => expect(Tab.match(None)).toBe(false));
    it('complement is Slot', () => expect(Tab.complement()).toBe(Slot));
    it('serializes to T', () => expect(Tab.serialize()).toBe('T'));
    it('toString returns Tab', () => expect(Tab.toString()).toBe('Tab'));
  });

  describe('Slot', () => {
    it('isTab returns false', () => expect(Slot.isTab()).toBe(false));
    it('isSlot returns true', () => expect(Slot.isSlot()).toBe(true));
    it('isNone returns false', () => expect(Slot.isNone()).toBe(false));
    it('matches Tab', () => expect(Slot.match(Tab)).toBe(true));
    it('does not match Slot', () => expect(Slot.match(Slot)).toBe(false));
    it('does not match None', () => expect(Slot.match(None)).toBe(false));
    it('complement is Tab', () => expect(Slot.complement()).toBe(Tab));
    it('serializes to S', () => expect(Slot.serialize()).toBe('S'));
    it('toString returns Slot', () => expect(Slot.toString()).toBe('Slot'));
  });

  describe('None', () => {
    it('isTab returns false', () => expect(None.isTab()).toBe(false));
    it('isSlot returns false', () => expect(None.isSlot()).toBe(false));
    it('isNone returns true', () => expect(None.isNone()).toBe(true));
    it('does not match Tab', () => expect(None.match(Tab)).toBe(false));
    it('does not match Slot', () => expect(None.match(Slot)).toBe(false));
    it('does not match None', () => expect(None.match(None)).toBe(false));
    it('complement is None', () => expect(None.complement()).toBe(None));
    it('serializes to -', () => expect(None.serialize()).toBe('-'));
    it('toString returns None', () => expect(None.toString()).toBe('None'));
  });
});
