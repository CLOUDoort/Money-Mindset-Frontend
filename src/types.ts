export type PostFixedData = {
    fixed_expenditure: string,
    expenditure_amount: number,
    expenditure_date: string
}

export interface PatchFixedData extends PostFixedData {
    user_idx: number,
}

export interface FixedData extends PatchFixedData {
    idx: number,
    user: User,
}

export type FLOW_DATA = {
    id: number,
    type: string,
    name: string,
}

export type MapDataType = {
    content: JSX.Element,
    flow_idx: number,
    flow_id: number,
    lat: number,
    lng: number
}

export type FlowType = {
    flow_id: number,
    amount: number,
    flow_date: string
}

export type FlowPeriod = {
    start_date: number,
    end_date: number
}

export interface Asset {
    amount: number
}

export interface FlowItemType extends Asset {
    idx: number,
    user_idx: number,
    flow_id: number,
    flow_date: Date
}

export interface FlowDataType extends FlowItemType {
    flowDetail: {
        flow_idx: number,
        detail: string,
        lat: number,
        lng: number
    } | null,
    flowName: string,
}

export interface PostGoalData extends Asset {
    ranking: number,
    goal: string,
}

export interface GoalData extends PostGoalData {
    idx: number,
    line: number,
    user: {email: string, nickname: string},
    user_idx: number
}


export interface User extends Asset {
    email: string,
    idx: number,
    nickname: string
}

export type LineData = {
    legend: string,
    value: number,
    idx: number
}

export interface UserAssetType extends Asset {
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