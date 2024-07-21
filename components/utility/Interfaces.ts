
interface HorizontalBarProps{
    progress:number,
    width:string,
    label:string,
    barType:string,
    barColor:string,
    textColor:string,
    progressedColor:string
}
export enum HomeView {
    LOGIN = 'LOGIN',
    LAUNCHER = 'LAUNCHER',
    GAME = 'GAME',
    UNDEFINED='UNDEFINED'
}
export enum Tutorials{
    ACCOUNT='ACCOUNT',
    POST_ACCOUNT='POST_ACCOUNT',
    MAIL='MAIL',
    BONUS_MONEY='BONUS_MONEY',
    REAL_MONEY='REAL_MONEY',
    ADD_MONEY='ADD_MONEY',
    WALLET='WALLET',
    EVENT='EVENT',
    GAME='GAME'
}