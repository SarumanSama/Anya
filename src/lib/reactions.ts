import { NEKOS_DOT_LIFE } from '../Constants'
import Util from '../Helpers/Utils'

const { fetch, fetchBuffer, convertGIFToMP4 } = new Util()

export enum Reactions {
    HUG = 'hug',
    KISS = 'kiss',
    PAT = 'pat',
    TICKLE = 'tickle',
    PUNCH = 'punch',
    SLAP = 'slap',
    FEED = 'feed'
}

export const getReaction = async (reaction: Reactions, vid = true): Promise<Buffer> => {
    const { url } = await fetch(NEKOS_DOT_LIFE.concat(reaction))
    const buffer = await fetchBuffer(url)
    return vid ? convertGIFToMP4(buffer) : buffer
}
