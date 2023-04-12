import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { userEmail } from '../store/initialState'
import Input from './InputForm'

const ModifyPassword = () => {
    const navigate = useNavigate()
    const email = useAtomValue(userEmail)
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
                const submitResponse = await apiInstance.post(`/user/forget`, {
                    email, changedPw: password
                })
                console.log('submit', submitResponse.data)
                toast("Modify Success! Retry Login")
                navigate('/')
            }
        } catch (e: any) {
            toast.error(e.response.data.message)
        }

    }
    return (
        <section className='flex items-center justify-center w-full h-full'>
            <div className="flex flex-wrap items-center justify-center w-full max-w-6xl mx-auto ">
                <div className="flex w-full flex-col md:w-[67%] lg:w-[40%]">
                    <h1 className="mb-8 text-4xl font-bold text-center lg:text-4xl">Modify Password</h1>
                    <form onSubmit={submitHandler}>
                        <div className='mb-2 font-semibold'>Password</div>
                        <Input type="password" name="password" value={password} placeholder="password" onChange={changeHandler} />
                        <div className='mb-2 font-semibold'>Password Check</div>
                        <Input type="password" name="checkPassword" value={checkPassword} placeholder="password check" onChange={changeHandler} />
                        <button className='w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>Modify</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ModifyPassword