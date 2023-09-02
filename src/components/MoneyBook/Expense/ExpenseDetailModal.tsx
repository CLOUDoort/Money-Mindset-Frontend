import { usePatchDetailData, usePostDetailData } from "../../../react-query/Expense/ExpenseDetailData"

import { AiOutlineArrowRight } from "react-icons/ai"
import Button from "../../ButtonForm"
import ExpenseMap from "./ExpenseMap"
import { FlowDataType } from "../../../types"
import Input from "../../InputForm"
import { expenseLocation } from "../../../store/initialState"
import { format } from "date-fns"
import { useAtom } from "jotai"
import { useState } from "react"

const ExpenseDetailModal = ({ clickModal, data }: { clickModal: () => void, data: FlowDataType }) => {
    const { flow_date, flowName, amount, idx, flowDetail } = data
    const date = format(new Date(flow_date), 'yyyy-MM-dd')
    const [position, setPosition] = useAtom(expenseLocation)
    const [detail, setDetail] = useState(flowDetail?.detail ? flowDetail?.detail : "")
    const handleChange = (e: any) => setDetail(e.target.value)
    const patchMutate = usePatchDetailData(idx)
    const postMutate = usePostDetailData(idx)
    const clickSubmit = () => {
        try {
            if (flowDetail) patchMutate({ detail: detail, lat: position.lat, lng: position.lng })
            else postMutate({ detail: detail, lat: position.lat, lng: position.lng })
            clickModal()
            setPosition({ lat: 0, lng: 0 })
        }
        catch (e: any) {
            console.error(e)
        }
    }
    return (
        <div className="bg-white min-w-[50rem] lg:ml-[6rem] m-auto flex justify-center items-center flex-col fixed top-0 left-0 w-full h-full bg-opacity-90 z-50" onClick={clickModal}>
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
                    <Input type="text" placeholder="상세내용" value={detail} onChange={handleChange} name={detail} ></Input>
                </div>
                <ExpenseMap lat={flowDetail?.lat} lng={flowDetail?.lng} />
                <Button type="submit" name="저장" />
            </form>
        </div>
    )
}

export default ExpenseDetailModal