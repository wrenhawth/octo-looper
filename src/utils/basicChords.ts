
export const INITIAL_CHORD_LIST: ChordSymbol[] = ['I', 'I', 'I', 'I']

export const CHORD_SYMBOLS = ['I', 'ii', 'iii', 'IV', 'V', 'vi']
export type ChordSymbol = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi'

export const CHORD_TO_INDEX = {
  I: 0,
  ii: 1,
  iii: 2,
  IV: 3,
  V: 4,
  vi: 5
}
export const CHORD_TO_LABEL = {
  I: 'C major',
  ii: 'D minor',
  iii: 'E minor',
  IV: 'F major',
  V: 'G major',
  vi: 'A minor'
}

export const SEVENTH_CHORD_TO_LABEL = {
  I: 'Cmaj7',
  ii: 'Dmin7',
  iii: 'Emin7',
  IV: 'Fmaj7',
  V: 'G7',
  vi: 'Amin7'
}

export const CHORD_TO_EMOJI = {
  I: "🪸",
  ii: "🐡🐡",
  iii: "🐠\n🐠🐠",
  IV: "🐢🐢\n🐢🐢",
  V: "🐬🐬\n🐬🐬🐬",
  vi: "🪼🪼🪼\n🪼🪼🪼",
};

export const CHORD_TO_EMOJI_SIZE = {
  I: 42,
  ii: 24,
  iii: 24,
  IV: 20,
  V: 18,
  vi: 16,
};
export const CHORD_TO_HUE = {
  I: 300,
  ii: 265,
  iii: 230,
  IV: 195,
  V: 160,
  vi: 125,
};

// export const CHORD_TO_HUE = {
//   I: 300,
//   ii: 257,
//   iii: 214,
//   IV: 171,
//   V: 129,
//   vi: 86,
// };

export const CHORD_TO_MOOD_IMAGE = {
  I: "😊",
  ii: "🫨",
  iii: "🫨",
  IV: "😊",
  V: "😊",
  vi: "🫨",
};

export const MOVE_CHORD_LEFT = {
  V: "I",
  I: "IV",
  vi: "ii",
  iii: "vi",
  ii: "iii",
  IV: "V"
} as const;

export const MOVE_CHORD_RIGHT = {
  I: "V",
  IV: "I",
  ii: "vi",
  vi: "iii",
  V: "IV",
  iii: "ii"
} as const;

export const MOVE_CHORD_MOOD = {
  I: "vi",
  IV: "ii",
  V: "iii",
  vi: "I",
  ii: "IV",
  iii: "V",
} as const;