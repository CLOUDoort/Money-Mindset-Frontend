import { finalMaginot, userAsset } from "../../../store/initialState"
import { useEffect, useState } from "react"

import { GoalData } from "../../../type/goalData"
import MaginotChart from "./MaginotChart"
import MaginotFixed from "./Fixed/MaginotFixed"
import MaginotGoal from "./Goal/MaginotGoal"
import moment from "moment"
import { useAtomValue } from "jotai"
import { useGetGoalData } from "../../../react-query/MaginotData/MaginotGoalData"
import Loading from "../../Loading"

export type LineData = {
    legend: string,
    value: number
}

const today = moment().toDate()
export const start_date_string = new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString()
export const end_date_string = new Date(today.getFullYear(), today.getMonth() + 1, 0).toLocaleDateString()

const MoneyBookMaginotLine = () => {
    const asset = useAtomValue(userAsset)
    const finalLine = useAtomValue(finalMaginot)
    const { data, isLoading } = useGetGoalData()
    const [line, setLine] = useState([])

    useEffect(() => {
        console.log("data", data?.data)
        let sum = 0;
        try {
            const lineData = data?.data?.map((line: GoalData) => {
                sum += line.amount
                return {
                    "legend": line.goal,
                    "value": finalLine - sum,
                }
            })
            lineData.unshift({ "legend": "생존", "value": finalLine })
            setLine(lineData)
        }
        catch (e: any) {
            console.log(e)
        }
    }, [data?.data, finalLine])
    return (
        <>
            {(!isLoading && line) ? <div className="lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[45rem] w-full flex justify-center items-center">
                <div className="flex flex-col items-center justify-center lg:w-[75%] max-w-[70rem] w-[80%] lg:p-5">
                    <div className='flex items-center w-full gap-3 my-10 text-2xl font-semibold'>
                        <div>{start_date_string} ~</div>
                        <div>{end_date_string}</div>
                    </div>
                    <div className="my-5 text-3xl font-semibold">현재 자산 : {asset} 원</div>
                    {line && line?.map((line: LineData) => {
                        return (
                            <div key={line.value} className="my-5 text-2xl font-semibold">{line.legend} 방어선 : {line.value} 원</div>
                        )
                    })}
                    {line && <MaginotChart line={line} />}
                    <MaginotGoal />
                    <MaginotFixed />
                </div>
            </div> : <Loading />}
        </>
    )
}

export default MoneyBookMaginotLine