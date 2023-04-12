import ModifyPassword from "../ModifyPassword"
import { useState } from "react"

const MoneyBookSetting = () => {
    const [modify, setModify] = useState(false)
    const clickModifyPassword = () => setModify(!modify)
    return (
        <>{modify ? <ModifyPassword /> :
            <><div>
                setting
            </div>
                <button onClick={clickModifyPassword}>Modify password</button></>
        }
        </>
    )
}

export default MoneyBookSetting