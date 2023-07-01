const CalendarModal = ({ select, clickModal }: { select: string, clickModal: () => void }) => {
    return (
        // <div className="lg:ml-36 ml-14 min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full z-50">
        <div className="bg-slate-300 absolute border z-50 left-28 top-0 rounded w-[10rem] h-[10rem]">
            <div className="absolute rotate-45 w-7 h-7 bg-slate-300 -left-2 top-5"></div>
            {select}
        </div>
        // </div>
    )
}

export default CalendarModal