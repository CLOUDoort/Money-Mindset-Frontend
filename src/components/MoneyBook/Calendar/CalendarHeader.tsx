import { HiOutlineArrowCircleLeft, HiOutlineArrowCircleRight } from 'react-icons/hi'

import format from 'date-fns/format'

type Props = {
    currentMonth: Date,
    preMonth: () => void,
    nextMonth: () => void,
    goToday: () => void
}

const CalendarHeader = ({ currentMonth, preMonth, nextMonth, goToday }: Props) => {
    return (
        <div className='flex items-center justify-between w-full gap-3 p-5 text-3xl font-semibold border rounded rounded-b-none'>
            <div className='gap-3'>
                <span className='mr-3'>
                    {format(currentMonth, 'yyyy')}년
                </span>
                <span>
                    {format(currentMonth, 'M')}월
                </span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
                <HiOutlineArrowCircleLeft onClick={preMonth} />
                <button className='text-lg' onClick={goToday}>오늘</button>
                <HiOutlineArrowCircleRight onClick={nextMonth} />
            </div>
        </div>
    )
}

export default CalendarHeader