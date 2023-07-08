import { useEffect, useState } from "react"
import { usePatchDetailData, usePostDetailData } from "../../../react-query/Expense/ExpenseDetailData"

import { AiOutlineArrowRight } from "react-icons/ai"
import ExpenseMap from "./ExpenseMap"
import Input from "../../InputForm"
import { apiInstance } from "../../../apis/setting"
import { expenseLocation } from "../../../store/initialState"
import { format } from "date-fns"
import { useAtom } from "jotai"

type ItemType = {
    flow_date: string,
    flowName: string,
    amount: number,
    idx: number,
    flowDetail: {} | null
}

type DetailType = {
    detail: string,
    flow_idx: number,
    idx: number,
    lat: number,
    lng: number
}

const ExpenseItemModal = ({ clickModal, data }: { clickModal: () => void, data: ItemType }) => {
    const { flow_date, flowName, amount, idx, flowDetail } = data
    const date = format(new Date(flow_date), 'yyyy-MM-dd')
    const [position, setPosition] = useAtom(expenseLocation)
    const [detail, setDetail] = useState<DetailType>()
    console.log('data', data)
    useEffect(() => {
        const response = async () => {
            try {
                const getResponse = await apiInstance.get(`/flow/detail/${idx}`)
                setDetail(getResponse?.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        response()
    }, [idx])
    const handleChange = (e: any) => {
        if (detail) {
            setDetail({ ...detail, detail: e.target.value })
        }
    }
    const patchMutate = usePatchDetailData(idx)
    const postMutate = usePostDetailData(idx)
    const clickSubmit = async () => {
        try {
            if (detail) {
                if (!flowDetail) {
                    postMutate({ detail: detail?.detail, lat: position.lat, lng: position.lng })
                }
                else {
                    patchMutate({ detail: detail?.detail, lat: position.lat, lng: position.lng })
                }
            }
            clickModal()
            setPosition({ lat: 0, lng: 0 })
        }
        catch (e: any) {
            console.error(e)
        }
    }
    return (
        <div className="min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90 z-50 " onClick={clickModal}>
            <form onSubmit={clickSubmit} className="flex flex-col bg-white w-[40rem] border border-black rounded h-[40rem] transition-all 0.5s ease-in-out p-5" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <div className="p-3 text-2xl font-semibold text-left">{date}</div>
                    <AiOutlineArrowRight className='cursor-pointer' size={25} onClick={clickModal} />
                </div>
                <div className="flex gap-3 p-3 text-xl">
                    <div>{flowName}</div>
                    <div className="font-semibold">{amount}</div>원
                </div>
                <div className="flex flex-col gap-3 p-3 text-xl">
                    <div className="text-left">상세내용</div>
                    <Input type="text" placeholder="상세내용" value={detail?.detail} onChange={handleChange} name={detail} ></Input>
                </div>
                <div className="p-3">
                    <ExpenseMap lat={detail?.lat} lng={detail?.lng} />
                </div>
                <button className='w-full px-5 py-2 mt-5 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>저장</button>
            </form>
        </div>
    )
}

export default ExpenseItemModal