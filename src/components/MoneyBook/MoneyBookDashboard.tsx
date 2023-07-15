import { useGetFlowData } from "../../react-query/Expense/ExpenseFlowData"
import ExpenseItemList from "./Expense/ExpenseItemList"
import { end_date_string, start_date_string } from "./MaginotLine/MoneyBookMaginotLine"
import { end_date, start_date } from "./MoneyBookNav"

const MoneyBookDashboard = () => {
    const { data: flow_data } = useGetFlowData({ start_date, end_date })
    return (
        <div className="lg:ml-52 ml-14 relative bg-[#fbfbfb] min-w-[47rem] w-full flex flex-col justify-center gap-10 items-center">
            <div className='flex items-center lg:w-[75%] mt-10 max-w-[70rem] w-[80%] text-2xl gap-3 font-semibold' >
                <div>{start_date_string} ~</div>
                <div>{end_date_string}</div>
            </div>
            {flow_data && <ExpenseItemList data={flow_data?.data} />}
        </div >
    )
}

export default MoneyBookDashboard