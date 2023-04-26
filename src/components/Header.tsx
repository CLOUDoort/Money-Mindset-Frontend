import { Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { accessToken } from '../store/initialState'

import { apiInstance } from '../apis/setting'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'

const Header = () => {
    const navigate = useNavigate()
    const [token, setToken] = useAtom(accessToken)
    useEffect(() => {
        const getToken = async () => {
            try {
                const tokenResponse = await apiInstance.get('/user/refresh')
                setToken(tokenResponse.data.accessToken)
            }
            catch (e: any) {
                console.error(e.response)
            }
        }
        getToken()
    }, [setToken])

    const clickSignIn = () => {
        if (token) {
            navigate('/money-book/dashboard')
            toast.success("Sign In!")
        }
        else navigate("/sign-in")
    }
    return (
        <Fragment>
            <div className='bg-#FBFBFB border-b shadow-sm sticky top-0 z-50 py-3'>
                <header className='flex items-center justify-between max-w-6xl px-3 mx-auto'>
                    <div>
                        <img onClick={() => navigate("/")} className="cursor-pointer h-14" src="/MoneyMindsetLogo.svg" alt="logo" />
                    </div>
                    <div>
                        <ul className='flex items-center space-x-4 text-lg'>
                            <li onClick={clickSignIn} className="cursor-pointer whitespace-nowrap">Sign-in</li>
                            <li onClick={() => navigate("/sign-up")} className="cursor-pointer whitespace-nowrap">Sign-up</li>
                        </ul>
                    </div>
                </header>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Header