import { CATEGORIES_LIST } from '../routes/categories/categories.keyboard';
import { CustomContext } from '../types/CustomContext';
import { InlineKeyboard } from 'grammy';
import { User } from '../models/User';
import puppeteer from 'puppeteer';

export const PARSE_STOP_BUTTON_TEXT = 'stop_parse'

const inlineKeyboard = new InlineKeyboard()
    .text('Стоп', PARSE_STOP_BUTTON_TEXT)

export class Bazos {

    private category: string;

    constructor(private ctx: CustomContext) {
        this.category = ''
    }

    static async checkValidCookie(ctx: CustomContext, timestamp: number) {
        try {
            await ctx.reply('Идёт проверка куки на валид, это займёт екоторое время')

            const user = await User.findOneByUserId(ctx.update.callback_query?.from.id || 0)

            const cookies = user?.cookies.find(cookie => cookie.timestamp === timestamp)
            const parsedCookie = (cookies?.data ? JSON.parse(cookies.data) : []).map((el: any) => ({ name: el.name, value: el.value, domain: el.domain }))

            const browser = await puppeteer.launch({ headless: true })
            const page = await browser.newPage()
            await page.setViewport({
                width: 1920,
                height: 1080
            })
            await page.setCookie(...parsedCookie)

            await page.goto('https://zvirata.bazos.cz/')

            try {
                await page.waitForSelector('.gallery .gallerytxt a', { timeout: 1000 })
                await page.click('.gallery .gallerytxt a')
                // await page.waitForSelector('.inzeraty.inzeratyflex .nadpis a')
                // await page.click('.inzeraty.inzeratyflex .nadpis a')
            } catch (err) {
                //     await page.waitForSelector('.gallery .gallerytxt a')
                //     await page.click('.gallery .gallerytxt a')
                await page.waitForSelector('.inzeraty.inzeratyflex .nadpis a', { timeout: 1000 })
                await page.click('.inzeraty.inzeratyflex .nadpis a')

            }

            await page.waitForSelector('.teldetail')
            await page.click('.teldetail')
            
            try {
                await page.waitForSelector('#teloverit', { timeout: 500 })
                await ctx.reply(`${cookies?.name} - невалид!`)
            } catch {
                await ctx.reply(`${cookies?.name} - валид!`)
            }

            await browser.close()
        } catch (error) {
            await ctx.reply('При проверки куки что-то пошло не так')
            console.log(error);
        }
    }

    async parse() {
        this.ctx.session.stopParse = false;
        this.category = (Object.entries(CATEGORIES_LIST).find(cat => cat[1] === this.ctx.update.message?.text) || [''])[0];
        this.ctx.reply(this.category)

        while (true) {
            if (this.ctx.session.stopParse) break

            await new Promise((resolve, reject) => {
                setTimeout(resolve, 1000)
            })

            this.ctx.reply('Загрузка...', {
                reply_markup: inlineKeyboard
            })
        }

        this.ctx.reply('Готово!')
    }

}