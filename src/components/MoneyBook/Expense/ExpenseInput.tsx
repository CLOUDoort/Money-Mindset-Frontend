import { CgMathMinus, CgMathPlus } from "react-icons/cg"
import { useCallback, useState } from "react"

import { Calendar } from "react-date-range"
import Input from "../../InputForm"
import ko from "date-fns/locale/ko"
import moment from "moment"
import { toast } from "react-toastify"
import { usePostFlow } from "../../../react-query/Expense/ExpenseFlowData"

const defaultValue = {
    flow_id: 0,
    amount: "",
    flow_date: ""
}
export type FLOW_DATA = {
    id: number,
    type: string,
    name: string,
}
const today = moment().toDate()

const ExpenseInput = ({ showCalendar, setShowCalendar, handleFlowList, data, setFlowList, flowList }: any) => {
    const [flow, setFlow] = useState(defaultValue)
    const [date, setDate] = useState<Date>(today)
    const [flowName, setFlowName] = useState("선택")
    const { flow_id, amount, flow_date } = flow
    const onChangeDate = useCallback((date: Date): void | undefined => {
        if (!date) return
        const ISO_DATE = date.toLocaleString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
        setDate(date)
        setFlow({ ...flow, flow_date: ISO_DATE })
        setShowCalendar(false)
    }, [flow, setShowCalendar])

    const mutate = usePostFlow()
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            if (!flow_id || !amount || !flow_date) {
                toast.error('항목을 모두 채워주세요!')
                return
            }
            mutate({ flow_id, amount: Number(amount), flow_date })
            setFlow(defaultValue)
            setDate(today)
            setFlowName("선택")
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    const flowClick = (id: number, name: string) => {
        setFlow({
            ...flow, flow_id: id
        })
        setFlowName(name)
        setFlowList(false)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setFlow({
            ...flow, [name]: value
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="flex py-3 my-1 text-center">
                    <div className="w-[33%] pl-3">날짜</div>
                    <div className="w-[34%]">사용내역</div>
                    <div className="w-[33%] pl-3">금액(원)</div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="relative flex items-center justify-center gap-3">
                    <div className="w-[33%]" onClick={(e) => e.stopPropagation()}>
                        {showCalendar && (
                            <Calendar className="absolute top-16" locale={ko} months={1} date={date} onChange={onChangeDate} dateDisplayFormat={'yyyy.mm.dd'} />
                        )}
                        <div className={`w-full h-12 px-4 py-3 mt-2 mb-4 text-center ${date === today && "text-gray-500"} whitespace-nowrap transition ease-in-out bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                            setShowCalendar(!showCalendar)
                            setFlowList(false)
                        }}>{date.toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center justify-center w-[34%] relative" onClick={(e) => e.stopPropagation()} >
                        <div className={`w-full h-12 px-4 py-3 mt-2 mb-4 text-center ${flowName === "선택" && "text-gray-500"} transition whitespace-nowrap ease-in-out bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                            handleFlowList()
                            setShowCalendar(false)
                        }}>{flowName}</div>
                        {flowList && <div className="absolute z-40 h-60 p-2 overflow-y-scroll transition-all 0.5s bg-white border left-0 top-16 w-full rounded">
                            {data?.data.map((item: FLOW_DATA) => (
                                <div className="p-2 transition-colors rounded cursor-pointer hover:bg-gray-200" onClick={() => flowClick(item.id, item.name)} key={item.id}>
                                    <div className="flex items-center gap-2">
                                        {item.id > 4 ? <CgMathMinus /> : <CgMathPlus />}
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                    <div className="w-[33%]">
                        <Input type="number" value={amount} name="amount" onChange={handleChange} placeholder="금액" />
                    </div>
                </div>
                <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
            </div>
        </form>
    )
}

export default ExpenseInput