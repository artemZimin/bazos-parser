import { Bot, session } from 'grammy'
import { callbackQueries } from './callbackQueries'
import { access } from './moddlewares/access'
import { homeKeyboard } from './routes/home/home.keyboard'
import { router } from './routes/routes'
import { CustomContext } from './types/CustomContext'
import { SessionData } from './types/SessionData'
import { conversations, createConversation } from '@grammyjs/conversations'
import { createCookieConversation, filtersConversation, whatsappConversation } from './routes/settings/settigs.conversations'
import { User } from './models/User'

// Define the shape of our session.

const bot = new Bot<CustomContext>('5894594725:AAHntm3i5Ywbm-7RRj8e6uA4KMkibVQD20Q')

function initial(): SessionData {
  return { ads: [], route: 'home', stopParse: false }
}

bot.use(session({ initial }))

bot.use(conversations());

bot.use(createConversation(filtersConversation, 'filtersConversation'))
bot.use(createConversation(whatsappConversation, 'whatsappConversation'))
bot.use(createConversation(createCookieConversation, 'createCookieConversation'))

bot.use(access)
bot.command('start', async ctx => {

  if (!(await User.findOneByUserId(ctx.update.message?.from.id || 0))) {
    const user = new User(ctx.update.message?.from.id || 0)
    await user.save()
  }

  await ctx.reply('Добро пожаловать', {
    reply_markup: homeKeyboard
  })
})

bot.use(callbackQueries)

bot.use(router)

bot.start()