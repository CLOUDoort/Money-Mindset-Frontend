import { useMutation, useQuery, useQueryClient } from "react-query";

import { PostGoalData } from "../../types";
import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { toast } from "react-toastify";
import { useAtomValue } from "jotai";
import { userIdx } from "../../store/initialState";

const getGoalData = async (userIdx: number) => await apiInstance.get(`/maginot/user/${userIdx}`)

export const usePrefetchGoalData = () => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.goalData, () => getGoalData(idx))
}

export const useGetGoalData = () => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.goalData], () => getGoalData(idx))
}


const postGoalData = async (userIdx: number, value: PostGoalData) => apiInstance.post(`/maginot/user/${userIdx}`, value)

export const usePostGoalData = () => {
    const idx = useAtomValue(userIdx)
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success('추가 완료')
    const { mutate } = useMutation((value: PostGoalData) => postGoalData(idx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.goalData])
            notifySuccess()
        }
    })
    return mutate
}

const patchGoalData = async (itemIdx: number, value: PostGoalData) => apiInstance.patch(`/maginot/${itemIdx}`, value)

export const usePatchGoalData = (itemIdx: number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("수정 완료")
    const { mutate } = useMutation((value: PostGoalData) => patchGoalData(itemIdx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.goalData])
            notifySuccess()
        }
    })
    return mutate
}

const removeGoalData = async (itemIdx: number) => apiInstance.delete(`/maginot/${itemIdx}`)

export const useRemoveGoalData = () => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success('삭제 완료')
    const { mutate } = useMutation(removeGoalData, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.goalData])
            notifySuccess()
        }
    })
    return mutate
}
