import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { accessToken, userEmail, userIdx } from '../../../store/initialState'

import Input from '../../InputForm'
import SignInGoogle from '../GoogleAuth'
import { apiInstance } from '../../../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { useState } from "react"

const SignUpForm = () => {
    const setAccessToken = useSetAtom(accessToken)
    const setIdx = useSetAtom(userIdx)
    const setEmail = useSetAtom(userEmail)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        password: "",
        passwordCheck: ""
    })
    const { nickname, email, password, passwordCheck } = formData
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (password === passwordCheck) {
            try {
                const verifyEmail = await apiInstance.post(`user/email`, {
                    email
                })
                if (!verifyEmail.data.isExisted) {
                    const submitResponse = await apiInstance.post(`/user/signup`, {
                        email, password, nickname
                    })
                    toast.success('회원가입 성공!')
                    setAccessToken(submitResponse.data.accessToken)
                    setEmail(submitResponse.data.user.email)
                    setIdx(submitResponse.data.user.idx)
                    navigate('/money-book/dashboard')
                }
                else toast.error("Already email existed!")
            }
            catch (e: any) {
                console.log(e.response)
            }
        }
        else toast.error("Password dose not match!")
    }
    return (
        <section className='flex items-center justify-center w-full h-full'>
            <div className="flex flex-wrap items-center justify-center w-full max-w-6xl p-5 mx-auto ">
                <div className="flex w-full flex-col md:w-[55%] lg:w-[40%]">
                    <h1 className="mb-8 text-4xl font-bold text-center lg:text-4xl">Sign-Up</h1>
                    <form onSubmit={submitHandler}>
                        <div className='mb-2 font-semibold'>Nickname</div>
                        <Input type="text" name="nickname" value={nickname} placeholder="nickname" onChange={changeHandler} />
                        <div className='mb-2 font-semibold'>Email</div>
                        <Input type="email" name="email" value={email} placeholder="example@google.com" onChange={changeHandler} />
                        <div className='mb-2 font-semibold'>Password</div>
                        <div className="relative">
                            <Input type={showPassword ? 'text' : "password"} name="password" value={password} placeholder="password" onChange={changeHandler} />
                            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' /> : <AiFillEye onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' />}
                        </div>
                        <div className='mb-2 font-semibold'>Password Check</div>
                        <div className="relative">
                            <Input type={showPassword ? 'text' : "password"} name="passwordCheck" value={passwordCheck} placeholder="password check" onChange={changeHandler} />
                            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' /> : <AiFillEye onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-3' />}
                        </div>
                        <div className='flex justify-between text-sm whitespace-nowrap'>
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
                        <button className='w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>Sign up</button>
                        <div className='flex items-center my-3 before:border-t before:border-gray-300 before:flex-1 after:border-t after:border-gray-300 after:flex-1'>
                            <p className='mx-3 font-semibold text-center'>OR</p>
                        </div>
                        <SignInGoogle />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm