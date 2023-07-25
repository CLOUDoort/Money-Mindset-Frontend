import { useQuery, useQueryClient } from "react-query"

import { apiInstance } from "../apis/setting"
import { queryKeys } from "./constants"
import { useAtomValue } from "jotai"
import { userIdx } from "../store/initialState"

const getAssetData = async (userIdx: number) => apiInstance.get(`/asset/user/${userIdx}`)

export const useGetAssetData = () => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.assetData], () => getAssetData(idx))
}

export const usePrefetchAssetData = () => {
    const queryClient = useQueryClient()
    const idx = useAtomValue(userIdx)
    queryClient.prefetchQuery(queryKeys.assetData, () => getAssetData(idx))
}
