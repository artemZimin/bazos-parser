import { Composer } from 'grammy'
import { Bazos, PARSE_STOP_BUTTON_TEXT } from './inc/Bazos'
import { User } from './models/User'
import { CategoriesRoute } from './routes/categories/categories.route'
import { CHANGE_FILTERS_CALLBACK_QUERY_DATA, CHANGE_WHATSAPP_CALLBACK_QUERY_DATA, DELETE_COOKIE_CALLBACK_QUERY_TYPE, GET_COOKIE_CALLBACK_QUERY_DATA, SET_COOKIE_CALLBACK_QUERY_DATA, VALID_COOKIE_CALLBACK_QUERY_TYPE } from './routes/settings/settings.keyboard'
import { SettingsRoute } from './routes/settings/settings.route'
import { CustomContext } from './types/CustomContext'

export const callbackQueries = new Composer<CustomContext>()

const enterConversation = (conversation: string) => async (ctx: CustomContext) => {
    try {
        await ctx.conversation.enter(conversation)
    } catch (error) {
        console.log('---');
    }
    await ctx.answerCallbackQuery();
}

callbackQueries.callbackQuery(PARSE_STOP_BUTTON_TEXT, CategoriesRoute.stopParse)
callbackQueries.callbackQuery(CHANGE_FILTERS_CALLBACK_QUERY_DATA, enterConversation('filtersConversation'))
callbackQueries.callbackQuery(CHANGE_WHATSAPP_CALLBACK_QUERY_DATA, enterConversation('whatsappConversation'))
callbackQueries.callbackQuery(SET_COOKIE_CALLBACK_QUERY_DATA, enterConversation('createCookieConversation'))
callbackQueries.callbackQuery(GET_COOKIE_CALLBACK_QUERY_DATA, SettingsRoute.getCookies)

callbackQueries.on("callback_query:data", async (ctx) => {
    const [type, data] = ctx.callbackQuery.data.split(':')

    if (type === DELETE_COOKIE_CALLBACK_QUERY_TYPE) {
        await User.deleteCookie(ctx.update.callback_query?.from.id || 0, parseInt(data))
        ctx.reply('Готово')
    }

    if (type === VALID_COOKIE_CALLBACK_QUERY_TYPE) {
        await Bazos.checkValidCookie(ctx, parseInt(data))
    }

    await ctx.answerCallbackQuery(); // remove loading animation
});
