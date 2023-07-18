import CalendarFlow from "./CalendarFlow"
import CalendarMap from "./CalendarMap"
import { useEffect, useState } from "react"
import { addDays } from "date-fns"
import { apiInstance } from "../../../apis/setting"
import { useAtomValue } from "jotai"
import { userIdx } from "../../../store/initialState"



const CalendarModal = ({ select, day, date }: { select: string, day: number, date: Date }) => {
    const condition = day % 7 >= 2 && day % 7 < 5
    const [flowModal, setFlowModal] = useState(false)
    const [mapModal, setMapModal] = useState(false)
    const [data, setData] = useState([])
    const user_idx = useAtomValue(userIdx)
    useEffect(() => {
        const response = async () => {
            const getFlowData = await apiInstance.get(`/flow/user/${user_idx}`, { params: { start_date: date.getTime(), end_date: addDays(date, 1).getTime() } })
            setData(getFlowData?.data)
        }
        response()
    }, [date, user_idx])
    const clickFlow = () => {
        setFlowModal(!flowModal)
        if (mapModal) setMapModal(false)
    }
    const clickMap = () => {
        setMapModal(!mapModal)
        if (flowModal) setFlowModal(false)
    }
    return (
        <div className={`bg-white absolute z-[9999] border border-black/30 text-center shadow-xl rounded -top-2 rounded-b-none w-[9rem] h-[11.5rem]  ${condition ? "animate-fade-right left-[8.7rem]" : "animate-fade-left right-[8.7rem]"} animate-duration-150 cursor-default`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute rotate-45 border border-black/30 w-6 h-6 bg-white ${condition ? "-left-[0.81rem] border-r-0 border-t-0 top-20" : "-right-[0.81rem] border-l-0 border-b-0 top-20"}`}></div>
            <div className="p-5 font-semibold border-b-black/20">
                {select}
            </div>
            <div onClick={clickFlow} className="p-4 cursor-pointer border-b-black/20" >
                사용내역
            </div>
            <div onClick={clickMap} className="p-4 cursor-pointer">
                위치
            </div>
            {flowModal && !mapModal && <CalendarFlow day={day} flow_data={data} />}
            {mapModal && !flowModal && <CalendarMap day={day} flow_data={data} />}
        </div>
    )
}

export default CalendarModal