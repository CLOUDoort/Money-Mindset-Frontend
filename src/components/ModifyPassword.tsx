import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

import OAuth from '../components/OAuth'
import { accessToken } from '../store/initialState'
import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useSetAtom } from 'jotai'
import { useState } from "react"

const ModifyPassword = () => {
    const navigate = useNavigate()
    const setToken = useSetAtom(accessToken)
    const [formData, setFormData] = useState({
        password: "",
        checkPassword: ""
    })
    const { password, checkPassword } = formData
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            if (password === checkPassword) {
                const submitResponse = await apiInstance.patch(`/user/signin`, {
                    password, checkPassword
                })
                toast("Modify Success!")
                navigate('/')
                setToken(submitResponse.data.accessToken)
            }
        } catch (e: any) {
            toast.error(e.response.data.message)
        }

    }
    return (
        <section className='flex justify-center items-center w-full h-full'>
            <div className="flex w-full justify-center flex-wrap items-center px-6 py-12 max-w-7xl mx-auto ">
                <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="/MoneyMindsetLogo.png" alt="logo" className="w-full rounded-2xl" />
                </div>
                <div className="flex w-full flex-col md:w-[67%] lg:w-[40%] ml-0 lg:ml-20">
                    <h1 className="text-5xl lg:text-6xl text-center mb-14 font-bold">Modify Password</h1>
                    <form onSubmit={submitHandler}>
                        <div className='text-lg mb-2 font-semibold'>Password</div>
                        <input autoComplete='off' className="w-full mb-6 px-4 py-2 text-xl bg-white border-gray-400 rounded transition ease-in-out" type="email" name="email" value={password} placeholder="example@google.com" onChange={changeHandler} />
                        <div className='text-lg mb-2 font-semibold'>Password Check</div>
                        <div className="relative mb-6">
                            <input className="w-full px-4 py-2 text-xl bg-white border-gray-400 rounded transition ease-in-out" type={"password"} name="password" value={checkPassword} placeholder="password" onChange={changeHandler} />
                        </div>
                        <button className='w-full uppercase bg-blue-600 text-white px-7 py-3 text-lg font-semibold rounded hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition duration 150' type='submit'>Modify</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ModifyPassword