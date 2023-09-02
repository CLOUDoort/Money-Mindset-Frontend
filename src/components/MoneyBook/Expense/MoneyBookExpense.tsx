import { end_date, start_date } from "../MoneyBookNav"
import { useGetFlowData, useGetFlowList, } from "../../../react-query/Expense/ExpenseFlowData"

import ExpenseInput from './ExpenseInput'
import ExpenseItemList from "./ExpenseItemList"
import { FlowDataType } from "../../../types"
import { end_date_string } from "../MaginotLine/MoneyBookMaginotLine"
import { start_date_string } from "../MaginotLine/MoneyBookMaginotLine"
import { useState } from "react"

const MoneyBookExpense = () => {
    // 항목 데이터와 modal state
    const { data: flowItem } = useGetFlowList()
    const [flowItemList, setFlowItemList] = useState(false)
    const [showCalendar, setShowCalendar] = useState<boolean>(false)
    const clickFalse = () => {
        setShowCalendar(false)
        setFlowItemList(false)
    }
    // flow 목록
    const { data: flowData } = useGetFlowData({ start_date, end_date })
    // 수입과 지출 구분
    let income_sum = 0, outcome_sum = 0
    flowData?.data?.forEach((item: FlowDataType) => {
        if (item.flow_id <= 4) income_sum += item.amount
        else outcome_sum += item.amount
    })
    return (
        <div className="bg-white min-w-[50rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center" onClick={clickFalse}>
            <div className="flex flex-col items-center max-w-[65rem] justify-center w-full px-10 lg:px-10">
                <div className="flex flex-col w-full gap-3 mt-10 text-2xl font-semibold">
                    <div className="text-4xl">Income &#38; Outcome</div>
                    <div className="items-center">{start_date_string} ~ {end_date_string}</div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-col w-full p-10 m-10 border rounded">
                        <ExpenseInput showCalendar={showCalendar} setShowCalendar={setShowCalendar} flowItem={flowItem} setFlowItemList={setFlowItemList} flowItemList={flowItemList} />
                    </div>
                </div>
                {flowData && <ExpenseItemList data={flowData?.data} />}
                <div className='flex items-center w-full gap-3 mb-10 text-2xl font-semibold'>
                    <div className='text-start w-[50%] text-blue-500'>수입: {income_sum} 원</div>
                    <div className='text-start w-[50%] text-red-500'>지출: {outcome_sum} 원</div>
                </div>
            </div>
        </div>
    )
}

export default MoneyBookExpense