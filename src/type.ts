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

export interface FlowDataType {
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

export type LineData = {
    legend: string,
    value: number,
    idx:number
}

export type UserAssetType = {
    amount: number,
    fixedExpenditureAmount: number | null,
    user: {
        email: string,
        nickname: string,
    },
    userFlowSum: number | null,
    user_idx: number
}

export const graph_color = [
    "#ff0000",
    "#490184",
    "#1d039d",
    "#3e6ab0",
    "#135607",
    "#d9f409",
    "#ee8803",
    "#d60101",
    "#694e80",
    "#50487c",
    "#3b4e6d",
    "#3f5d3a",
    "#dde3ad",
    "#f1d6b1",
]

export type ExpenseStatisticsType = {
    id: number,
    label: string,
    value: number,
    color: string
}