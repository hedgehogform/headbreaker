import { describe, expect, it } from 'vitest';
import { None, Slot, Tab } from '../src/insert';
import * as Structure from '../src/structure';

describe('structure', () => {
  describe('serialize', () => {
    it('can serialize structure with up and down Slots', () => {
      expect(Structure.serialize({ up: Slot, down: Slot })).toBe('-S-S');
    });

    it('can serialize structure with up and down Tabs', () => {
      expect(Structure.serialize({ up: Tab, down: Tab })).toBe('-T-T');
    });

    it('can serialize structure with mixed Tabs and Slots', () => {
      expect(Structure.serialize({ up: Tab, down: Slot, left: Slot, right: Tab })).toBe('TSST');
    });

    it('can serialize structure with mixed Tabs, Slots and Nones', () => {
      expect(Structure.serialize({ up: Tab, down: Slot, left: None, right: Tab })).toBe('TS-T');
    });
  });

  describe('deserialize', () => {
    it('can deserialize structure with up and down Slots', () => {
      expect(Structure.deserialize('-S-S')).toEqual({ up: Slot, down: Slot, left: None, right: None });
    });

    it('can deserialize structure with up and down Tabs', () => {
      expect(Structure.deserialize('-T-T')).toEqual({ up: Tab, down: Tab, left: None, right: None });
    });

    it('throws on invalid length', () => {
      expect(() => Structure.deserialize('TST')).toThrow('structure string must be 4-chars long');
    });
  });

  it('can roundtrip', () => {
    expect(Structure.serialize(Structure.deserialize('-TST'))).toBe('-TST');
    expect(Structure.serialize(Structure.deserialize('--ST'))).toBe('--ST');
    expect(Structure.serialize(Structure.deserialize('----'))).toBe('----');
    expect(Structure.serialize(Structure.deserialize('SSSS'))).toBe('SSSS');
  });

  it('asStructure returns object as-is', () => {
    const s = { up: Tab, right: Slot };
    expect(Structure.asStructure(s)).toBe(s);
  });

  it('asStructure deserializes string', () => {
    expect(Structure.asStructure('TSST')).toEqual({ right: Tab, down: Slot, left: Slot, up: Tab });
  });
});
