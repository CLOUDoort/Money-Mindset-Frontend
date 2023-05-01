import { apiInstance } from "../../apis/setting";
import { queryKeys } from "../constants";
import { useQuery } from "react-query";

export const getGoalData = (userIdx: any) => apiInstance.get(`/maginot/user/${userIdx}`)

const useGetGoalData = (userIdx: any) => {
    const queryFn = () => getGoalData(userIdx)
    return useQuery([queryKeys.goalData], queryFn)
}

export default useGetGoalData