import MaginotChart from "./MaginotChart"
import MaginotFixed from "./MaginotFixed"
import MaginotGoal from "./MaginotGoal"
import { useAtomValue } from "jotai"
import { finalMaginot, userAsset } from "../../../store/initialState"

const MoneyBookMaginotLine = () => {
    const asset = useAtomValue(userAsset)
    const finalLine = useAtomValue(finalMaginot)
    return (
        <div className="flex-1 lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[30rem] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full p-5 lg:p-10">
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