import { useCallback, useState } from "react"
import { useGetFlowList, usePatchFlow } from "../../../react-query/Expense/ExpenseFlowData"

import Button from "../../ButtonForm"
import { Calendar } from "react-date-range"
import { FlowDataType } from "../../../types"
import FlowList from "./FlowList"
import Input from "../../InputForm"
import ko from "date-fns/locale/ko"

const defaultState = {
    first: false,
    second: false,
    third: false
}

const ExpenseModalItem = ({ data }: { data: FlowDataType }) => {
    const { flow_date, flowName, flow_id, amount, idx } = data

    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const clickState = (name: string) => {
        setState({
            ...state, [name]: true
        })
    }

    const getDay = (dateIn: Date) => String(dateIn.getDate() + '일 ')
    const temp = new Date(flow_date)
    const [curDate, setCurDate] = useState(temp)

    const defaultValue = {
        new_date: temp.toISOString().slice(0, 10).replace(/-/g, '-'),
        new_id: flow_id,
        new_amount: amount
    }
    const [newValue, setNewValue] = useState(defaultValue)
    const { new_date, new_id, new_amount } = newValue

    // 캘린더
    const [showCalendar, setShowCalendar] = useState(false)
    const onChangeDate = useCallback((date: Date): void | undefined => {
        if (!date) return
        const ISO_DATE = date.toLocaleString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
        setCurDate(date)
        setNewValue({ ...newValue, new_date: ISO_DATE })
        setShowCalendar(false)
    }, [newValue])

    // 항목
    const { data: flowListData } = useGetFlowList()
    const [flowList, setFlowList] = useState(false)
    const [newFlowName, setNewFlowName] = useState(flowName)
    const flowClick = (id: number, name: string) => {
        setNewValue({
            ...newValue, new_id: id
        })
        setNewFlowName(name)
        setFlowList(false)
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setNewValue({
            ...newValue, [name]: value
        })
    }

    // 취소
    const clickFalse = () => {
        setShowCalendar(false)
        setFlowList(false)
        setState(defaultState)
        setNewValue(defaultValue)
        setNewFlowName(flowName)
        setCurDate(temp)
    }
    // 수정
    const patchFunction = usePatchFlow(idx)
    const clickPatch = () => {
        patchFunction({
            flow_id: new_id,
            amount: Number(new_amount),
            flow_date: new_date
        })
        setState(defaultState)
    }
    return (
        <div className="flex flex-col">
            <div className={`flex items-center px-14 justify-center text-center border-collapse transition-colors ${!first && !second && !third && "hover:bg-gray-100"} group h-[4.6rem] whitespace-nowrap border-b border-b-zinc-500 gap-3 px-1`}>
                {/* 날짜 */}
                <div className="w-[33%] cursor-pointer relative">
                    {showCalendar && (
                        <Calendar className="absolute left-0 z-40 top-16" locale={ko} months={1} date={curDate} onChange={onChangeDate} dateDisplayFormat={'yyyy.mm.dd'} />
                    )}
                    {!first ? <div className="w-full cursor-pointer" onClick={() => clickState("first")}>{getDay(temp)}</div> : <div className={`w-full h-12 py-3 text-center whitespace-nowrap transition ease-in-out bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                        setShowCalendar(!showCalendar)
                        setFlowList(false)
                    }}>{getDay(curDate)}</div>}
                </div>

                {/* 항목 */}
                <div className="flex items-center justify-center w-[34%] relative">
                    {!second ?
                        <div className="w-full cursor-pointer" onClick={() => clickState("second")} >{flowName}</div>
                        : <div className={`w-full h-12 py-3 text-center whitespace-nowrap transition ease-in-out bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                            setFlowList(!flowList)
                            setShowCalendar(false)
                        }}>{newFlowName}</div>}
                    {flowList && <FlowList item={flowListData} flowClick={flowClick} />}
                </div>

                {/* 금액 */}
                <div className="flex items-center justify-center w-[33%] relative">
                    {!third ? <div className="w-full text-center cursor-pointer" onClick={() => clickState("third")} >{amount} 원</div> : <Input type="number" styleProp="my-0 mb-0 text-center" value={new_amount} onChange={handleChange} name="new_amount" />}
                </div>
            </div>
            {(first || second || third) && <div className="flex justify-between w-full gap-3 px-2 my-4">
                <Button type="button" name="취소" click={clickFalse} />
                <Button type="button" name="수정" click={() => clickPatch()} />
            </div>}
        </div>
    )
}

export default ExpenseModalItem