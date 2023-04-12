import Input from './InputForm'
import { Link } from 'react-router-dom'
import ModifyPassword from './ModifyPassword'
import SignInGoogle from './Authentication/GoogleAuth'
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
                !valid ? <div className="flex flex-wrap items-center justify-center w-full max-w-6xl p-5 mx-auto">
                    <div className="flex w-full flex-col md:w-[67%] lg:w-[40%]">
                        <h1 className="mb-8 text-4xl font-bold text-center lg:text-4xl">Forgot</h1>
                        <form onSubmit={submitHandler}>
                            <div className='mb-2 font-semibold'>Email</div>
                            <Input type="email" name="email" value={email} placeholder="example@google.com" onChange={changeHandler} />
                            <div className='flex justify-between text-sm whitespace-nowrap'>
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
                            <button className='w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>check email</button>
                            <div className='flex items-center my-3 before:border-t before:border-gray-300 before:flex-1 after:border-t after:border-gray-300 after:flex-1'>
                                <p className='mx-3 font-semibold text-center'>OR</p>
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