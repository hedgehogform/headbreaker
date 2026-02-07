import { describe, expect, it } from 'vitest';
import { None, Slot, Tab } from '../src/insert';
import { fixed, flipflop, InsertSequence, twoAndTwo } from '../src/sequence';

describe('insertSequence', () => {
  it('fixed', () => {
    const sequence = new InsertSequence(fixed);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.previousComplement()).toBe(None);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.previousComplement()).toBe(Slot);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.previousComplement()).toBe(Slot);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.previousComplement()).toBe(Slot);
  });

  it('flipflop', () => {
    const sequence = new InsertSequence(flipflop);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.next()).toBe(Slot);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.next()).toBe(Slot);
  });

  it('two-and-two', () => {
    const sequence = new InsertSequence(twoAndTwo);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.next()).toBe(Slot);
    expect(sequence.next()).toBe(Slot);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.next()).toBe(Tab);
    expect(sequence.next()).toBe(Slot);
    expect(sequence.next()).toBe(Slot);
  });

  it('current returns None when at max', () => {
    const sequence = new InsertSequence(fixed);
    sequence.next();
    expect(sequence.current(1)).toBe(None);
  });

  it('current returns current insert when not at max', () => {
    const sequence = new InsertSequence(fixed);
    sequence.next();
    expect(sequence.current(5)).toBe(Tab);
  });
});
