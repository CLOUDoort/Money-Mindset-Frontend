import { FcGoogle } from 'react-icons/fc'

const OAuth = () => {
    return (
        <button className='w-full flex justify-center items-center bg-red-600 text-white py-3 px-7 rounded font-semibold shadow-md hover:bg-red-700 hover:shadow-lg active:bg-red-800 transition duration 150 ease-in-out '>
            <FcGoogle className='bg-white rounded-full mr-2 text-2xl' />
            CONTINUE WITH GOOGLE
        </button>
    )
}

export default OAuth