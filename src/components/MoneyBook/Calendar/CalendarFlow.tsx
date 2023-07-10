import { addDays } from "date-fns"
import { useGetFlowData } from "../../../react-query/Expense/ExpenseFlowData"

const today = new Date().getTime()
const nextDay = addDays(today, 1).getTime()

const CalendarFlow = ({ day }: { day: number }) => {
    const { data: flow_data } = useGetFlowData({ start_date: today, end_date: nextDay })
    const condition = day % 7 >= 2 && day % 7 < 5
    console.log('data', flow_data?.data)
    return (
        <div className={`absolute lg:-top-16 top-0  ${condition ? "left-[11.5rem] animate-fade-right" : "right-[11.5rem] animate-fade-left"}  flex flex-col bg-[#ececec] shadow-xl lg:w-80 lg:h-80 w-40 h-[11.5rem]  animate-duration-150 animate-ease-in rounded`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute rotate-45 rounded-l w-7 h-7 top-20 lg:top-36 bg-[#ececec] ${condition ? "-left-3" : "-right-3 "}`}></div>
        </div>
    )
}

export default CalendarFlow