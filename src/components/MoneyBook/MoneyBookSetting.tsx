import ModifyPassword from "../ModifyPassword"
import { apiInstance } from '../../apis/setting'
import { toast } from 'react-toastify'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router'
import { useState } from "react"
import { userIdx } from '../../store/initialState'

const MoneyBookSetting = () => {
    const [modify, setModify] = useState(false)
    const idx = useAtomValue(userIdx)
    const navigate = useNavigate()
    const clickModifyPassword = () => setModify(!modify)
    const deleteUser = async () => {
        try {
            if (window.confirm("탈퇴하시겠습니까?")) {
                const clickResponse = await apiInstance.delete(`/user/${idx}`)
                toast.success("탈퇴 성공")
                navigate('/')
            }
        }
        catch (e: any) {
            console.log(e.response)
        }

    }
    return (
        <div className='bg-white min-w-[45rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center h-full'>
            {!modify ?
                <div className='flex flex-col items-center justify-center w-full h-full px-10 lg:px-5'>
                    <div className="flex items-center justify-center w-full gap-3 mt-10 text-4xl font-semibold">
                        Setting
                    </div>
                    <div className='flex w-[30rem] gap-10 justify-center items-start'>
                        <div className='flex flex-col justify-center gap-3 mt-10 font-semibold w-44'>
                            <div className='text-2xl'>비밀번호 변경</div>
                            <button className="py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150" onClick={clickModifyPassword}>Modify</button>
                        </div>
                        <div className='flex flex-col justify-center gap-3 mt-10 font-semibold w-44'>
                            <div className='text-2xl'>회원탈퇴</div>
                            <button className="py-3 font-semibold text-white uppercase transition bg-red-600 rounded shadow-md px-7 hover:bg-red-700 active:bg-red-800 hover:shadow-lg duration 150" onClick={deleteUser}>회원탈퇴</button>
                        </div>
                    </div>
                </div>
                : <ModifyPassword close={clickModifyPassword} />}
        </div>
    )
}

export default MoneyBookSetting