import { Bazos, PARSE_STOP_BUTTON_TEXT } from '../../inc/Bazos';
import { CustomContext } from '../../types/CustomContext';
import { homeKeyboard } from '../home/home.keyboard';
import { CATEGORIES_KEYBOARD_BUTTONS, CATEGORIES_LIST } from './categories.keyboard';
import { CallbackQueryMiddleware } from 'grammy';

type CategoriesType = {
    onMessage(ctx: CustomContext): void
    stopParse(ctx:  CustomContext): void
}

export const CategoriesRoute: CategoriesType = {
    onMessage(ctx) {
        if (CATEGORIES_KEYBOARD_BUTTONS.back === ctx.update.message?.text) {
            ctx.reply(CATEGORIES_KEYBOARD_BUTTONS.back, {
                reply_markup: homeKeyboard
            })
            ctx.session.route = 'home'
        } else if (Object.values(CATEGORIES_LIST).includes(ctx.update.message?.text || '')) {
            const bazos = new Bazos(ctx)

            bazos.parse()
        }
    },

    async stopParse(ctx) {        
        ctx.session.stopParse = true
        
        await ctx.answerCallbackQuery();
    }
}
