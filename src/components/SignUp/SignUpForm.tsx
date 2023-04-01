import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { userEmail, userIdx, userNickname } from '../../store/initialState'

import SignInGoogle from '../SignIn/GoogleAuth'
import { apiInstance } from '../../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { useState } from "react"

const SignUpForm = () => {
    const setEmail = useSetAtom(userEmail);
    const setIdx = useSetAtom(userIdx);
    const setNickname = useSetAtom(userNickname);
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [existEmail, setExistEmail] = useState(0)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nickname: ""
    })
    const { email, password, nickname } = formData
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    const clickVerify = async () => {
        try {
            if (!formData.email) toast.error("Write email")
            const verifyEmail = await apiInstance.post(`user/email`, {
                email
            })
            console.log('veru', verifyEmail)
            if (verifyEmail.data.isExisted) setExistEmail(2)
            else setExistEmail(1)
        } catch (e: any) {
            toast.error(e.response)
        }

    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const submitResponse = await apiInstance.post(`/user/signup`, {
                email, password, nickname
            })
            toast.success('회원가입 성공!')
            navigate('/')
            setEmail(submitResponse.data.email);
            setIdx(submitResponse.data.idx);
            setNickname(submitResponse.data.nickname);
            console.log('submitResponse', submitResponse)
        }
        catch (e: any) {
            console.log(e.response)
        }
    }
    return (
        <section className='flex items-center justify-center w-full h-full'>
            <div className="flex flex-wrap items-center justify-center w-full max-w-6xl px-6 py-12 mx-auto ">
                <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="/MoneyMindsetLogo.svg" alt="logo" className="w-full rounded-2xl" />
                </div>
                <div className="flex w-full flex-col md:w-[67%] lg:w-[40%] ml-0 lg:ml-20">
                    <h1 className="mb-10 font-bold text-center lg:text-5xl">Sign-Up</h1>
                    <form onSubmit={submitHandler}>
                        <div className='flex bl-4'>
                            <div className='mb-2 mr-2 text-lg font-semibold'>Email</div>
                            {existEmail === 2 ? <p className='mb-2 text-lg text-red-600'>Already exists. Back to <Link to={"/sign-in"} className='text-blue-600'>Sing in</Link></p> : existEmail === 1 ? <p className='mb-2 text-lg text-green-600'>Valid</p> : null}
                        </div>
                        <div className='flex items-center justify-center'>
                            <input autoComplete='off' className="w-full px-4 py-2 mb-4 text-xl transition ease-in-out bg-white border-gray-400 rounded" type="email" name="email" value={email} placeholder="example@google.com" onChange={changeHandler} />
                            <button type='button' onClick={clickVerify} className={`text-lg mb-4 font-semibold ml-4 border py-3 px-3 rounded bg-gray-300  hover:bg-gray-400 active:bg-gray-500  transition duration 150 ease-in-out`}>Verify</button>
                        </div>
                        <div className='mb-2 text-lg font-semibold'>Password</div>
                        <div className="relative mb-6">
                            <input className="w-full px-4 py-2 text-xl transition ease-in-out bg-white border-gray-400 rounded" type={showPassword ? 'text' : "password"} name="password" value={password} placeholder="password" onChange={changeHandler} />
                            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' /> : <AiFillEye onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' />}
                        </div>
                        <div className='mb-2 text-lg font-semibold'>Nickname</div>
                        <input autoComplete='off' className="w-full px-4 py-2 mb-6 text-xl transition ease-in-out bg-white border-gray-400 rounded" type="text" name="nickname" value={nickname} placeholder="nickname" onChange={changeHandler} />
                        <div className='flex justify-between text-sm whitespace-nowrap sm:text-lg'>
                            <p className='mb-6'>
                                Have a account?
                                <Link className='ml-1 text-red-600 transition ease-in-out hover:text-red-700 duration 150' to="/sign-in">
                                    Sign in
                                </Link>
                            </p>
                            <p className='text-blue-600 transition ease-in-out hover:text-blue-700 duration 150'>
                                <Link to="/forgot">Forgot password?</Link>
                            </p>
                        </div>
                        <button className='w-full py-3 text-lg font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>Sign up</button>
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

export default SignUpForm