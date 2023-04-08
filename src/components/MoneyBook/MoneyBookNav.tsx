import { Link, Outlet } from "react-router-dom"

import { AiOutlineBarChart } from 'react-icons/ai'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GiGoalKeeper } from 'react-icons/gi'
import { ImFileOpenoffice } from 'react-icons/im'
import { MdDashboard } from 'react-icons/md'

const DashNav = () => {
    return (
        <div className="flex h-full max-w-6xl">
            <nav className="sticky left-0 flex flex-col items-center border-r w-60">
                <ul className="py-4 w-52">
                    <li className="flex items-center gap-2 p-4 whitespace-nowrap">
                        <MdDashboard size={25} />
                        <Link to='/money-book/dashboard'>Dashboard</Link>
                    </li>
                    <li className="flex items-center gap-2 p-4 whitespace-nowrap">
                        <ImFileOpenoffice size={25} />
                        <Link to='/money-book/expense'>Income & Outcome</Link>
                    </li>
                    <li className="flex gap-2 p-4 whitespace-nowrap">
                        <GiGoalKeeper size={25} />
                        <Link to='/money-book/maginot-line'>Maginot Line</Link>
                    </li>
                    <li className="flex gap-2 p-4 whitespace-nowrap">
                        <AiTwotoneCalendar size={25} />
                        <Link to='/money-book/calendar'>Calendar</Link>
                    </li>
                    <li className="flex gap-2 p-4 whitespace-nowrap">
                        <AiOutlineBarChart size={25} />
                        <Link to='/money-book/statistics'>Statistics</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default DashNav