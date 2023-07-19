export interface FixedData {
    expenditure_amount: number,
    expenditure_date: string,
    fixed_expenditure: string,
    idx: number,
    user: User,
    user_idx: number
}

export type FlowDetailType = {
    detail: {
        detail: string,
        flow_idx: number,
        lat: number,
        lng: number
    },
    flow_id: number,
}

export type MapDataType = {
    content: JSX.Element,
    flow_idx: number,
    flow_id: number,
    lat: number,
    lng: number
}

export interface PropsFlowItem {
    amount: number,
    flowDetail: {
        flow_idx: number,
        detail: string,
        lat: number,
        lng: number
    } | null,
    flowName: string,
    flow_date: Date,
    flow_id: number,
    idx: number,
    user_idx: number
}

export interface GoalData {
    amount: number,
    goal: string,
    idx: number,
    line: number,
    ranking: number,
    user: {email: string, nickname: string},
    user_idx: number
}

export interface Asset {
    amount: number
}

export interface User {
    asset: Asset,
    email: string,
    idx: number,
    nickname: string
}