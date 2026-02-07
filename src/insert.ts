export interface Insert {
  isSlot: () => boolean;
  isTab: () => boolean;
  isNone: () => boolean;
  match: (other: Insert) => boolean;
  toString: () => string;
  complement: () => Insert;
  serialize: () => string;
}

export const Tab: Insert = {
  isSlot: () => false,
  isTab: () => true,
  isNone: () => false,
  match: (other: Insert) => other.isSlot(),
  toString: () => 'Tab',
  complement: () => Slot,
  serialize: () => 'T',
};

export const Slot: Insert = {
  isSlot: () => true,
  isTab: () => false,
  isNone: () => false,
  match: (other: Insert) => other.isTab(),
  toString: () => 'Slot',
  complement: () => Tab,
  serialize: () => 'S',
};

export const None: Insert = {
  isSlot: () => false,
  isTab: () => false,
  isNone: () => true,
  match: (_other: Insert) => false,
  toString: () => 'None',
  complement: () => None,
  serialize: () => '-',
};
