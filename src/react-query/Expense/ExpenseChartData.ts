import { FlowPeriod } from "./ExpenseFlowData";
import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { useAtomValue } from "jotai";
import { useQuery } from "react-query";
import { userIdx } from "../../store/initialState";

const getChartData = async (user_idx: number, value: FlowPeriod) => apiInstance.get(`/flow/chart/${user_idx}`, { params: value })

export const useGetChartData = (value: FlowPeriod) => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.chartData], () => getChartData(idx, value))
}