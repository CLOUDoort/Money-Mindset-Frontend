import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/sign-in/google'
export const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`

const GoogleAuth = () => {
    return (
        <Link to={googleURL} className='flex items-center justify-center w-full py-3 font-semibold text-white transition ease-in-out bg-red-600 rounded shadow-md px-7 hover:bg-red-700 hover:shadow-lg active:bg-red-800 duration 150 '>
            <FcGoogle className='mr-2 text-2xl bg-white rounded-full' size={25} />
            CONTINUE WITH GOOGLE
        </Link>
    )
}

export default GoogleAuth