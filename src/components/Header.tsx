import { Outlet, useNavigate } from 'react-router'

import { BsSun } from 'react-icons/bs'
import { Fragment } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'

const Header = () => {
    const navigate = useNavigate()
    const clickLogout = async () => {
        try {
            const response = await apiInstance.post(`/user/logout/3`)
            toast.success("로그아웃!")

        } catch (e: any) {
            toast.error(e.response)
        }
    }
    return (
        <Fragment>
            <div className='bg-#FBFBFB border-b shadow-sm sticky top-0 z-50 py-3'>
                <header className='flex items-center justify-between max-w-6xl px-12 mx-auto'>
                    <div>
                        <img onClick={() => navigate("/")} className="cursor-pointer h-14" src="/MoneyMindsetLogo.svg" alt="logo" />
                    </div>
                    <div>
                        <ul className='flex items-center space-x-4 text-sm sm:text-lg'>
                            <li className="cursor-pointer">
                                <BsSun size={35} />
                            </li>
                            <li className="cursor-pointer">
                                <IoIosNotificationsOutline size={35} />
                            </li>
                            <li onClick={() => navigate("/sign-in")} className="cursor-pointer whitespace-nowrap">Sign-in</li>
                            <li onClick={clickLogout} className="cursor-pointer whitespace-nowrap">Logout</li>
                        </ul>
                    </div>
                </header>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Header