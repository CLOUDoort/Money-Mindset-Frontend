import MaginotFixed from "./MaginotFixed"
import MaginotGoal from "./MaginotGoal"
import MoneyBookNav from "../MoneyBookNav"
import { useAtomValue } from "jotai"
import { userAsset } from "../../../store/initialState"

const MoneyBookMaginotLine = () => {
    const asset = useAtomValue(userAsset)
    return (
        <div className="flex w-full h-full">
            <MoneyBookNav />
            <div className="flex flex-col items-center justify-center flex-1 p-4">
                <div className="mb-12 text-4xl font-semibold">현재 자산 : {asset} 원</div>
                <MaginotGoal />
                <MaginotFixed />

            </div>
        </div>
    )
}

export default MoneyBookMaginotLine