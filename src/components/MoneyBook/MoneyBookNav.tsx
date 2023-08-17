import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { accessToken, userAsset, userEmail, userIdx, userNickname } from "../../store/initialState"
import { useAtom, useSetAtom } from "jotai"

import { AiOutlineBarChart } from 'react-icons/ai'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GiGoalKeeper } from 'react-icons/gi'
import { ImFileOpenoffice } from 'react-icons/im'
import { IoExitOutline } from 'react-icons/io5'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { apiInstance } from "../../apis/setting"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { usePrefetchAssetData } from "../../react-query/AssetData"
import { usePrefetchChartData } from "../../react-query/Expense/ExpenseChartData"
import { usePrefetchFixedData } from "../../react-query/MaginotData/MaginotFixedData"
import { usePrefetchFlowData } from "../../react-query/Expense/ExpenseFlowData"
import { usePrefetchGoalData } from "../../react-query/MaginotData/MaginotGoalData"

const today = new Date()
export const start_date = new Date(today.getFullYear(), today.getMonth(), 1).getTime()
export const end_date = new Date(today.getFullYear(), today.getMonth() + 1, 1).getTime() - 1

const MoneyBookNav = () => {
    usePrefetchAssetData()
    usePrefetchGoalData()
    usePrefetchFixedData()
    usePrefetchFlowData({ start_date, end_date })
    usePrefetchChartData({ start_date, end_date })
    const location = useLocation().pathname
    const navigate = useNavigate()
    const [token, setToken] = useAtom(accessToken)
    const [idx, setIdx] = useAtom(userIdx)
    const setEmail = useSetAtom(userEmail)
    const setNickname = useSetAtom(userNickname)
    const setAsset = useSetAtom(userAsset)
    // 토큰
    useEffect(() => {
        const getToken = async () => {
            try {
                const getToken = await apiInstance.get('/user/refresh')
                setToken(getToken.data.accessToken)
            }
            catch (e: any) {
                console.error(e.message)
            }
        }
        getToken()
    }, [setToken])
    // 토큰으로부터 데이터 저장
    useEffect(() => {
        const getToken = async () => {
            // 새로고침 시 데이터 유지보다는 home 으로 보내는 것을 선택
            if (!token) navigate('/', { replace: true })
            if (token) {
                try {
                    const userData = await apiInstance.get('user/validate', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    const { idx, email, nickname } = userData.data
                    setIdx(idx);
                    setEmail(email)
                    setNickname(nickname)
                }
                catch (e: any) {
                    console.error(e.response)
                }
            }
        }
        getToken()
    }, [setEmail, setIdx, setNickname, token, navigate])
    // 추출한 idx로 자산 업데이트
    useEffect(() => {
        const response = async () => {
            if (idx) {
                try {
                    const getAsset = await apiInstance.get(`/asset/user/${idx}`)
                    setAsset(getAsset?.data?.amount + getAsset?.data?.userFlowSum)
                }
                catch (e: any) {
                    console.log(e.message)
                }
            }
        }
        response()
    }, [setAsset, idx])

    const clickLogout = async () => {
        try {
            setToken("")
            setIdx(0)
            setEmail("")
            setNickname("")
            setAsset(0)
            toast.success("Sign Out!")
            navigate('/')
        } catch (e: any) {
            toast.error(e.response)
        }
    }
    return (
        <div className="relative flex flex-col w-full h-full">
            <nav className="fixed top-0 left-0 z-[9999] flex-col justify-between hidden h-full bg-white border-r lg:flex w-56">
                <ul className="flex flex-col items-start justify-center w-full pb-2">
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap ${location === '/money-book/dashboard' && "border-r-4 border-red-500"}`}>
                        <MdDashboard size={25} />
                        <Link to='/money-book/dashboard'>Dashboard</Link>
                    </li>
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap ${location === '/money-book/expense' && "border-r-4 border-red-500"}`}>
                        <ImFileOpenoffice size={25} />
                        <Link to='/money-book/expense'>Income & Outcome</Link>
                    </li>
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap ${location === '/money-book/maginot-line' && "border-r-4 border-red-500"}`}>
                        <GiGoalKeeper size={25} />
                        <Link to='/money-book/maginot-line'>Maginot Line</Link>
                    </li>
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap ${location === '/money-book/calendar' && "border-r-4 border-red-500"}`}>
                        <AiTwotoneCalendar size={25} />
                        <Link to='/money-book/calendar'>Calendar</Link>
                    </li>
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap ${location === '/money-book/statistics' && "border-r-4 border-red-500"}`}>
                        <AiOutlineBarChart size={25} />
                        <Link to='/money-book/statistics'>Statistics</Link>
                    </li>
                </ul>
                <ul className="flex flex-col items-start justify-center w-full pt-2">
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap ${location === '/money-book/setting' && "border-r-4 border-red-500"}`}>
                        <IoSettingsSharp size={25} />
                        <Link to='/money-book/setting'>Setting</Link>
                    </li>
                    <li className={`flex w-full gap-2 p-4 whitespace-nowrap`}>
                        <IoExitOutline size={25} />
                        <button onClick={clickLogout} >Sign out</button>
                    </li>
                </ul>
            </nav>
            {/* 1024px 이하 아이콘만 표시 */}
            <nav className="fixed top-0 left-0 z-[9999] flex flex-col justify-between h-full bg-white border-r w-14 lg:hidden lg:w-56">
                <ul className="flex flex-col items-start justify-center w-full pb-2">
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap ${location === '/money-book/dashboard' && "border-r-2 border-red-500"} `}>
                        <Link to='/money-book/dashboard'>
                            <MdDashboard size={25} />
                        </Link>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Dashboard
                        </div>
                    </li>
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap ${location === '/money-book/expense' && "border-r-2 border-red-500"} `}>
                        <Link to='/money-book/expense'>
                            <ImFileOpenoffice size={25} />
                        </Link>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Income & Outcome
                        </div>
                    </li>
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap ${location === '/money-book/maginot-line' && "border-r-2 border-red-500"} `}>
                        <Link to='/money-book/maginot-line'>
                            <GiGoalKeeper size={25} />
                        </Link>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Maginot Line
                        </div>
                    </li>
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap ${location === '/money-book/calendar' && "border-r-2 border-red-500"} `}>
                        <Link to='/money-book/calendar'>
                            <AiTwotoneCalendar size={25} />
                        </Link>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Calendar
                        </div>
                    </li>
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap ${location === '/money-book/statistics' && "border-r-2 border-red-500"} `}>
                        <Link to='/money-book/statistics'>
                            <AiOutlineBarChart size={25} />
                        </Link>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Statistics
                        </div>
                    </li>
                </ul>
                <ul className="flex flex-col items-start justify-center w-full pt-2">
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap ${location === '/money-book/setting' && "border-r-2 border-red-500"} `}>
                        <Link to='/money-book/setting'>
                            <IoSettingsSharp size={25} />
                        </Link>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Setting
                        </div>
                    </li>
                    <li className={`relative w-full flex items-center gap-2 p-4 group whitespace-nowrap `}>
                        <button onClick={clickLogout} >
                            <IoExitOutline size={25} />
                        </button>
                        <div className="absolute hidden p-2 rounded bg-black/80 left-14 group-hover:block text-zinc-200">
                            Sign out
                        </div>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default MoneyBookNav