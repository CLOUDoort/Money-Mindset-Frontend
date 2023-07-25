import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { userEmail } from '../store/initialState'
import Input from './InputForm'
import { SubmitHandler, useForm } from 'react-hook-form'

type FieldsValues = {
    password: string,
    checkPassword: string
}

const ModifyPassword = ({ close }: { close: () => void }) => {
    const navigate = useNavigate()
    const email = useAtomValue(userEmail)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldsValues>()
    const submitHandler: SubmitHandler<FieldsValues> = async (FieldsValues) => {
        const { password, checkPassword } = FieldsValues
        try {
            if (password === checkPassword) {
                const submitResponse = await apiInstance.post(`/user/forget`, {
                    email, changedPw: password
                })
                console.log('submit', submitResponse.data)
                toast("Modify Success!")
                navigate('/money-book/dashboard')
            }
            else toast.error("확인 비밀번호가 다릅니다!")
        } catch (e: any) {
            toast.error(e.response.data.message)
        }
    }
    return (
        <section className='flex items-center justify-center w-full h-full'>
            <div className="flex flex-wrap items-center justify-center w-full max-w-6xl mx-auto ">
                <div className="flex w-full flex-col md:w-[67%] lg:w-[40%]">
                    <h1 className="mb-8 text-4xl font-bold text-center lg:text-4xl">Modify Password</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className='my-1 font-semibold'>Password</div>
                        <Input type="password" placeholder="password" register={{ ...register("password", { required: true }) }} />
                        {errors.password && <span className='text-red-500'>This field is required</span>}
                        <div className='my-1 font-semibold'>Password Check</div>
                        <Input type="password" placeholder="password check" register={{ ...register("checkPassword", { required: true }) }} />
                        {errors.checkPassword && <span className='-mt-10 text-red-500 '>This field is required</span>}
                        <div className='flex gap-3 mt-3'>
                            <button className='w-full py-3 font-semibold text-white uppercase transition bg-red-600 rounded shadow-md px-7 hover:bg-red-700 active:bg-red-800 hover:shadow-lg duration 150' type='button' onClick={close}>Cancel</button>
                            <button className='w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>Modify</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ModifyPassword