import { CustomContext } from '../../types/CustomContext';
import { categoriesKeyboard } from '../categories/categories.keyboard';
import { settingsKeyboard } from '../settings/settings.keyboard';
import { HOME_KEYBOARD_BUTTONS } from './home.keyboard';

type HomeType = {
    onMessage(ctx: CustomContext): void
}

export const HomeRoute: HomeType = {
    onMessage(ctx) {
        switch (ctx.update.message?.text) {
            case HOME_KEYBOARD_BUTTONS.categories:
                ctx.reply(HOME_KEYBOARD_BUTTONS.categories, {
                    reply_markup: categoriesKeyboard
                })
                ctx.session.route = 'categories'
                break;

            case HOME_KEYBOARD_BUTTONS.settings:
                ctx.reply(HOME_KEYBOARD_BUTTONS.settings, {
                    reply_markup: settingsKeyboard
                })
                ctx.session.route = 'settings'
                break;

            default:
                break;
        }
    }
}
