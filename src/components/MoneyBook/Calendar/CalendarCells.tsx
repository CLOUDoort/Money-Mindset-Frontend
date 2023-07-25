import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns"

import CalendarModal from "./CalendarModal"
import CalendarCellItem from "./CalendarCellItem"

interface Props {
    currentMonth: Date,
    onDateClick: (day: Date) => void,
    selectedDate: string,
    clickModal: () => void,
    click: boolean
}

const CalendarCells = ({ currentMonth, onDateClick, selectedDate, clickModal, click }: Props) => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const today = new Date()
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''
    let num = 0;
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'yyyy-MM-dd')
            const cloneDay = day
            num++
            days.push(
                <div className={`w-full h-[10.5rem] relative gap-1 border rounded pb-[12%] text-end ${format(currentMonth, 'M') !== format(day, 'M') ? 'bg-gray-100 text-gray-300' : 'cursor-pointer'}`} key={num} onClick={() => {
                    clickModal()
                    onDateClick(cloneDay)
                }} >
                    <span className={`p-1 flex flex-col px-2 ${format(today, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && "text-red-600 font-bold"}`}>
                        {format(day, 'd')}
                    </span>
                    <CalendarCellItem day={day} />
                    {click && formattedDate === selectedDate && format(currentMonth, 'M') === format(day, 'M') && <CalendarModal select={selectedDate} date={day} num={num} />}
                </div>
            )
            day = addDays(day, 1)
        }
        rows.push(
            <div className="flex w-full gap-1" key={num}>
                {days}
            </div>
        )
        days = []
    }

    return (
        <div className="flex flex-col items-center justify-between w-full gap-1 p-1 border border-t-0 border-collapse rounded rounded-t-none">
            {rows}
        </div>
    )
}

export default CalendarCells