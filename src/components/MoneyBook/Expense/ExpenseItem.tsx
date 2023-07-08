import { BsFileEarmarkPlus, BsFileEarmarkPlusFill } from "react-icons/bs"

import ExpenseDetailModal from "./ExpenseDetailModal"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { useDeleteFlow } from "../../../react-query/Expense/ExpenseFlowData"
import { useState } from "react"

const ExpenseItem = ({ data }: any) => {
    const { flow_date, flowName, amount, idx } = data
    const temp = new Date(flow_date)
    const getDay = (dateIn: Date) => {
        // getMonth() is zero-based
        var dd = dateIn.getDate()
        return String(dd + '일 ')
    }
    const date = getDay(temp)
    const deleteItem = useDeleteFlow()
    const [modal, setModal] = useState(false);
    const clickModal = () => setModal(!modal)
    return (
        <div className="relative flex items-center text-center border-collapse transition-colors hover:bg-gray-100 group h-[4.6rem] whitespace-nowrap border-b border-b-zinc-500">
            <div className="flex w-full gap-3 px-5 group">
                <div className="w-10">{date}</div>
                <div className="w-16"> {flowName}</div>
                {data?.flowDetail ? <BsFileEarmarkPlusFill size={25} onClick={clickModal} className="cursor-pointer" /> : <BsFileEarmarkPlus size={25} onClick={clickModal} className="cursor-pointer" />}
                {modal && <ExpenseDetailModal clickModal={clickModal} data={data} />}
                <div className="flex-1 pr-5 text-right">{amount} 원</div>
                <IoIosRemoveCircleOutline onClick={() => deleteItem(idx)} size={25} className="absolute hidden transition-colors cursor-pointer right-2 group-hover:block hover:text-red-500" />
            </div>
        </div>
    )
}

export default ExpenseItem