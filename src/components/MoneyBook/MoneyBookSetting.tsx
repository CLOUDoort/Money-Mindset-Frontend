import { BsSun } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import ModifyPassword from "../ModifyPassword"
import { useState } from "react"
import { useAtomValue } from 'jotai'
import { userIdx } from '../../store/initialState'
import { apiInstance } from '../../apis/setting'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import ExpenseItemSkeleton from './Expense/ExpenseItemSkeleton'

const MoneyBookSetting = () => {
    const [modify, setModify] = useState(false)
    const idx = useAtomValue(userIdx)
    const navigate = useNavigate()
    const clickModifyPassword = () => setModify(!modify)
    const deleteUser = async () => {
        try {
            console.log('idx', idx)
            const clickResponse = await apiInstance.delete(`/user/${idx}`)
            console.log('click', clickResponse)
            toast.success("탈퇴 성공")
            navigate('/')
        }
        catch (e: any) {
            console.log(e.response)
        }

    }
    return (
        <>{modify ? <ModifyPassword /> :
            <div className='flex-1 lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[35rem]'>
                <div className='flex flex-col items-center justify-center lg:w-[75%] max-w-[70rem] w-[80%] lg:p-5'>
                    <div>
                        setting
                        <button className="border" onClick={clickModifyPassword}>Modify password</button>
                    </div>
                    <div>
                        <span className="cursor-pointer">
                            <BsSun size={35} />
                        </span>
                        <span className="cursor-pointer">
                            <IoIosNotificationsOutline size={35} />
                        </span>
                    </div>
                </div>
                <div>
                    <button onClick={deleteUser} className='text-3xl text-red-600'>회원탈퇴</button>
                </div>
            </div>
        }
            <ExpenseItemSkeleton />
        </>
    )
}

export default MoneyBookSetting