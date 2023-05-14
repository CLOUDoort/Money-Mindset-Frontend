import MaginotChart from "./MaginotChart"
import { useAtomValue } from "jotai"
import { finalMaginot, userAsset } from "../../../store/initialState"
import MaginotGoal from "./Goal/MaginotGoal"
import MaginotFixed from "./Fixed/MaginotFixed"
import { useGetMaginotLineData } from "../../../react-query/MaginotData/MaginotLineData"

const MoneyBookMaginotLine = () => {
    const asset = useAtomValue(userAsset)
    const finalLine = useAtomValue(finalMaginot)
    const { data } = useGetMaginotLineData()
    console.log('line', data)
    return (
        <div className="flex-1 lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[30rem] w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center lg:w-[75%] w-full p-5 lg:p-10">
                <div className="my-5 text-3xl font-semibold">현재 자산 : {asset} 원</div>
                <div className="my-5 text-3xl font-semibold">최종 방어선 : {finalLine} 원</div>
                <MaginotChart />
                <MaginotGoal />
                <MaginotFixed />
            </div>
        </div>
    )
}

export default MoneyBookMaginotLine