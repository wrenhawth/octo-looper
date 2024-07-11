import { EnvelopeOptions, FMSynthOptions, OmniOscillatorOptions, OmniOscSourceType } from "tone"
import { RecursivePartial } from "tone/build/esm/core/util/Interface";

export type OsciPreset = {
    type: OmniOscSourceType
    oscillator: Partial<OmniOscillatorOptions>
    envelope: Partial<EnvelopeOptions>
}

export type FmPreset = {
    type: 'fm',
    fmOptions: RecursivePartial<FMSynthOptions>
}

export const ELECTRIC_CELLO: FmPreset = {
    type: 'fm',
    fmOptions: {
        "harmonicity": 3.01,
        "modulationIndex": 14,
        "oscillator": {
            "type": "triangle"
        },
        "envelope": {
            "attack": 0.2,
            "decay": 0.3,
            "sustain": 0.1,
            "release": 1.2
        },
        "modulation": {
            "type": "square"
        },
        "modulationEnvelope": {
            "attack": 0.01,
            "decay": 0.5,
            "sustain": 0.2,
            "release": 0.1
        }
    },
}

export const KALIMBA: FmPreset = {
    type: 'fm',
    fmOptions: {
        "harmonicity": 8,
        "modulationIndex": 2,
        "oscillator": {
            "type": "sine"
        },
        "envelope": {
            "attack": 0.001,
            "decay": 2,
            "sustain": 0.1,
            "release": 2
        },
        "modulation": {
            "type": "square"
        },
        "modulationEnvelope": {
            "attack": 0.002,
            "decay": 0.2,
            "sustain": 0,
            "release": 0.2
        }
    }
}
export const TREE_TRUNK: OsciPreset = {
    type: "oscillator",
    oscillator: {
        type: 'sine'
    },
    envelope: {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 0.1,
        "release": 1.2
    }
}

export const MARIMBA: OsciPreset = {
    type: "oscillator",
    oscillator: {
        "partials": [
            1,
            0,
            2,
            0,
            3
        ]
    },
    envelope: {
        "attack": 0.001,
        "decay": 1.2,
        "sustain": 0,
        "release": 1.2
    }
}