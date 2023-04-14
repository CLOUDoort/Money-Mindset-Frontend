import ModifyPassword from "../ModifyPassword"
import { useState } from "react"
import { BsSun } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'

const MoneyBookSetting = () => {
    const [modify, setModify] = useState(false)
    const clickModifyPassword = () => setModify(!modify)
    return (
        <>{modify ? <ModifyPassword /> :
            <>
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
            </>
        }
        </>
    )
}

export default MoneyBookSetting