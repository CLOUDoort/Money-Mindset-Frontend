import { accessToken, userEmail, userIdx } from "../../store/initialState"
import { useAtom, useAtomValue } from "jotai"

import { apiInstance } from "../../apis/setting"
import { useEffect } from "react"

const MoneyBookDashboard = () => {
    const [idx, setIdx] = useAtom(userIdx)
    const [email, setEmail] = useAtom(userEmail)
    const token = useAtomValue(accessToken)
    useEffect(() => {
        const getToken = async () => {
            try {
                const userData = await apiInstance.get('user/validate', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                const { idx, email } = userData.data
                setIdx(idx);
                setEmail(email)
            }
            catch (e: any) {
                console.error(e.response)
            }
        }
        getToken()
    }, [setEmail, setIdx, token])
    return (
        <div>
            dashboard
            idx = {idx}
            token = {token}
            email = {email}
        </div>
    )
}

export default MoneyBookDashboard