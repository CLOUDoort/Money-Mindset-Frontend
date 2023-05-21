import { BsSun } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import ModifyPassword from "../ModifyPassword"
import { useState } from "react"

const MoneyBookSetting = () => {
    const [modify, setModify] = useState(false)
    const clickModifyPassword = () => setModify(!modify)
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
            </div>
        }
        </>
    )
}

export default MoneyBookSetting