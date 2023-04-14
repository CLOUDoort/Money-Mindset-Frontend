import { accessToken } from "../store/initialState"
import { useAtomValue } from "jotai"

const Index = () => {
    const token = useAtomValue(accessToken)
    return (
        <div>
            token: {token}
        </div>
    )
}

export default Index