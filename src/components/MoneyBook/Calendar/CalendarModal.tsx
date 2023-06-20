const CalendarModal = ({ select, clickModal }: { select: string, clickModal: () => void }) => {
    return (
        <div className="min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full z-50" onClick={clickModal}>
            <div className="bg-white border rounded w-52 h-52" onClick={(e) => e.stopPropagation()}>
                {select}
            </div>
        </div>
    )
}

export default CalendarModal