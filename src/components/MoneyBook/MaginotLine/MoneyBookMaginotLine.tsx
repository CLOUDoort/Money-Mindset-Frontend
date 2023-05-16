import MaginotChart from "./MaginotChart"
import { useAtomValue } from "jotai"
import { finalMaginot, userAsset } from "../../../store/initialState"
import MaginotGoal from "./Goal/MaginotGoal"
import MaginotFixed from "./Fixed/MaginotFixed"
import { useGetMaginotLineData } from "../../../react-query/MaginotData/MaginotLineData"

type LineData = {
    value: number,
    legend: string
}

const MoneyBookMaginotLine = () => {
    const asset = useAtomValue(userAsset)
    const finalLine = useAtomValue(finalMaginot)
    const { data } = useGetMaginotLineData()
    let sum = 0;
    const lineData = data?.data.map((line: LineData, index: number) => {
        sum += line.value
        return {
            "legend": line.legend + ' 방어선',
            "value": finalLine - sum,
        }
    })
    console.log('lineData', lineData)
    return (
        <div className="lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[30rem] w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center lg:w-[75%] w-[80%] p-5 lg:p-10">
                <div className="my-5 text-3xl font-semibold">현재 자산 : {asset} 원</div>
                <div className="my-5 text-3xl font-semibold">최종 방어선 : {finalLine} 원</div>
                {lineData && lineData.map((line: LineData) => (
                    <div className="my-5 text-3xl font-semibold">{line.legend}  : {line.value} 원</div>
                ))}
                <MaginotChart />
                <MaginotGoal />
                <MaginotFixed />
            </div>
        </div>
    )
}

export default MoneyBookMaginotLine