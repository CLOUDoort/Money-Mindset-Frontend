import { SubmitHandler, useForm } from 'react-hook-form'

import Button from './ButtonForm'
import Input from './InputForm'
import { apiInstance } from '../apis/setting'
import { toast } from 'react-toastify'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { userEmail } from '../store/initialState'

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
                        {errors.checkPassword && <span className='-mt-10 text-red-500'>This field is required</span>}
                        <div className='flex gap-3 mt-3'>
                            <Button type="button" styleProp="bg-red-600 hover:bg-red-700 active:bg-red-800" click={close} name="Cancel" />
                            <Button type="submit" name="Modify" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ModifyPassword