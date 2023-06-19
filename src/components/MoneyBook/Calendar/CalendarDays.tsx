const CalendarDays = () => {
    const date = ['일', '월', '화', '수', '목', '금', '토']
    return (
        <div className="flex items-center justify-between min-w-[45rem] w-[50rem] lg:w-[51rem] border border-t-0 border-collapse p-1 rounded-t-none">
            {date.map((day: string) => (
                <div className="w-full" key={day}>
                    <div className="w-[calc(100% / 7)] text-end mr-4">
                        {day}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CalendarDays