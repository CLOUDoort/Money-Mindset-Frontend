import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

import SignInGoogle from './GoogleAuth'
import { accessToken } from '../../store/initialState'
import { apiInstance } from '../../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { useState } from "react"

const SignInForm = () => {
    const navigate = useNavigate()
    const setToken = useSetAtom(accessToken)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const submitResponse = await apiInstance.post(`/user/signin`, {
                email, password
            })
            toast("로그인 성공!")
            console.log('sumbit', submitResponse.data)
            navigate('/')
            setToken(submitResponse.data.accessToken)
        } catch (e: any) {
            toast.error(e.response.data.message)
        }

    }
    return (
        <section className='flex items-center justify-center w-full h-full'>
            <div className="flex flex-wrap items-center justify-center w-full px-6 py-12 mx-auto max-w-7xl ">
                <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="/MoneyMindsetLogo.svg" alt="logo" className="w-full rounded-2xl" />
                </div>
                <div className="flex w-full flex-col md:w-[67%] lg:w-[40%] ml-0 lg:ml-20">
                    <h1 className="text-5xl font-bold text-center lg:text-6xl mb-14">Sign-in</h1>
                    <form onSubmit={submitHandler}>
                        <div className='mb-2 text-lg font-semibold'>Email</div>
                        <input autoComplete='off' className="w-full px-4 py-2 mb-6 text-xl transition ease-in-out bg-white border-gray-400 rounded" type="email" name="email" value={email} placeholder="example@google.com" onChange={changeHandler} />
                        <div className='mb-2 text-lg font-semibold'>password</div>
                        <div className="relative mb-6">
                            <input className="w-full px-4 py-2 text-xl transition ease-in-out bg-white border-gray-400 rounded" type={showPassword ? 'text' : "password"} name="password" value={password} placeholder="password" onChange={changeHandler} />
                            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' /> : <AiFillEye onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' />}
                        </div>
                        <div className='flex justify-between text-sm whitespace-nowrap sm:text-lg'>
                            <p className='mb-6'>
                                Don't have a account?
                                <Link className='ml-1 text-red-600 transition ease-in-out hover:text-red-700 duration 150' to="/sign-up">
                                    Register
                                </Link>
                            </p>
                            <p className='text-blue-600 transition ease-in-out hover:text-blue-700 duration 150'>
                                <Link to="/forgot">Forgot password?</Link>
                            </p>
                        </div>
                        <button className='w-full py-3 text-lg font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>Sign in</button>
                        <div className='flex items-center my-4 before:border-t before:border-gray-300 before:flex-1 after:border-t after:border-gray-300 after:flex-1'>
                            <p className='mx-4 font-semibold text-center'>OR</p>
                        </div>
                        <SignInGoogle />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignInForm