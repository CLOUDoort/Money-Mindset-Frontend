import { useMutation, useQuery, useQueryClient } from "react-query";

import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { toast } from "react-toastify";

type DetailData = {
    detail: string,
    lat: number,
    lng: number
}

const getDetailData = async (flowIdx: number) => await apiInstance.get(`/flow/detail/${flowIdx}`)

export const useGetDetailData = (flowIdx: number) => {
    return useQuery([queryKeys.flowDetail], () => getDetailData(flowIdx))
}

const postDetailData = async (flowIdx:number, value: DetailData) => await apiInstance.post(`/flow/detail/${flowIdx}`, value)

export const usePostDetailData = (flowIdx:number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("추가 완료")
    const { mutate } = useMutation((value: DetailData) => postDetailData(flowIdx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowDetail])
            notifySuccess()
        }
    })
    return mutate
}

const patchFixedData = async (flowIdx:number, value: DetailData) => await apiInstance.patch(`/flow/detail/${flowIdx}`, value)

export const usePatchFixedData = (flowIdx:number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("수정 완료")
    const { mutate } = useMutation((value: DetailData) => patchFixedData(flowIdx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.fixedData])
            notifySuccess()
        }
    })
    return mutate
}

const removeFixedData = async (flowIdx:number) => await apiInstance.delete(`/flow/detail/${flowIdx}`)

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