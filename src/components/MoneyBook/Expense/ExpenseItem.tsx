import { AiOutlineDelete } from "react-icons/ai"
import { useDeleteFlow } from "../../../react-query/Expense/ExpenseFlowData"

const ExpenseItem = ({ data }: any) => {
    const { flow_date, flowName, amount, idx } = data
    const temp = new Date(flow_date)
    const getDay = (dateIn: Date) => {
        // getMonth() is zero-based
        var dd = dateIn.getDate()
        return String(dd + '일 ')
    }
    const date = getDay(temp)
    const deleteItem = useDeleteFlow()
    return (
        <div className="relative flex items-center p-3text-center border-collapse transition-colors hover:bg-gray-100 group h-[74px] whitespace-nowrap border-b border-b-zinc-500">
            <div className="flex w-full gap-3 px-5">
                <div className="w-10">{date}</div>
                <div className="w-16"> {flowName}</div>
                <div className="flex-1 pr-5 text-right">{amount} 원</div>
                <AiOutlineDelete onClick={() => deleteItem(idx)} size={25} className="absolute hidden cursor-pointer right-2 group-hover:block" />
            </div>
        </div>
    )
}

export default ExpenseItem