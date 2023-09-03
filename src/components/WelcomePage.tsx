import { useAtomValue, useSetAtom } from "jotai"
import { userAsset, userIdx, userNickname } from "../store/initialState"

import Button from "./ButtonForm"
import Input from "./InputForm"
import { apiInstance } from "../apis/setting"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { useState } from "react"

const WelcomePage = () => {
    const [asset, setAsset] = useState("")
    const assetState = useSetAtom(userAsset)
    const idx = useAtomValue(userIdx)
    const nickname = useAtomValue(userNickname)
    const navigate = useNavigate()
    const changeHandler = (e: any) => setAsset(e.target.value)
    const clickHandler = async (e: any) => {
        e.preventDefault()
        try {
            const response = await apiInstance.post(`/asset/user/${idx}`, {
                amount: Number(asset)
            })
            toast.success("자산 입력 성공")
            assetState(Number(asset))
            navigate("/money-book/dashboard", { replace: true })
        }
        catch (e: any) {
            console.error(e)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="mb-10 text-5xl font-bold">WELCOME! {nickname}</div>
            <form>
                <div className="mb-2 text-xl font-semibold">현재 자산 입력</div>
                <div className="flex flex-col items-center justify-center">
                    <Input type="number" min="0" name="asset" value={asset} onChange={changeHandler} ></Input>
                    <Button click={clickHandler} name="저장" type="submit" styleProp="w-full text-xl whitespace-nowrap" />
                </div>
            </form>
        </div>
    )
}

export default WelcomePage