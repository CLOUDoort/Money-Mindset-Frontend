import { usePrefetchChartData } from "../../react-query/Expense/ExpenseChartData"
import { usePrefetchFixedData } from "../../react-query/MaginotData/MaginotFixedData"
import { usePrefetchFlowData } from "../../react-query/Expense/ExpenseFlowData"
import { usePrefetchGoalData } from "../../react-query/MaginotData/MaginotGoalData"

const today = new Date()
export const start_date = new Date(today.getFullYear(), today.getMonth(), 1).getTime()
export const end_date = new Date(today.getFullYear(), today.getMonth() + 1, 0).getTime()

const MoneyBookDashboard = () => {
    usePrefetchGoalData()
    usePrefetchFixedData()
    usePrefetchFlowData({ start_date, end_date })
    usePrefetchChartData({ start_date, end_date })
    return (
        <div className="flex-1 lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[35rem]">
            <div className="flex flex-col items-center justify-center lg:w-[75%] max-w-[70rem] w-[80%] lg:p-5">
            </div>
        </div>
    )
}

export default MoneyBookDashboard