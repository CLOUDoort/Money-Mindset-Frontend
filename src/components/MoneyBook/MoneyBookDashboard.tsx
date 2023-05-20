import { usePrefetchFixedData } from "../../react-query/MaginotData/MaginotFixedData"
import { usePrefetchGoalData } from "../../react-query/MaginotData/MaginotGoalData"

const MoneyBookDashboard = () => {
    usePrefetchGoalData()
    usePrefetchFixedData()
    return (
        <div className="flex-1 lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[35rem]">
            <div className="flex flex-col items-center justify-center lg:w-[75%] max-w-[70rem] w-[80%] lg:p-10">
            </div>
        </div>
    )
}

export default MoneyBookDashboard