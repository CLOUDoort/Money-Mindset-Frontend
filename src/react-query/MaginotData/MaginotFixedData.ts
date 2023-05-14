import { useMutation, useQuery, useQueryClient } from "react-query";

import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { toast } from "react-toastify";
import { useAtomValue } from "jotai";
import { userIdx } from "../../store/initialState";

const getFixedData = async (userIdx: number) => await apiInstance.get(`/asset/user/${userIdx}/expenditure`)

export const useGetFixedData = () => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.fixedData], () => getFixedData(idx))
}

export const usePrefetchFixedData = () => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.fixedData, () => getFixedData(idx))
}

type MutationParams = {
    fixed_expenditure: string,
    expenditure_amount: number,
    expenditure_date: string
}
type PatchMutationParams = {
    user_idx: number,
    fixed_expenditure: string,
    expenditure_amount: number,
    expenditure_date: string
}

const postFixedData = async (userIdx:number, value: MutationParams) => await apiInstance.post(`/asset/user/${userIdx}/expenditure`, value)

export const usePostFixedData = () => {
    const idx = useAtomValue(userIdx)
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("추가 완료")
    const { mutate } = useMutation((value: MutationParams) => postFixedData(idx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.fixedData])
            notifySuccess()
        }
    })
    return mutate
}

const patchFixedData = async (itemIdx: number, value: PatchMutationParams) => await apiInstance.patch(`/asset/expenditure/${itemIdx}`, value)

export const usePatchFixedData = (itemIdx: number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("수정 완료")
    const { mutate } = useMutation((value: PatchMutationParams) => patchFixedData(itemIdx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.fixedData])
            notifySuccess()
        }
    })
    return mutate
}

const removeFixedData = async (itemIdx: number) => await apiInstance.delete(`/asset/expenditure/${itemIdx}`)

export const useDeleteFixedData = () => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("삭제 완료")
    const { mutate } = useMutation(removeFixedData, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.fixedData])
            notifySuccess()            
        },
    })
    return mutate
}