import { CustomContext } from '../types/CustomContext';
import { NextFunction } from 'grammy'
import ACCESS from '../access.json'

export const access = (ctx: CustomContext, next: NextFunction) => {
    if (ACCESS.includes(ctx.update.message?.from.username ?? ctx.update.callback_query?.from.username ?? '')) {
        next()
    } else {
        ctx.reply('Нет доступа')
    }
}