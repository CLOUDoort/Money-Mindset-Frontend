import { addMonths, subMonths } from "date-fns"

import CalendarCells from "./CalendarCells"
import CalendarDays from "./CalendarDays"
import CalendarHeader from "./CalendarHeader"
import { useState } from "react"

const MoneyBookCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const preMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const goToday = () => setCurrentMonth(new Date())
    return (
        <div className="lg:ml-52 ml-20 mb-10 mt-10 relative bg-[#fbfbfb] min-w-[50rem] w-full flex flex-col justify-center items-center">
            <CalendarHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} goToday={goToday} />
            <CalendarDays />
            <CalendarCells currentMonth={currentMonth} />
        </div>
    )
}

export default MoneyBookCalendar