import { Router } from '@grammyjs/router';
import { CustomContext } from '../types/CustomContext';
import { CategoriesRoute } from './categories/categories.route';
import { HomeRoute } from './home/home.route';
import { SettingsRoute } from './settings/settings.route';

export const router = new Router((ctx: CustomContext) => ctx.session.route);

router.route('home').on('message:text', HomeRoute.onMessage)
router.route('categories')
    .on('message:text', CategoriesRoute.onMessage)

router.route('settings').on('message:text', SettingsRoute.onMessage)

router.otherwise().on('message:text', ctx => ctx.reply('Нет такого варианта'))
