import { PropsItem } from "./CalendarModal"

const CalendarFlow = ({ day, flow_data }: { day: number, flow_data: any }) => {
    console.log('da', flow_data)
    const condition = day % 7 >= 2 && day % 7 < 5
    return (
        <div className={`absolute lg:-top-12 top-0  ${condition ? "left-[10.5rem] animate-fade-right" : "right-[10.5rem] animate-fade-left"}  flex flex-col bg-[#ececec] shadow-xl lg:w-80 lg:h-72 w-40 h-[11.5rem]  animate-duration-150 animate-ease-in rounded`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute rotate-45 rounded-l w-7 h-7 top-20 lg:top-32 bg-[#ececec] ${condition ? "-left-3" : "-right-3 "}`}></div>
            {flow_data && <div className="flex flex-col">
                {flow_data.map((item: PropsItem) => (
                    <div className="text-lg">
                        {item.amount}
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default CalendarFlow