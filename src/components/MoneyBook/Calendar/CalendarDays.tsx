const CalendarDays = () => {
    const date = ['일', '월', '화', '수', '목', '금', '토']
    return (
        <div className="flex items-center justify-between w-full p-1 border border-t-0 border-collapse rounded-t-none">
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