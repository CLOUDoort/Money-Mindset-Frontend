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

const patchDetailData = async (flowIdx:number, value: DetailData) => await apiInstance.patch(`/flow/detail/${flowIdx}`, value)

export const usePatchDetailData = (flowIdx:number) => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("수정 완료")
    const { mutate } = useMutation((value: DetailData) => patchDetailData(flowIdx, value), {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowDetail])
            notifySuccess()
        }
    })
    return mutate
}

const removeDetailData = async (flowIdx:number) => await apiInstance.delete(`/flow/detail/${flowIdx}`)

export const useDeleteDetailData = () => {
    const queryClient = useQueryClient()
    const notifySuccess = () => toast.success("삭제 완료")
    const { mutate } = useMutation(removeDetailData, {
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.flowDetail])
            notifySuccess()            
        },
    })
    return mutate
}