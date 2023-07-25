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
    const onDateClick = (day: Date) => setSelectedDate(format(day, "yyyy-MM-dd"))
    const [click, setModal] = useState(false)
    const clickModal = () => setModal(!click)
    return (
        <div className="bg-white min-w-[62.5rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center pb-10" onClick={() => setModal(false)}>
            <div className="flex flex-col items-center justify-center w-full max-w-[65rem] lg:px-10 px-10" onClick={(e) => e.stopPropagation()}>
                <div className="w-full gap-3 mt-10 mb-5 text-4xl font-semibold">
                    Calendar
                </div>
                <CalendarHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} goToday={goToday} />
                <CalendarDays />
                <CalendarCells click={click} clickModal={clickModal} currentMonth={currentMonth} onDateClick={onDateClick} selectedDate={selectedDate} />
            </div>
        </div>
    )
}

export default MoneyBookCalendar