export interface Asset {
    amount: number
}

export interface User {
    asset: Asset,
    email: string,
    idx: number,
    nickname: string
}