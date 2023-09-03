import { PatchFixedData, PostFixedData } from "../../types";
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

const postFixedData = async (userIdx:number, value: PostFixedData) => await apiInstance.post(`/asset/user/${userIdx}/expenditure`, value)

export const usePostFixedData = () => {
    const idx = useAtomValue(userIdx)
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("추가 완료")
    const { mutate } = useMutation((value: PostFixedData) => postFixedData(idx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.fixedData])
            notifySuccess()
        }
    })
    return mutate
}

const patchFixedData = async (itemIdx: number, value: PatchFixedData) => await apiInstance.patch(`/asset/expenditure/${itemIdx}`, value)

export const usePatchFixedData = (itemIdx: number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("수정 완료")
    const { mutate } = useMutation((value: PatchFixedData) => patchFixedData(itemIdx, value), {
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