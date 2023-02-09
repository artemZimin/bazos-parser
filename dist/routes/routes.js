"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const router_1 = require("@grammyjs/router");
const categories_route_1 = require("./categories/categories.route");
const home_route_1 = require("./home/home.route");
const settings_route_1 = require("./settings/settings.route");
exports.router = new router_1.Router((ctx) => ctx.session.route);
exports.router.route('home').on('message:text', home_route_1.HomeRoute.onMessage);
exports.router.route('categories')
    .on('message:text', categories_route_1.CategoriesRoute.onMessage);
exports.router.route('settings').on('message:text', settings_route_1.SettingsRoute.onMessage);
exports.router.otherwise().on('message:text', ctx => ctx.reply('Нет такого варианта'));
