import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { accessToken, userEmail, userIdx, userNickname } from '../../../store/initialState'

import Button from '../../ButtonForm'
import Input from '../../InputForm'
import SignInGoogle from '../GoogleAuth'
import { apiInstance } from '../../../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { useState } from "react"

type FormData = {
    email: string,
    nickname: string,
    password: string,
    passwordCheck: string
}

const SignUpForm = () => {
    const setAccessToken = useSetAtom(accessToken)
    const setIdx = useSetAtom(userIdx)
    const setEmail = useSetAtom(userEmail)
    const setNickname = useSetAtom(userNickname)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const clickSubmit: SubmitHandler<FormData> = async (formValues) => {
        const { email, nickname, password, passwordCheck } = formValues
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
                    setNickname(nickname)
                    navigate('/welcome')
                }
                else toast.error("Already email existed!")
            }
            catch (e: any) {
                toast.error(e.response.data.message)
            }
        }
        else toast.error("Password does not match!")
    }
    return (
        <section className='w-full h-full pt-[5rem]'>
            <div className="flex flex-wrap items-center justify-center w-full h-full max-w-6xl px-5 mx-auto">
                <div className="flex w-full flex-col md:w-[55%] lg:w-[40%]">
                    <h1 className="mb-8 text-4xl font-bold text-center lg:text-4xl">Sign-Up</h1>
                    <form onSubmit={handleSubmit(clickSubmit)}>
                        <div className='font-semibold'>Nickname</div>
                        <Input type="text" placeholder="nickname" register={{ ...register("nickname", { required: true }) }} />
                        {errors.nickname && <span className='text-red-500'>This field is required</span>}
                        <div className='font-semibold'>Email</div>
                        <Input type="email" placeholder="example@google.com" register={{ ...register("email", { required: true }) }} />
                        {errors.email && <span className='text-red-500'>This field is required</span>}
                        <div className='font-semibold'>Password</div>
                        <div className="relative">
                            <Input type={showPassword ? 'text' : "password"} placeholder="password" register={{ ...register("password", { required: true }) }} />
                            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-5' /> : <AiFillEye onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-5' />}
                        </div>
                        {errors.password && <span className='text-red-500'>This field is required</span>}
                        <div className='font-semibold'>Password Check</div>
                        <div className="relative">
                            <Input type={showPassword ? 'text' : "password"} placeholder="password check" register={{ ...register("passwordCheck", { required: true }) }} />
                            {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-5' /> : <AiFillEye onClick={() => setShowPassword(!showPassword)} className='absolute text-xl cursor-pointer right-3 top-5' />}
                        </div>
                        {errors.passwordCheck && <span className='text-red-500'>This field is required</span>}
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
                        <Button type="submit" name="Sign up" styleProp="my-0" />
                        <div className='flex items-center my-3 before:border-t before:border-gray-300 before:flex-1 after:border-t after:border-gray-300 after:flex-1'>
                            <p className='mx-3 font-semibold text-center'>OR</p>
                        </div>
                        <SignInGoogle />
                    </form>
                </div>
            </div>
        </section >
    )
}

export default SignUpForm