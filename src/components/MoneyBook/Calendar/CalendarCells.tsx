import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns"

import CalendarModal from "./CalendarModal"
import { useState } from "react"

const CalendarCells = ({ currentMonth, onDateClick, selectedDate }: { currentMonth: Date, onDateClick: (day: Date) => void, selectedDate: string }) => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const today = new Date()

    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''

    const [click, setModal] = useState(false)
    const clickModal = () => setModal(!click)

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'yyyy-MM-dd')
            const cloneDay = day
            days.push(
                <div className={`w-full relative gap-1 border rounded pb-[12%] text-end ${format(currentMonth, 'M') !== format(day, 'M') ? 'bg-gray-100 text-gray-300' : 'cursor-pointer'}`} key={formattedDate} onClick={() => {
                    clickModal()
                    onDateClick(cloneDay)
                }} >
                    <span className={`p-1 px-2 ${format(today, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && "text-red-600 font-bold"}`}>
                        {format(day, 'd')}
                    </span>
                    {click && formattedDate === selectedDate && format(currentMonth, 'M') === format(day, 'M') && <CalendarModal select={selectedDate} day={Number(format(day, 'd'))} />}
                </div>
            )
            day = addDays(day, 1)
        }
        rows.push(
            <div className="flex w-full gap-1">
                {days}
            </div>
        )
        days = []
    }

    return (
        <div className="flex items-center flex-col justify-between min-w-[45rem] w-[50rem] lg:w-[51rem] border border-t-0 border-collapse p-1 gap-1 rounded rounded-t-none">
            {rows}
        </div>
    )
}

export default CalendarCells