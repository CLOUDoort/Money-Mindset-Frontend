import { MdOutlineSpeakerNotesOff } from "react-icons/md"
import { PropsFlowItem } from "./CalendarModal"

const CalendarFlow = ({ day, flow_data }: { day: number, flow_data: any }) => {
    const condition = day % 7 >= 2 && day % 7 < 5
    return (
        <div className={`absolute lg:-top-12 top-0  ${condition ? "left-[10.5rem] animate-fade-right" : "right-[10.5rem] animate-fade-left"}  flex flex-col bg-white border border-black/30 shadow-xl lg:w-80 lg:h-72 w-40 h-[11.5rem]  animate-duration-150 animate-ease-in rounded`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute border border-black/30 rotate-45 w-6 h-6 top-20 lg:top-32 bg-white ${condition ? "-left-[0.81rem] border-r-0 border-t-0" : "-right-[0.81rem] border-l-0 border-b-0"}`}></div>
            {flow_data.length ? <ul className="flex flex-col p-4">
                {flow_data.map((item: PropsFlowItem) => (
                    <li key={item.idx} className={`text-xs lg:text-sm flex items-center justify-between font-semibold ${item.flow_id <= 4 ? "text-blue-500" : "text-red-500"} pt-1 whitespace-nowrap `}>
                        <span>{item.flowName} ({item.flowDetail && item.flowDetail.detail})</span>
                        <span>{item.amount}</span>
                    </li>
                ))}
            </ul> : <div className='flex items-center justify-center w-full h-full m-auto text-2xl font-semibold'>
                <MdOutlineSpeakerNotesOff size={50} />
            </div>}
        </div>
    )
}

export default CalendarFlow