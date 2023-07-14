
const CalendarMap = ({ day, flow_data }: { day: number, flow_data: any }) => {
    const condition = day % 7 >= 2 && day % 7 < 5
    return (
        <div className={`absolute border border-black/30 lg:-top-0 top-16  ${condition ? "left-[10.5rem] animate-fade-right" : "right-[10.5rem] animate-fade-left"}  flex flex-col bg-white shadow-xl lg:w-80 lg:h-72 w-40 h-[11.5rem] animate-duration-150 animate-ease-in rounded`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute border border-black/30 rotate-45 w-6 h-6 lg:top-[8.5rem] top-[4.5rem] bg-white ${condition ? "-left-[0.79rem] border-r-0 border-t-0" : "-right-[0.79rem] border-l-0 border-b-0"}`}></div>
        </div>
    )
}

export default CalendarMap