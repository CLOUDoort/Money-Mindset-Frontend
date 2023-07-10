const CalendarMap = ({ day }: { day: number }) => {
    const condition = day % 7 >= 2 && day % 7 < 5
    return (
        <div className={`absolute lg:-top-0 top-16  ${condition ? "left-[11.5rem] animate-fade-right" : "right-[11.5rem] animate-fade-left"}  flex flex-col bg-[#ececec] shadow-xl lg:w-80 lg:h-80 w-40 h-[11.5rem] animate-duration-150 animate-ease-in rounded`} onClick={(e) => e.stopPropagation()}>
            <div className={`absolute rotate-45 rounded-l w-7 h-7 lg:top-36 top-[4.5rem] bg-[#ececec] ${condition ? "-left-3" : "-right-3 "}`}></div>
        </div>
    )
}

export default CalendarMap