import { getReaction, Reactions } from '../../lib/reactions'
import { BaseCommand } from '../../Structures/Command/BaseCommand'
import { Command } from '../../Structures/Command/Command'
import Message from '../../Structures/Message'
import { IParsedArgs } from '../../typings/Command'

const reactions = Object.values(Reactions)

@Command('reactions', {
    aliases: [...reactions],
    category: 'Misc',
    description: {
        content: 'React!'
    }
})
export default class extends BaseCommand {
    override execute = async (
        { reply, mentioned, quoted, sender }: Message,
        { command }: IParsedArgs
    ): Promise<void> => {
        command = command.slice(this.client.config.prefix.length)
        if (command === 'reactions') return void reply(`Reactions: \n\n${reactions.join('\n')}`)
        if (!mentioned.length) mentioned.push(quoted?.sender.jid || sender.jid)
        const video = await getReaction(command as Reactions)
        const caption = (() => {
            return mentioned.reduce((acc, jid) => {
                acc.concat(jid === sender.jid ? 'Themselves' : `${jid.split('@')[0]}`, ' ')
                return acc
            }, `${sender.jid.split('@')[0]} ${this.client.util.capitalize(this.getPastTense(command))} `)
        })()
        await reply(video, 'video', 'image/gif', caption)
    }

    private getPastTense = (command: string): string => {
        switch (command) {
            case 'hug':
                return 'hugged'
            case 'kiss':
                return 'kissed'
            case 'slap':
                return 'slapped'
            case 'poke':
                return 'poked'
            case 'pat':
                return 'patted'
            case 'cuddle':
                return 'cuddled'
            case 'tickle':
                return 'tickled'
            case 'fed':
                return 'fed'
            default:
                return 'reacted'
        }
    }
}
