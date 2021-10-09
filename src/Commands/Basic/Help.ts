import { stripIndents } from 'common-tags'
import { BaseCommand } from '../../Structures/Command/BaseCommand'
import { Command } from '../../Structures/Command/Command'
import Message from '../../Structures/Message'
import { IParsedArgs } from '../../typings/Command'

@Command('help', {
    aliases: ['menu'],
    category: 'Basic',
    description: {
        content: 'Displays the menu'
    }
})
export default class extends BaseCommand {
    override execute = async ({ reply }: Message, { text }: IParsedArgs): Promise<void> => {
        const { commands, aliases } = this.handler
        const command = (() => {
            const cmd = text.toLowerCase().trim()
            return commands.get(cmd) || aliases.get(cmd)
        })()
        if (command)
            return void reply(stripIndents`
            > Command: ${command.id}
            > Category: ${command.options.category}
            > Aliases: ${command.options.aliases.join(', ')}
            > Description: ${command.options.description.content}
            > Usage: ${command.id}${command.options.description.usage || ''}
        `)
        return void reply('TODO')
        /* TODO:
        const categories = Array.from(commands.values())
            .filter(c => c.options.category)
            .map(c => c.options.category)
            .filter((v, i, a) => a.indexOf(v) === i)
        categories.sort().forEach(category => {
            reply(stripIndents`
                > Category: ${category}
                > Commands: ${Array.from(commands.values()).filter(c => c.options.category === category).map(c => c.id).join(', ')}
            `)
        })*/
    }
}
