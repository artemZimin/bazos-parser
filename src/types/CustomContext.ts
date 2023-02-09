import { ConversationFlavor } from '@grammyjs/conversations/out/conversation';
import { Context, SessionFlavor } from 'grammy';
import { SessionData } from './SessionData';

export type CustomContext = Context & SessionFlavor<SessionData> & ConversationFlavor;