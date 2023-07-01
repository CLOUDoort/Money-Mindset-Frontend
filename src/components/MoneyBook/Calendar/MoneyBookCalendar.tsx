import { addMonths, format, subMonths } from "date-fns"

import CalendarCells from "./CalendarCells"
import CalendarDays from "./CalendarDays"
import CalendarHeader from "./CalendarHeader"
import { useState } from "react"

const MoneyBookCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState("")
    const preMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const goToday = () => setCurrentMonth(new Date())
    const onDateClick = (day: Date) => {
        setSelectedDate(format(day, "yyyy-MM-dd"))
    }
    return (
        <div className="lg:ml-52 ml-14 relative bg-[#fbfbfb] min-w-[50rem] h-full w-full flex flex-col justify-center items-center">
            <div className="min-h-[55rem]">
                <CalendarHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} goToday={goToday} />
                <CalendarDays />
                <CalendarCells currentMonth={currentMonth} onDateClick={onDateClick} selectedDate={selectedDate} />

            </div>
        </div>
    )
}

export default MoneyBookCalendar