import type { Insert } from './insert'
import { None, Slot, Tab } from './insert'
import { orthogonalMap } from './prelude'

export interface Structure {
  up?: Insert
  down?: Insert
  left?: Insert
  right?: Insert
}

export type StructureLike = Structure | string

function parseInsert(insert: string): Insert {
  if (insert === 'S')
    return Slot
  if (insert === 'T')
    return Tab
  return None
}

export function serialize(structure: Structure): string {
  return orthogonalMap(
    [structure.right, structure.down, structure.left, structure.up],
    (it: Insert) => it.serialize(),
    None,
  ).join('')
}

export function deserialize(str: string): Structure {
  if (str.length !== 4) {
    throw new Error('structure string must be 4-chars long')
  }
  return {
    right: parseInsert(str[0]),
    down: parseInsert(str[1]),
    left: parseInsert(str[2]),
    up: parseInsert(str[3]),
  }
}

export function asStructure(structureLike: StructureLike): Structure {
  if (typeof structureLike === 'string') {
    return deserialize(structureLike)
  }
  return structureLike
}
