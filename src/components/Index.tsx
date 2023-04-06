import { apiInstance } from "../apis/setting"
import { useEffect } from "react"

const Index = () => {
    useEffect(() => {
        const getToken = async () => {
            try {
                const tokenResponse = await apiInstance.get('/user/refresh')
                console.log('token', tokenResponse.data)
                const userData = await apiInstance.get('user/validate', {
                    headers: {
                        Authorization: 'Bearer ' + tokenResponse.data.accessToken
                    }
                })
                console.log('userData', userData.data)
            }
            catch (e: any) {
                console.error(e.response)
            }
        }
        getToken()
    }, [])
    return (
        <div>

        </div>
    )
}

export default Index