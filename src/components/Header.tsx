import { Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { accessToken, userEmail, userIdx, userNickname } from '../store/initialState'

import { BsSun } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'

const Header = () => {
    const navigate = useNavigate()
    const setAccessToken = useSetAtom(accessToken)
    const setIdx = useSetAtom(userIdx)
    const setEmail = useSetAtom(userEmail)
    const setNickname = useSetAtom(userNickname)
    useEffect(() => {
        const getToken = async () => {
            try {
                const tokenResponse = await apiInstance.get('/user/refresh')
                setAccessToken(tokenResponse.data.accessToken)
                const userData = await apiInstance.get('user/validate', {
                    headers: {
                        Authorization: 'Bearer ' + tokenResponse.data.accessToken
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
        getToken()
    }, [])
    const clickLogout = async () => {
        try {
            const response = await apiInstance.post(`/user/logout/3`)
            toast.success("로그아웃!")
            navigate('/')

        } catch (e: any) {
            toast.error(e.response)
        }
    }
    return (
        <Fragment>
            <div className='bg-#FBFBFB border-b shadow-sm sticky top-0 z-50 py-3'>
                <header className='flex items-center justify-between max-w-6xl px-4 mx-auto'>
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
                            <li onClick={() => navigate("/money-book/dashboard")} className="cursor-pointer whitespace-nowrap">Service</li>
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