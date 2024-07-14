import { faker } from "@faker-js/faker"
import _ from "lodash"
import { ADJECTIVE_LIST } from "./adjectives"

const INCLUDED_TYPES = ['smiley', 'nature', 'travel'] as const

const FILTERED_EMOJIS = new Set([
    '💋',
    '🗨️',
    '😏',
    '😫',
    '😩',
    '🤢',
    '💮',
    '🤮',
    '🥵',
    '💦',
    '🥴',
    '😈',
    '🏵️',
])

const FILTERED_PREPOSITIONS = new Set([
    'abaft',
    'amid',
    'anti',
    'afore',
    'aside',
    'anenst',
    'apropros',
    'apud',
    'circa',
    'lest',
    'mid',
    'midst',
    'pace',
    'qua',
    'sans',
    'save',
    'vice',
    'unto',
])

const getEmoji = () => {
    let emoji: string = ''
    while (emoji === '' || FILTERED_EMOJIS.has(emoji)) {
        emoji = faker.internet.emoji({ types: INCLUDED_TYPES })
    }
    return emoji
}
const getPreposition = () => {
    let prep: string = ''
    while (prep === '' || FILTERED_PREPOSITIONS.has(prep)) {
        prep = faker.word.preposition({ length: { min: 2, max: 5 } })
    }
    return prep
}

const getAdjective = () => {
    const adjectiveIndex = _.random(0, ADJECTIVE_LIST.length)
    return ADJECTIVE_LIST[adjectiveIndex]
}

const generatePrepTitle = () => {
    const emoji1 = getEmoji()
    const prep = getPreposition()
    const emoji2 = getEmoji()
    return `${emoji1} ${prep} ${emoji2}`
}

const generateAdjectiveTitle = () => {
    const emoji1 = getEmoji()
    const adjective = getAdjective()
    return _.startCase(`${adjective} ${emoji1}`)
}

const generateEmojiTitle = () => {
    const numberOfEmoji = faker.number.int({ min: 1, max: 3 })
    return Array.from({ length: numberOfEmoji }).map(
        () => getEmoji()
    ).join('')
}

export const generateTitleOptions = (length: number = 6) => {
    const options = Array.from({ length }).map((_, i) => {
        if (i % 3 === 0) {
            return generatePrepTitle()
        } else if (i % 2 === 0) {
            return generateAdjectiveTitle()
        } else {
            return generateEmojiTitle()
        }
    })
    return options
}