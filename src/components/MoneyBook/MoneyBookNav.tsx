import { Link, Outlet, useNavigate } from "react-router-dom"

import { AiOutlineBarChart } from 'react-icons/ai'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GiGoalKeeper } from 'react-icons/gi'
import { ImFileOpenoffice } from 'react-icons/im'
import { MdDashboard } from 'react-icons/md'
import { toast } from "react-toastify"
import { useSetAtom } from "jotai"
import { accessToken } from "../../store/initialState"
import { IoExitOutline } from 'react-icons/io5'
import { IoSettingsSharp } from 'react-icons/io5'

const DashNav = () => {
    const navigate = useNavigate()
    const setToken = useSetAtom(accessToken)
    const clickLogout = async () => {
        try {
            setToken("")
            toast.success("Sign Out!")
            navigate('/')
        } catch (e: any) {
            toast.error(e.response)
        }
    }
    return (
        <div className="flex h-full">
            <nav className="sticky left-0 flex flex-col items-center justify-between border-r w-60">
                <ul className="flex flex-col items-start justify-center py-4 w-52">
                    <li className="flex gap-2 p-4 whitespace-nowrap">
                        <MdDashboard size={25} />
                        <Link to='/money-book/dashboard'>Dashboard</Link>
                    </li>
                    <li className="flex gap-2 p-4 whitespace-nowrap">
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
                <ul className="flex flex-col items-start justify-center py-4 w-52">
                    <li className="flex gap-2 p-4 whitespace-nowrap">
                        <IoSettingsSharp size={25} />
                        <Link to='/money-book/setting'>Setting</Link>
                    </li>
                    <li className="flex gap-2 p-4 whitespace-nowrap">
                        <IoExitOutline size={25} />
                        <button onClick={clickLogout} >Sign out</button>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default DashNav