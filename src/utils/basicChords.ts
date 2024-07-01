
export type ChordSymbol = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi'

export const CHORD_TO_INDEX = {
  I: 0,
  ii: 1,
  iii: 2,
  IV: 3,
  V: 4,
  vi: 5
}

export const CHORD_TO_EMOJI = {
    I: "🪸",
    ii: "🐡",
    iii: "🐠",
    IV: "🐢",
    V: "🐬",
    vi: "🪼",
  };
  
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
    ii: "ii",
    IV: "IV"
  } as const;

  export const MOVE_CHORD_RIGHT = {
    I: "V",
    IV: "I",
    ii: "vi",
    vi: "iii",
    V: "V",
    iii: "iii"
  } as const;
  
  export const MOVE_CHORD_MOOD = {
    I: "vi",
    IV: "ii",
    V: "iii",
    vi: "I",
    ii: "IV",
    iii: "V",
  } as const;