export interface SessionData {
    ads: Array<{ url: string, name: string, price: string, user: string, img: string, user_url: string }>;
    route: string;
    stopParse: boolean;
}