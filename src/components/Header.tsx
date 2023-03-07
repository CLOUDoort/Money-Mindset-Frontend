import { BsSun } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useNavigate } from 'react-router'

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50 py-3'>
            <header className='flex justify-between items-center px-8 max-w-7xl mx-auto'>
                <div>
                    <img onClick={() => navigate("/")} className="h-16 cursor-pointer" src="/MoneyMindsetLogo.png" alt="logo" />
                </div>
                <div>
                    <ul className='flex space-x-6 items-center'>
                        <li className="cursor-pointer">
                            <BsSun size={35} />
                        </li>
                        <li className="cursor-pointer">
                            <IoIosNotificationsOutline size={35} />
                        </li>
                        <li onClick={() => navigate("/sign-in")} className="cursor-pointer">Sign-in</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header