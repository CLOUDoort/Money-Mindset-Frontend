import { useMutation, useQuery, useQueryClient } from "react-query";

import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { toast } from "react-toastify";
import { useAtomValue } from "jotai";
import { userIdx } from "../../store/initialState";

const getFlowList = async () => apiInstance.get(`/flow`)

export const useGetFlowList = () => {
    return useQuery([queryKeys.flowList], () => getFlowList())
}

type FlowType = {
    flow_id: number,
    amount: number,
    flow_date: string
}

export type FlowPeriod = {
    start_date: number,
    end_date: number
}

const getFlowData = async (user_idx: number, value: FlowPeriod ) => await apiInstance.get(`/flow/user/${user_idx}`, { params: value })

export const useGetFlowData = (value: FlowPeriod) => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.flowData], () => getFlowData(idx, value))
}

export const usePrefetchFlowData = (value: FlowPeriod) => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.flowData, () => getFlowData(idx, value))
}

const postFlow = async (user_idx: number, value: FlowType) => apiInstance.post(`/flow/user/${user_idx}`, value)

export const usePostFlow = () => {
    const idx = useAtomValue(userIdx)
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("추가 완료")
    const { mutate } = useMutation((value: FlowType) => postFlow(idx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowData])
            queryClient.invalidateQueries([queryKeys.goalData])
            queryClient.invalidateQueries([queryKeys.chartData])
            queryClient.invalidateQueries([queryKeys.assetData])
            queryClient.invalidateQueries([queryKeys.ExpenseStatisticsIncomeData])
            queryClient.invalidateQueries([queryKeys.ExpenseStatisticsOutcomeData])
            notifySuccess()
        }
    })
    return mutate
}

const patchFlow = async (itemIdx: number, value: FlowType) => apiInstance.patch(`/flow/${itemIdx}`, value)

export const usePatchFlow = (itemIdx: number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("수정 완료")
    const { mutate } = useMutation((value: FlowType) => patchFlow(itemIdx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowData])
            queryClient.invalidateQueries([queryKeys.goalData])
            queryClient.invalidateQueries([queryKeys.chartData])
            queryClient.invalidateQueries([queryKeys.assetData])
            queryClient.invalidateQueries([queryKeys.ExpenseStatisticsIncomeData])
            queryClient.invalidateQueries([queryKeys.ExpenseStatisticsOutcomeData])
            notifySuccess()
        }
    })
    return mutate
}

const deleteFlow = async (itemIdx: number) => apiInstance.delete(`/flow/${itemIdx}`)

export const useDeleteFlow = () => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("삭제 완료")
    const { mutate } = useMutation(deleteFlow, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowData])
            queryClient.invalidateQueries([queryKeys.goalData])
            queryClient.invalidateQueries([queryKeys.chartData])
            queryClient.invalidateQueries([queryKeys.assetData])
            queryClient.invalidateQueries([queryKeys.ExpenseStatisticsIncomeData])
            queryClient.invalidateQueries([queryKeys.ExpenseStatisticsOutcomeData])
            notifySuccess()
        }
    })
    return mutate
}