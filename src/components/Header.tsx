import { Outlet, useNavigate } from 'react-router'
import { accessToken, userEmail, userIdx, userNickname } from '../store/initialState'
import { useAtom, useSetAtom } from 'jotai'

import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Header = () => {
    const navigate = useNavigate()
    const [token, setToken] = useAtom(accessToken)
    const setIdx = useSetAtom(userIdx)
    const setEmail = useSetAtom(userEmail)
    const setNickname = useSetAtom(userNickname)
    useEffect(() => {
        const getToken = async () => {
            try {
                const tokenResponse = await apiInstance.get('/user/refresh')
                setToken(tokenResponse.data.accessToken)
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
    }, [setToken, setEmail, setIdx, setNickname])

    const clickSignIn = () => {
        if (token) {
            navigate('/money-book/dashboard')
            toast.success("Sign In!")
        }
        else navigate("/sign-in")
    }
    return (
        <div className='flex flex-col h-full'>
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
        </div>
    )
}

export default Header