import { addDays } from "date-fns"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { apiInstance } from "../../../apis/setting"
import { userIdx } from "../../../store/initialState"
import { PropsFlowItem } from "./CalendarModal"

const CalendarCellItem = ({ day }: { day: Date }) => {
    const [data, setData] = useState([])
    const user_idx = useAtomValue(userIdx)
    useEffect(() => {
        const response = async () => {
            const getFlowData = await apiInstance.get(`/flow/user/${user_idx}`, { params: { start_date: day.getTime(), end_date: addDays(day, 1).getTime() } })
            setData(getFlowData?.data)
        }
        response()
    }, [day, user_idx])
    const filter_data = data.filter((_: any, index: any) => index < 4)
    console.log('data', data)
    return (
        <>
            {filter_data && filter_data.map((item: PropsFlowItem) => (
                <li className={`flex items-center justify-between p-1 px-2 ${item.flow_id <= 4 ? "text-blue-500" : "text-red-500"} text-xs font-semibold rounded whitespace-nowrap" key={item.idx}`}>
                    <span>
                        {item.flowName}
                    </span>
                    <span>
                        {item.amount}
                    </span>
                </li>
            ))}
            {data.length > 4 && <div className="pt-2 text-sm font-semibold text-center text-black/50">+{data.length - 4}개...</div>}
        </>
    )
}

export default CalendarCellItem