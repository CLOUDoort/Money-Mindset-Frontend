import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';

const GoogleAuth = () => {
    const googleURL = 'http://localhost:3714/user/google/login'
    return (
        <Link to={googleURL} className='flex items-center justify-center w-full py-3 font-semibold text-white transition ease-in-out bg-red-600 rounded shadow-md px-7 hover:bg-red-700 hover:shadow-lg active:bg-red-800 duration 150 '>
            <FcGoogle className='mr-2 text-2xl bg-white rounded-full' size={25} />
            CONTINUE WITH GOOGLE
        </Link>
    )
}

export default GoogleAuth