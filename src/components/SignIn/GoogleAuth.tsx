import { FcGoogle } from 'react-icons/fc'
import { apiInstance } from '../../apis/setting'

const GoogleAuth = () => {
    const clickLogin = async () => {
        const response = await apiInstance.get("/user/google/login")
        console.log('response', response)
    }
    return (
        <button onClick={clickLogin} className='flex items-center justify-center w-full py-3 font-semibold text-white transition ease-in-out bg-red-600 rounded shadow-md px-7 hover:bg-red-700 hover:shadow-lg active:bg-red-800 duration 150 '>
            <FcGoogle className='mr-2 text-2xl bg-white rounded-full' />
            CONTINUE WITH GOOGLE
        </button>
    )
}

export default GoogleAuth