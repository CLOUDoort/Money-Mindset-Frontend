import { GoalData, LineData, graph_color } from "../../../type"

import MaginotChart from "./MaginotChart"
import MaginotFixed from "./Fixed/MaginotFixed"
import MaginotGoal from "./Goal/MaginotGoal"
import { MdOutlineSpeakerNotesOff } from "react-icons/md"
import moment from "moment"
import { useGetAssetData } from "../../../react-query/AssetData"
import { useGetGoalData } from "../../../react-query/MaginotData/MaginotGoalData"

const today = moment().toDate()
export const start_date_string = new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString()
export const end_date_string = new Date(today.getFullYear(), today.getMonth() + 1, 0).toLocaleDateString()

const MoneyBookMaginotLine = () => {
    const { data: asset } = useGetAssetData()
    const { data: goal_data } = useGetGoalData()
    let sum = 0;
    const lineData = goal_data?.data?.map((line: GoalData, index: number) => {
        sum += line.amount
        return {
            "idx": line.idx,
            "legend": line.goal,
            "value": asset?.data?.amount + asset?.data?.userIncome - asset?.data?.fixedExpenditureAmount - sum
        }
    })
    lineData?.unshift({ "legend": "생존", "value": asset?.data?.amount + asset?.data?.userIncome - asset?.data?.fixedExpenditureAmount })
    return (
        <div className="bg-white min-w-[50rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center">
            <div className="flex flex-col items-center max-w-[65rem] justify-center w-full px-10">
                <div className="flex flex-col w-full gap-3 mt-10 text-2xl font-semibold">
                    <div className="text-4xl">Maginot Line</div>
                    <div className="flex items-center justify-between w-full">
                        <div className="items-center">{start_date_string} ~ {end_date_string}</div>
                        <div>현재 자산 : {asset?.data?.amount + asset?.data?.userIncome - asset?.data?.userExpense} 원</div>
                    </div>
                </div>
                {lineData ?
                    <div className="grid w-full grid-cols-2 gap-3 my-10 text-2xl">
                        {lineData?.map((item: LineData) => (
                            <div key={item.idx} className={`flex flex-col items-center ${asset?.data?.userExpense > item.value ? "bg-red-300" : "bg-green-300"} justify-center font-semibold w-full h-[10rem] border rounded-3xl`}>
                                <div>
                                    {item.value - asset?.data?.userExpense < 0 ? "파괴" : item.value - asset?.data?.userExpense + "원 사용가능"}
                                    <div>{item.legend} 방어선</div>
                                </div>
                            </div>
                        ))}
                    </div> : <div className="w-full h-[30rem] border rounded flex items-center justify-center">
                        <MdOutlineSpeakerNotesOff size={50} />
                    </div>}
                {lineData && <MaginotChart line={lineData} max={asset?.data?.amount + asset?.data?.userIncome} />}
                <MaginotGoal />
                <MaginotFixed />
            </div>
        </div>
    )
}

export default MoneyBookMaginotLine