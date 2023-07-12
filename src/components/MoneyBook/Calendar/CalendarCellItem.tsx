import { addDays } from "date-fns"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { apiInstance } from "../../../apis/setting"
import { userIdx } from "../../../store/initialState"
import { PropsItem } from "./CalendarModal"

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
    return (
        <>
            {data && data.map((item: PropsItem) => (
                <li className="flex items-center justify-between p-1 text-xs rounded whitespace-nowrap" key={item.idx}>
                    <span>
                        {item.flowName}
                    </span>
                    <span>
                        {item.amount}
                    </span>
                </li>
            ))}
        </>
    )
}

export default CalendarCellItem