import { User } from '../../models/User'
import { CustomContext } from '../../types/CustomContext'
import { CustomConversation } from '../../types/CustomConversation'

export async function filtersConversation(conversation: CustomConversation, ctx: CustomContext) {
    ctx.reply('Введите максимальное количество объявлений пользователя')
    const maxAds = await conversation.waitFor(':text')

    ctx.reply('Введите количество объявлений на выходе')
    const totalAds = await conversation.waitFor(':text')

    const result = {
        filters: {
            maxAds: parseInt(maxAds.msg.text),
            totalAds: parseInt(totalAds.msg.text)
        }
    }

    await User.updateByUserId(ctx.update.callback_query?.from.id || 0, result)

    await ctx.reply('Готово!')
}

export async function whatsappConversation(conversation: CustomConversation, ctx: CustomContext) {    
    ctx.reply('Введите интервал в секундах между отправкой сообщения')
    const interval = await conversation.waitFor(':text')

    const result = {
        whatsApp: {
            interval: parseInt(interval.msg.text) * 1000
        }
    }

    await User.updateByUserId(ctx.update.callback_query?.from.id || 0, result)

    await ctx.reply('Готово!')
}

export async function createCookieConversation(conversation: CustomConversation, ctx: CustomContext) {
    ctx.reply('Введите название куки')
    const name = await conversation.waitFor(':text')


    ctx.reply('Вставьте куку')
    const data = await conversation.waitFor(':text')

    const result = {
        name: name.msg.text,
        data: data.msg.text,
        timestamp: Date.now()
    }

    await User.addCookie(ctx.update.callback_query?.from.id || 0, result)

    await ctx.reply('Готово!')
}
