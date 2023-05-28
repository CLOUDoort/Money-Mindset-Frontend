import { useQuery, useQueryClient } from "react-query";

import { FlowPeriod } from "./ExpenseFlowData";
import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { useAtomValue } from "jotai";
import { userIdx } from "../../store/initialState";

const getChartData = async (user_idx: number, value: FlowPeriod) => apiInstance.get(`/flow/chart/${user_idx}`, { params: value })

export const useGetChartData = (value: FlowPeriod) => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.chartData], () => getChartData(idx, value))
}

export const usePrefetchChartData = (value: FlowPeriod) => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.chartData, () => getChartData(idx, value))
}