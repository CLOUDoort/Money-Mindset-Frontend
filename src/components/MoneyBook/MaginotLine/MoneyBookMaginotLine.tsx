import MaginotFixed from "./MaginotFixed"
import MaginotGoal from "./MaginotGoal"
import { useAtomValue } from "jotai"
import { userAsset } from "../../../store/initialState"

const MoneyBookMaginotLine = () => {
    const asset = useAtomValue(userAsset)
    return (
        <div className="flex-1 lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[52rem] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center p-10">
                <div className="my-10 text-4xl font-semibold">현재 자산 : {asset} 원</div>
                <MaginotGoal />
                <MaginotFixed />
            </div>
        </div>
    )
}

export default MoneyBookMaginotLine