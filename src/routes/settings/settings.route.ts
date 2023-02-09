import { User } from '../../models/User';
import { CustomContext } from '../../types/CustomContext';
import { homeKeyboard } from '../home/home.keyboard';
import { cookieInlineKeyboard, filtersInlineKeyboard, getCookieInlineKeyboard, SETTINGS_KEYBOARD_BUTTONS, whatsappInlineKeyboard } from './settings.keyboard';
import { cookieMarkup, filtersMarkup, whatsappMarkup } from './settings.markup';

type SettingsType = {
    onMessage(ctx: CustomContext): void
    getCookies(ctx: CustomContext): void
}

export const SettingsRoute: SettingsType = {
    async onMessage(ctx) {
        switch (ctx.update.message?.text) {
            case SETTINGS_KEYBOARD_BUTTONS.back:
                ctx.reply(SETTINGS_KEYBOARD_BUTTONS.back, {
                    reply_markup: homeKeyboard
                })
                ctx.session.route = 'home'
                break;

            case SETTINGS_KEYBOARD_BUTTONS.cookies:
                ctx.reply('Управление куками', {
                    parse_mode: 'HTML',
                    reply_markup: cookieInlineKeyboard
                })
                break;

            case SETTINGS_KEYBOARD_BUTTONS.filters:
                const userF = await User.findOneByUserId(ctx.update.message.from.id)
                ctx.reply(filtersMarkup(userF?.filters || {}), {
                    parse_mode: 'HTML',
                    reply_markup: filtersInlineKeyboard
                })
                break;

            case SETTINGS_KEYBOARD_BUTTONS.whatsapp:
                const userW = await User.findOneByUserId(ctx.update.message.from.id)
                ctx.reply(whatsappMarkup(userW?.whatsApp || {}), {
                    parse_mode: 'HTML',
                    reply_markup: whatsappInlineKeyboard
                })
                break;


            default:
                break;
        }
    },
    async getCookies(ctx) {

        const user = await User.findOneByUserId(ctx.update.callback_query?.from.id || 0)
        
        user?.cookies.forEach(async cookie => {

            await ctx.reply(cookieMarkup(cookie), {
                parse_mode: 'HTML',
                reply_markup: getCookieInlineKeyboard(cookie)
            })
        })
        
        await ctx.answerCallbackQuery();
    }
}
