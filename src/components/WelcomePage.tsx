import { useAtomValue, useSetAtom } from "jotai"
import { userAsset, userIdx, userNickname } from "../store/initialState"

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
    const changeHandler = (e: any) => {
        setAsset(e.target.value)
    }
    const clickHandler = async () => {
        const response = await apiInstance.post(`/asset/user/${idx}`, {
            amount: Number(asset)
        })
        console.log("asset data", response.data)
        toast.success("자산 입력 성공")
        assetState(Number(asset))
        navigate("/money-book/dashboard", { replace: true })
    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="mb-10 text-5xl font-bold">WELCOME! {nickname}</div>
            <div>
                <div className="mb-2 text-xl">현재 자산 입력</div>
                <div className="flex items-center justify-center">
                    <Input type="number" min="0" name="asset" value={asset} onChange={changeHandler} ></Input>
                    <button onClick={clickHandler} className="py-2 mb-2 ml-2 text-xl font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md whitespace-nowrap px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150'">저장</button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage