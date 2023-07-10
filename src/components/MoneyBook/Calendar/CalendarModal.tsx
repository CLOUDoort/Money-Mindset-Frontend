import CalendarFlow from "./CalendarFlow"
import CalendarMap from "./CalendarMap"
import { useState } from "react"

const CalendarModal = ({ select, day }: { select: string, day: number }) => {
    const condition = day % 7 >= 2 && day % 7 < 5
    const [flowModal, setFlowModal] = useState(false)
    const [mapModal, setMapModal] = useState(false)
    const clickFlow = () => setFlowModal(!flowModal)
    const clickMap = () => setMapModal(!mapModal)
    return (
        <div className={`bg-[#ececec] absolute border z-50 text-center shadow-xl rounded rounded-b-none w-[10rem] h-[11.4rem]  ${condition ? "animate-fade-right left-32 -top-8" : "animate-fade-left right-32 -top-8"} animate-duration-150 cursor-default`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute rotate-45 rounded-l w-7 h-7 bg-[#ececec] ${condition ? "-left-3 top-20" : "-right-3 top-20"}`}></div>
            <div className="p-5 font-semibold border border-t-0 border-b-black/20">
                {select}
            </div>
            <div onClick={clickFlow} className="p-4 border border-t-0 cursor-pointer border-b-black/20" >
                사용내역
            </div>
            <div onClick={clickMap} className="p-4 border border-b-0 cursor-pointer">
                위치
            </div>
            {flowModal && !mapModal && <CalendarFlow day={day} />}
            {mapModal && !flowModal && <CalendarMap day={day} />}
        </div>
    )
}

export default CalendarModal