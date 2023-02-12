import { AdsType } from './AdsType'

export interface SessionData {
    ads: Array<AdsType>;
    route: string;
    stopParse: boolean;
}