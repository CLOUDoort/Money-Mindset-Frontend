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

type FlowPeriod = {
    start_date: number,
    end_date: number
}

const getFlowData = async (user_idx: number, value: FlowPeriod ) => apiInstance.get(`/flow/user/${user_idx}`, { params: value })

export const useGetFlowData = (value: FlowPeriod) => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.flowData], () => getFlowData(idx, value))
}

const postFlow = async (user_idx: number, value: FlowType) => apiInstance.post(`/flow/user/${user_idx}`, value)

export const usePostFlow = () => {
    const idx = useAtomValue(userIdx)
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("추가 완료")
    const { mutate } = useMutation((value: FlowType) => postFlow(idx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowData])
            notifySuccess()
        }
    })
    return mutate
}