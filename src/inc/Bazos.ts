import { CATEGORIES_LIST } from '../routes/categories/categories.keyboard';
import { CustomContext } from '../types/CustomContext';
import { InlineKeyboard } from 'grammy';
import { User } from '../models/User';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { Stepper } from '../utils/Stepper';
import { adsMarkup } from '../routes/categories/categories.markup';

export const PARSE_STOP_BUTTON_TEXT = 'stop_parse'

const inlineKeyboard = new InlineKeyboard()
    .text('Стоп', PARSE_STOP_BUTTON_TEXT)

const parseCookies = (cookies: any) => (cookies?.data ? JSON.parse(cookies.data) : []).map((el: any) => ({ name: el.name, value: el.value, domain: el.domain }))

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

            await page.waitForSelector('.teldetail', { timeout: 1000 })
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
        const initTime = Date.now()
        const getResult = () => (Date.now() - initTime) / 1000

        try {
            this.ctx.session.ads = []
            this.ctx.session.stopParse = false;
            this.category = (Object.entries(CATEGORIES_LIST).find(cat => cat[1] === this.ctx.update.message?.text) || [''])[0];
            this.ctx.reply(this.category)

            const user = await User.findOneByUserId(this.ctx.update.message?.from.id || 0)
            const filters = user?.filters

            const works = []

            const isedUrl: string[] = []

            for (let i = 1; i <= 1; i++) {
                const work = new Promise<number>(async resolve => {
                    await new Promise(resolve => setTimeout(resolve, i))

                    let browser = await puppeteer.launch({ headless: true })
                    let page = await browser.newPage()

                    const cookieSteper = new Stepper<{
                        data?: string | undefined;
                        name?: string | undefined;
                        timestamp?: number | undefined;
                    }>(user?.cookies || [])

                    await page.setCookie(...parseCookies(cookieSteper.getCurrent()))

                    const categoryUrl = `https://${this.category}.bazos.cz`
                    await page.goto(categoryUrl)

                    // Цикл по страницам
                    while (true) {

                        // Парсим урлы на страницу товара
                        let html = await page.content()
                        let $ = cheerio.load(html || '')
                        const pageUrls: string[] = []
                        let lastPageUrl = page.url()

                        try {
                            await page.waitForSelector('.gallery .gallerytxt a', { timeout: 1000 })

                            $('.gallery .gallerytxt a').each((_, el) => {
                                pageUrls.push(($(el).attr('href') || ''))
                            })
                        } catch (err) {
                            await page.waitForSelector('.inzeraty.inzeratyflex .nadpis a', { timeout: 1000 })

                            $('.inzeraty.inzeratyflex .nadpis a').each((_, el) => {
                                pageUrls.push(($(el).attr('href') || ''))
                            })
                        }

                        // Проходим циклом по урлам страницы
                        for (let i = 0; i < pageUrls.length; i++) {
                            if (cookieSteper.getCount() >= cookieSteper.getLength()) {
                                await this.ctx.reply('Куки умерли')
                                resolve(getResult())
                                return
                            }
                            if (this.ctx.session.ads.length >= Number(filters?.totalAds)) break
                            if (isedUrl.includes(pageUrls[i])) continue

                            // Переход на страницу товара 
                            isedUrl.push(pageUrls[i])
                            await page.goto(categoryUrl + pageUrls[i])

                            // Парсинг основной информации
                            html = await page.content()
                            $ = cheerio.load(html || '')

                            const url = page.url() || ''

                            const name = $('.inzeratydetnadpis h1').first().text()
                            const price = $('.listadvlevo table tr:last-child td:last-child').first().text()
                            const user = $('.listadvlevo table tr:first-child td:last-child a').first().text()
                            const img = $('.carousel.flickity-enabled.is-draggable img').first().attr('src') || 'https://www.ecookna.ru/upload/iblock/a83/a839cd2426dbd9a43fb885be98d2164d.jpg'
                            const user_url = $('.listadvlevo table tr:first-child td:last-child a').first().attr('href') || ''

                            // Переход на страницу пользователя
                            await page.waitForSelector('.listadvlevo table tr:first-child td:last-child a', { timeout: 1000 })

                            await page.click('.listadvlevo table tr:first-child td:last-child a')
                            try {
                                await page.waitForSelector('.listainzerat.inzeratyflex .inzeratynadpis', { timeout: 1000 })
                            } catch (err) {
                                continue
                            }
                            // Парсинг количества объяв

                            html = await page.content()
                            $ = cheerio.load(html || '')

                            const adsCount = parseInt($('.listainzerat.inzeratyflex .inzeratynadpis').first().text().replace(/^\D+/g, ''))

                            if (adsCount > Number(filters?.maxAds)) continue
                            // Парсинг номера
                            await page.goBack()           
                            await page.waitForSelector('.teldetail')
                            await page.click('.teldetail')
                            await new Promise(r => setTimeout(r, 500))
                            
                            const phone_number = await page.evaluate(() => {
                                return document.querySelector('.teldetail')?.textContent
                            }) || ''

                            const number_correct = parseInt(phone_number[phone_number.length - 1]) || parseInt(phone_number[phone_number.length - 1]) === 0
                            console.log(number_correct);

                            if (number_correct) {
                                this.ctx.session.ads.push({ url, name, price, user, img, user_url, adsCount, phone_number })
                                this.ctx.reply(`Прогресс: ${this.ctx.session.ads.length}/${filters?.totalAds}`)
                            } else {
                                this.ctx.reply('Подбор куки')
                                await page.deleteCookie(...parseCookies(cookieSteper.getCurrent()))
                                cookieSteper.next()
                                await page.setCookie(...parseCookies(cookieSteper.getCurrent()))
                            }
                        }

                        if (this.ctx.session.ads.length >= Number(filters?.totalAds)) break
                        await page?.goto(lastPageUrl)
                        try {
                            await page.waitForSelector('.strankovani a:last-child', { timeout: 1000 })

                            await page.click('.strankovani a:last-child')
                            lastPageUrl = page.url()
                        } catch (err) {
                            break
                        }
                    }

                    await browser.close()
                    resolve(getResult())
                })

                works.push(work)
            }

            const time = await Promise.race(works)
            await this.ctx.reply(`${time.toString()} сек.`)
        } catch (err) {
            console.log(err);
        } finally {
            this.ctx.session.ads.forEach(async ads => {
                await this.ctx.replyWithPhoto(ads.img, {
                    parse_mode: 'HTML',
                    caption: adsMarkup(ads),
                })
            })
        }
    }

}