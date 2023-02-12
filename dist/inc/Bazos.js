"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bazos = exports.PARSE_STOP_BUTTON_TEXT = void 0;
const categories_keyboard_1 = require("../routes/categories/categories.keyboard");
const grammy_1 = require("grammy");
const User_1 = require("../models/User");
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio_1 = __importDefault(require("cheerio"));
const Stepper_1 = require("../utils/Stepper");
const categories_markup_1 = require("../routes/categories/categories.markup");
exports.PARSE_STOP_BUTTON_TEXT = 'stop_parse';
const inlineKeyboard = new grammy_1.InlineKeyboard()
    .text('Стоп', exports.PARSE_STOP_BUTTON_TEXT);
const parseCookies = (cookies) => ((cookies === null || cookies === void 0 ? void 0 : cookies.data) ? JSON.parse(cookies.data) : []).map((el) => ({ name: el.name, value: el.value, domain: el.domain }));
class Bazos {
    constructor(ctx) {
        this.ctx = ctx;
        this.category = '';
    }
    static checkValidCookie(ctx, timestamp) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ctx.reply('Идёт проверка куки на валид, это займёт екоторое время');
                const user = yield User_1.User.findOneByUserId(((_a = ctx.update.callback_query) === null || _a === void 0 ? void 0 : _a.from.id) || 0);
                const cookies = user === null || user === void 0 ? void 0 : user.cookies.find(cookie => cookie.timestamp === timestamp);
                const parsedCookie = ((cookies === null || cookies === void 0 ? void 0 : cookies.data) ? JSON.parse(cookies.data) : []).map((el) => ({ name: el.name, value: el.value, domain: el.domain }));
                const browser = yield puppeteer_1.default.launch({ headless: true });
                const page = yield browser.newPage();
                yield page.setViewport({
                    width: 1920,
                    height: 1080
                });
                yield page.setCookie(...parsedCookie);
                yield page.goto('https://zvirata.bazos.cz/');
                try {
                    yield page.waitForSelector('.gallery .gallerytxt a', { timeout: 1000 });
                    yield page.click('.gallery .gallerytxt a');
                    // await page.waitForSelector('.inzeraty.inzeratyflex .nadpis a')
                    // await page.click('.inzeraty.inzeratyflex .nadpis a')
                }
                catch (err) {
                    //     await page.waitForSelector('.gallery .gallerytxt a')
                    //     await page.click('.gallery .gallerytxt a')
                    yield page.waitForSelector('.inzeraty.inzeratyflex .nadpis a', { timeout: 1000 });
                    yield page.click('.inzeraty.inzeratyflex .nadpis a');
                }
                yield page.waitForSelector('.teldetail', { timeout: 1000 });
                yield page.click('.teldetail');
                try {
                    yield page.waitForSelector('#teloverit', { timeout: 500 });
                    yield ctx.reply(`${cookies === null || cookies === void 0 ? void 0 : cookies.name} - невалид!`);
                }
                catch (_b) {
                    yield ctx.reply(`${cookies === null || cookies === void 0 ? void 0 : cookies.name} - валид!`);
                }
                yield browser.close();
            }
            catch (error) {
                yield ctx.reply('При проверки куки что-то пошло не так');
                console.log(error);
            }
        });
    }
    parse() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const initTime = Date.now();
            const getResult = () => (Date.now() - initTime) / 1000;
            try {
                this.ctx.session.ads = [];
                this.ctx.session.stopParse = false;
                this.category = (Object.entries(categories_keyboard_1.CATEGORIES_LIST).find(cat => { var _a; return cat[1] === ((_a = this.ctx.update.message) === null || _a === void 0 ? void 0 : _a.text); }) || [''])[0];
                this.ctx.reply(this.category);
                const user = yield User_1.User.findOneByUserId(((_a = this.ctx.update.message) === null || _a === void 0 ? void 0 : _a.from.id) || 0);
                const filters = user === null || user === void 0 ? void 0 : user.filters;
                const works = [];
                const isedUrl = [];
                for (let i = 1; i <= 1; i++) {
                    const work = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        yield new Promise(resolve => setTimeout(resolve, i));
                        let browser = yield puppeteer_1.default.launch({ headless: true });
                        let page = yield browser.newPage();
                        const cookieSteper = new Stepper_1.Stepper((user === null || user === void 0 ? void 0 : user.cookies) || []);
                        yield page.setCookie(...parseCookies(cookieSteper.getCurrent()));
                        const categoryUrl = `https://${this.category}.bazos.cz`;
                        yield page.goto(categoryUrl);
                        // Цикл по страницам
                        while (true) {
                            // Парсим урлы на страницу товара
                            let html = yield page.content();
                            let $ = cheerio_1.default.load(html || '');
                            const pageUrls = [];
                            let lastPageUrl = page.url();
                            try {
                                yield page.waitForSelector('.gallery .gallerytxt a', { timeout: 1000 });
                                $('.gallery .gallerytxt a').each((_, el) => {
                                    pageUrls.push(($(el).attr('href') || ''));
                                });
                            }
                            catch (err) {
                                yield page.waitForSelector('.inzeraty.inzeratyflex .nadpis a', { timeout: 1000 });
                                $('.inzeraty.inzeratyflex .nadpis a').each((_, el) => {
                                    pageUrls.push(($(el).attr('href') || ''));
                                });
                            }
                            // Проходим циклом по урлам страницы
                            for (let i = 0; i < pageUrls.length; i++) {
                                if (cookieSteper.getCount() >= cookieSteper.getLength()) {
                                    yield this.ctx.reply('Куки умерли');
                                    resolve(getResult());
                                    return;
                                }
                                if (this.ctx.session.ads.length >= Number(filters === null || filters === void 0 ? void 0 : filters.totalAds))
                                    break;
                                if (isedUrl.includes(pageUrls[i]))
                                    continue;
                                // Переход на страницу товара 
                                isedUrl.push(pageUrls[i]);
                                yield page.goto(categoryUrl + pageUrls[i]);
                                // Парсинг основной информации
                                html = yield page.content();
                                $ = cheerio_1.default.load(html || '');
                                const url = page.url() || '';
                                const name = $('.inzeratydetnadpis h1').first().text();
                                const price = $('.listadvlevo table tr:last-child td:last-child').first().text();
                                const user = $('.listadvlevo table tr:first-child td:last-child a').first().text();
                                const img = $('.carousel.flickity-enabled.is-draggable img').first().attr('src') || 'https://www.ecookna.ru/upload/iblock/a83/a839cd2426dbd9a43fb885be98d2164d.jpg';
                                const user_url = $('.listadvlevo table tr:first-child td:last-child a').first().attr('href') || '';
                                // Переход на страницу пользователя
                                yield page.waitForSelector('.listadvlevo table tr:first-child td:last-child a', { timeout: 1000 });
                                yield page.click('.listadvlevo table tr:first-child td:last-child a');
                                try {
                                    yield page.waitForSelector('.listainzerat.inzeratyflex .inzeratynadpis', { timeout: 1000 });
                                }
                                catch (err) {
                                    continue;
                                }
                                // Парсинг количества объяв
                                html = yield page.content();
                                $ = cheerio_1.default.load(html || '');
                                const adsCount = parseInt($('.listainzerat.inzeratyflex .inzeratynadpis').first().text().replace(/^\D+/g, ''));
                                if (adsCount > Number(filters === null || filters === void 0 ? void 0 : filters.maxAds))
                                    continue;
                                // Парсинг номера
                                yield page.goBack();
                                yield page.waitForSelector('.teldetail');
                                yield page.click('.teldetail');
                                yield new Promise(r => setTimeout(r, 500));
                                const phone_number = (yield page.evaluate(() => {
                                    var _a;
                                    return (_a = document.querySelector('.teldetail')) === null || _a === void 0 ? void 0 : _a.textContent;
                                })) || '';
                                const number_correct = parseInt(phone_number[phone_number.length - 1]) || parseInt(phone_number[phone_number.length - 1]) === 0;
                                console.log(number_correct);
                                if (number_correct) {
                                    this.ctx.session.ads.push({ url, name, price, user, img, user_url, adsCount, phone_number });
                                    this.ctx.reply(`Прогресс: ${this.ctx.session.ads.length}/${filters === null || filters === void 0 ? void 0 : filters.totalAds}`);
                                }
                                else {
                                    this.ctx.reply('Подбор куки');
                                    yield page.deleteCookie(...parseCookies(cookieSteper.getCurrent()));
                                    cookieSteper.next();
                                    yield page.setCookie(...parseCookies(cookieSteper.getCurrent()));
                                }
                            }
                            if (this.ctx.session.ads.length >= Number(filters === null || filters === void 0 ? void 0 : filters.totalAds))
                                break;
                            yield (page === null || page === void 0 ? void 0 : page.goto(lastPageUrl));
                            try {
                                yield page.waitForSelector('.strankovani a:last-child', { timeout: 1000 });
                                yield page.click('.strankovani a:last-child');
                                lastPageUrl = page.url();
                            }
                            catch (err) {
                                break;
                            }
                        }
                        yield browser.close();
                        resolve(getResult());
                    }));
                    works.push(work);
                }
                const time = yield Promise.race(works);
                yield this.ctx.reply(`${time.toString()} сек.`);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                this.ctx.session.ads.forEach((ads) => __awaiter(this, void 0, void 0, function* () {
                    yield this.ctx.replyWithPhoto(ads.img, {
                        parse_mode: 'HTML',
                        caption: (0, categories_markup_1.adsMarkup)(ads),
                    });
                }));
            }
        });
    }
}
exports.Bazos = Bazos;
