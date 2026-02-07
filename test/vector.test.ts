import { describe, expect, it } from 'vitest'
import * as Vector from '../src/vector'
import { vector } from '../src/vector'

describe('vector', () => {
  it('can equal', () => {
    expect(Vector.equal(vector(1, 1), vector(1, 1))).toBe(true)
    expect(Vector.equal(vector(1, 1), vector(1, 2))).toBe(false)
    expect(Vector.equal(vector(2, 1), vector(1, 1))).toBe(false)
  })

  it('can equal with delta', () => {
    expect(Vector.equal(vector(1, 1), vector(1.5, 1.5), 0.5)).toBe(true)
    expect(Vector.equal(vector(1, 1), vector(2, 2), 0.5)).toBe(false)
  })

  it('can plus', () => {
    expect(Vector.plus(1, 2)).toEqual(vector(3, 3))
    expect(Vector.plus(vector(1, 3), 2)).toEqual(vector(3, 5))
    expect(Vector.plus(2, vector(1, 3))).toEqual(vector(3, 5))
    expect(Vector.plus(vector(1, 1), vector(1, 1))).toEqual(vector(2, 2))
    expect(Vector.plus(vector(1, 1), vector(1, 2))).toEqual(vector(2, 3))
    expect(Vector.plus(vector(2, 1), vector(1, 1))).toEqual(vector(3, 2))
  })

  it('can minus', () => {
    expect(Vector.minus(1, 2)).toEqual(vector(-1, -1))
    expect(Vector.minus(vector(1, 3), 2)).toEqual(vector(-1, 1))
    expect(Vector.minus(2, vector(1, 3))).toEqual(vector(1, -1))
    expect(Vector.minus(vector(1, 1), vector(1, 1))).toEqual(vector(0, 0))
    expect(Vector.minus(vector(1, 1), vector(1, 2))).toEqual(vector(0, -1))
    expect(Vector.minus(vector(2, 1), vector(1, 1))).toEqual(vector(1, 0))
  })

  it('can max', () => {
    expect(Vector.max(1, 2)).toEqual(vector(2, 2))
    expect(Vector.max(vector(1, 3), 2)).toEqual(vector(2, 3))
    expect(Vector.max(2, vector(1, 3))).toEqual(vector(2, 3))
    expect(Vector.max(vector(1, 1), vector(1, 1))).toEqual(vector(1, 1))
    expect(Vector.max(vector(1, 1), vector(1, 2))).toEqual(vector(1, 2))
    expect(Vector.max(vector(2, 1), vector(1, 1))).toEqual(vector(2, 1))
  })

  it('can min', () => {
    expect(Vector.min(1, 2)).toEqual(vector(1, 1))
    expect(Vector.min(vector(1, 3), 2)).toEqual(vector(1, 2))
    expect(Vector.min(2, vector(1, 3))).toEqual(vector(1, 2))
    expect(Vector.min(vector(1, 1), vector(1, 1))).toEqual(vector(1, 1))
    expect(Vector.min(vector(1, 1), vector(1, 2))).toEqual(vector(1, 1))
    expect(Vector.min(vector(2, 1), vector(1, 1))).toEqual(vector(1, 1))
  })

  it('can inner max', () => {
    expect(Vector.inner.max(vector(1, 1))).toBe(1)
    expect(Vector.inner.max(vector(2, 1))).toBe(2)
    expect(Vector.inner.max(vector(3, 5))).toBe(5)
  })

  it('can inner min', () => {
    expect(Vector.inner.min(vector(1, 1))).toBe(1)
    expect(Vector.inner.min(vector(2, 1))).toBe(1)
    expect(Vector.inner.min(vector(3, 5))).toBe(3)
  })

  it('can multiply', () => {
    expect(Vector.multiply(vector(2, 3), vector(4, 5))).toEqual(vector(8, 15))
    expect(Vector.multiply(vector(2, 3), 2)).toEqual(vector(4, 6))
  })

  it('can divide', () => {
    expect(Vector.divide(vector(8, 15), vector(4, 5))).toEqual(vector(2, 3))
    expect(Vector.divide(vector(4, 6), 2)).toEqual(vector(2, 3))
  })

  it('can copy', () => {
    const v = vector(3, 5)
    const c = Vector.copy(v)
    expect(c).toEqual(v)
    expect(c).not.toBe(v)
  })

  it('can update', () => {
    const v = vector(3, 5)
    Vector.update(v, 10, 20)
    expect(v).toEqual(vector(10, 20))
  })

  it('can diff', () => {
    expect(Vector.diff(vector(5, 10), vector(2, 3))).toEqual([3, 7])
  })

  it('can zero', () => {
    expect(Vector.zero()).toEqual(vector(0, 0))
  })

  it('can cast number', () => {
    expect(Vector.cast(5)).toEqual(vector(5, 5))
  })

  it('can cast vector', () => {
    expect(Vector.cast(vector(1, 2))).toEqual(vector(1, 2))
  })

  it('can cast null', () => {
    expect(Vector.cast(null)).toEqual(vector(0, 0))
  })
})
