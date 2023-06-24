import { useQuery, useQueryClient } from "react-query";

import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { useAtomValue } from "jotai";
import { userIdx } from "../../store/initialState";

export type StatisticsDataType = {
    start_date: number,
    end_date: number,
    flow_type: number
}

const getExpenseStatisticsData = async (user_idx: number, value: StatisticsDataType ) => await apiInstance.get(`/flow/static/${user_idx}`, { params: value })

export const useGetExpenseStatisticsData = (value: StatisticsDataType) => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.ExpenseStatisticsIncomeData], () => getExpenseStatisticsData(idx, value))
}


export const usePrefetchExpenseStatisticsIncomeData = (value: StatisticsDataType) => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.ExpenseStatisticsIncomeData, () => getExpenseStatisticsData(idx, value))
}

export const usePrefetchExpenseStatisticsOutComeData = (value: StatisticsDataType) => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.ExpenseStatisticsOutcomeData, () => getExpenseStatisticsData(idx, value))
}