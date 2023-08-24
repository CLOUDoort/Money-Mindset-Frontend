import { CgMathMinus, CgMathPlus } from "react-icons/cg"
import { useCallback, useState } from "react"
import { useGetFlowList, usePatchFlow } from "../../../react-query/Expense/ExpenseFlowData"

import { Calendar } from "react-date-range"
import ko from "date-fns/locale/ko"
import { FLOW_DATA } from "../../../types"

const defaultState = {
    first: false,
    second: false,
    third: false
}

const ExpenseModalItem = ({ data }: any) => {
    const { flow_date, flowName, flow_id, amount, idx } = data

    const { data: flowListData } = useGetFlowList()
    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const clickState = (name: string) => {
        setState({
            ...state, [name]: true
        })
    }

    const getDay = (dateIn: Date) => {
        var dd = dateIn.getDate()
        return String(dd + '일 ')
    }

    const temp = new Date(flow_date)
    const [curDate, setCurDate] = useState(temp)
    const defaultValue = {
        new_date: temp.toISOString().slice(0, 10).replace(/-/g, '-'),
        new_id: flow_id,
        new_amount: amount
    }
    const [newValue, setNewValue] = useState(defaultValue)
    const { new_date, new_id, new_amount } = newValue
    const [showCalendar, setShowCalendar] = useState(false)
    const onChangeDate = useCallback((date: Date): void | undefined => {
        if (!date) return
        console.log("data", date)
        const ISO_DATE = date.toLocaleString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
        setCurDate(date)
        setNewValue({ ...newValue, new_date: ISO_DATE })
        setShowCalendar(false)
    }, [newValue])

    const [flowList, setFlowList] = useState(false)
    const [newFlowName, setNewFlowName] = useState(flowName)
    const handleFlowList = () => setFlowList(!flowList)
    const flowClick = (id: number, name: string) => {
        setNewValue({
            ...newValue, new_id: id
        })
        setNewFlowName(name)
        setFlowList(false)
    }
    const clickFalse = () => {
        setShowCalendar(false)
        setFlowList(false)
    }
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setNewValue({
            ...newValue, [name]: value
        })
    }
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
            <div className={`flex items-center justify-center text-center border-collapse transition-colors ${!first && !second && !third && "hover:bg-gray-100"} group h-[4.6rem] whitespace-nowrap border-b border-b-zinc-500 gap-3 px-1`}>
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
                    {!second ? <div className="w-full cursor-pointer" onClick={() => clickState("second")} >{flowName}</div> : <div className={`w-full h-12 py-3 text-center whitespace-nowrap transition ease-in-out bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                        handleFlowList()
                        setShowCalendar(false)
                    }}>{newFlowName}</div>}
                    {flowList && <div className="absolute z-40 h-60 p-2 overflow-y-scroll transition-all 0.5s bg-white border left-0 top-16 w-full rounded">
                        {flowListData?.data.map((item: FLOW_DATA) => (
                            <div className="p-2 transition-colors rounded cursor-pointer hover:bg-gray-200" onClick={() => flowClick(item.id, item.name)} key={item.id}>
                                <div className="flex items-center gap-2">
                                    {item.id > 4 ? <CgMathMinus /> : <CgMathPlus />}
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>

                <div className="flex items-center justify-center w-[33%] relative">
                    {!third ? <div className="w-full pr-5 text-right cursor-pointer" onClick={() => clickState("third")} >{amount} 원</div> : <input required autoComplete='off' className="w-full h-12 px-4 py-2 text-center transition ease-in-out border-gray-400 rounded" type="number" value={new_amount} onChange={handleChange} name="new_amount" />}
                </div>

            </div>
            {(first || second || third) && <div className="flex justify-between w-full gap-3 px-2 my-4">
                <button type="button" onClick={() => {
                    setState(defaultState)
                    setNewValue(defaultValue)
                    setNewFlowName(flowName)
                    setCurDate(temp)
                    clickFalse()
                }
                } className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">취소</button>
                <button type="button" className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150" onClick={() => clickPatch()}>수정</button>
            </div>}
        </div>
    )
}

export default ExpenseModalItem