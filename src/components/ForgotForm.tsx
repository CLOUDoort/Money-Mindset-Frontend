import { Link } from 'react-router-dom'
import ModifyPassword from './ModifyPassword'
import SignInGoogle from './SignIn/GoogleAuth'
import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { useState } from "react"
import { userEmail } from '../store/initialState'

const ForgotForm = () => {
    const [email, setEmail] = useState('')
    const setUserEmail = useSetAtom(userEmail)
    const [valid, setValid] = useState(false);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const verifyEmail = await apiInstance.post(`user/email`, {
                email
            })
            setUserEmail(email)
            if (verifyEmail.data.isExisted) {
                setValid(true);
                toast.success("Success!")
            }
            else {
                toast.error("No email")
            }
        } catch (e: any) {
            console.log(e.response)
        }
    }
    return (
        <section className='flex items-center justify-center w-full h-full'>
            {
                !valid ? <div className="flex flex-wrap items-center justify-center w-full max-w-6xl px-6 py-12 mx-auto ">
                    <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                        <img src="/MoneyMindsetLogo.svg" alt="logo" className="w-full rounded-2xl" />
                    </div>
                    <div className="flex w-full flex-col md:w-[67%] lg:w-[40%] ml-0 lg:ml-20">
                        <h1 className="mb-10 font-bold text-center lg:text-5xl">Forgot</h1>
                        <form onSubmit={submitHandler}>
                            <div className='mb-2 text-lg font-semibold'>Email</div>
                            <input autoComplete='off' className="w-full px-4 py-2 mb-6 text-xl transition ease-in-out bg-white border-gray-400 rounded" type="email" name="email" value={email} placeholder="example@google.com" onChange={changeHandler} />
                            <div className='flex justify-between text-sm whitespace-nowrap sm:text-lg'>
                                <p className='mb-6'>
                                    Don't have a account?
                                    <Link className='ml-1 text-red-600 transition ease-in-out hover:text-red-700 duration 150' to="/sign-up">
                                        Register
                                    </Link>
                                </p>
                                <p className='text-blue-600 transition ease-in-out hover:text-blue-700 duration 150'>
                                    <Link to="/sign-in">Sign in</Link>
                                </p>
                            </div>
                            <button className='w-full py-3 text-lg font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>check email</button>
                            <div className='flex items-center my-4 before:border-t before:border-gray-300 before:flex-1 after:border-t after:border-gray-300 after:flex-1'>
                                <p className='mx-4 font-semibold text-center'>OR</p>
                            </div>
                            <SignInGoogle />
                        </form>
                    </div>
                </div> : <ModifyPassword />
            }

        </section>
    )
}

export default ForgotForm