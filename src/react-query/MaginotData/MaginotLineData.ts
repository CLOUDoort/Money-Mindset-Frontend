import { useAtomValue } from "jotai";
import { useQuery } from "react-query";
import { apiInstance } from "../../apis/setting";
import { userIdx } from "../../store/initialState";
import { queryKeys } from "../constants";

const getMaginotLineData = async (userIdx: number) => await apiInstance.get(`/maginot/marker/${userIdx}`)

export const useGetMaginotLineData = () => {
    const idx = useAtomValue(userIdx)
    return useQuery([queryKeys.lineData], () => getMaginotLineData(idx))
}