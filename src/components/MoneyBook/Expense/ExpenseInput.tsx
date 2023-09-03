import { useCallback, useState } from "react"

import { AxiosResponse } from "axios"
import Button from "../../ButtonForm"
import { Calendar } from "react-date-range"
import FlowList from "./FlowList"
import { endOfDay } from "date-fns/esm"
import { formatISO } from "date-fns"
import ko from "date-fns/locale/ko"
import moment from "moment"
import { toast } from "react-toastify"
import { usePostFlow } from "../../../react-query/Expense/ExpenseFlowData"

type Props = {
    showCalendar: boolean,
    setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>,
    flowItemList: boolean,
    setFlowItemList: React.Dispatch<React.SetStateAction<boolean>>,
    flowItem: AxiosResponse<any, any> | undefined
}
const defaultValue = {
    flow_id: 0,
    amount: "",
    flow_date: ""
}
const today = moment().toDate()

const ExpenseInput = ({ showCalendar, setShowCalendar, flowItemList, setFlowItemList, flowItem }: Props) => {
    const [flow, setFlow] = useState(defaultValue)
    const { flow_id, amount, flow_date } = flow
    const [date, setDate] = useState<Date>(today)
    const [flowName, setFlowName] = useState("선택")
    const onChangeDate = useCallback((date: Date): void | undefined => {
        if (!date) return
        setDate(date)
        setFlow({ ...flow, flow_date: formatISO(endOfDay(date), { representation: 'date' }) })
        setShowCalendar(false)
    }, [flow, setShowCalendar])
    const flowClick = (id: number, name: string) => {
        setFlow({
            ...flow, flow_id: id
        })
        setFlowName(name)
        setFlowItemList(false)
    }
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
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="flex items-center mb-2 text-2xl font-semibold">
                    <span>수입 - 지출</span>
                </div>
                <div className="flex py-3 my-1 text-center">
                    <div className="w-[33%]">날짜</div>
                    <div className="w-[34%]">사용내역</div>
                    <div className="w-[33%] pl-3">금액(원)</div>
                </div>
                <div className="flex flex-col">
                    <div className="relative flex items-center justify-center gap-3">
                        {/* 달력 */}
                        <div className="w-[33%]" onClick={(e) => e.stopPropagation()}>
                            {showCalendar && (
                                <Calendar className="absolute z-50 rounded top-16" locale={ko} months={1} date={date} onChange={onChangeDate} dateDisplayFormat={'yyyy.mm.dd'} />
                            )}
                            <div className={`w-full h-12 px-4 py-3 mt-2 mb-4 text-center ${date === today && "text-gray-500"} whitespace-nowrap bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                                setFlowItemList(false)
                                setShowCalendar(!showCalendar)
                            }}>{date.toLocaleDateString()}</div>
                        </div>
                        {/* 항목 */}
                        <div className="w-[34%] relative" onClick={(e) => e.stopPropagation()} >
                            <div className={`w-full h-12 px-4 py-3 mt-2 mb-4 text-center ${flowName === "선택" && "text-gray-500"} whitespace-nowrap bg-white border border-gray-400 rounded cursor-pointer`} onClick={() => {
                                setFlowItemList(!flowItemList)
                                setShowCalendar(false)
                            }}>{flowName}</div>
                            {flowItemList && <FlowList item={flowItem} flowClick={flowClick} />}
                        </div>
                        {/* 금액 */}
                        <div className="w-[33%]">
                            <input type="number" className="w-full h-12 px-4 py-2 mb-2 text-center transition ease-in-out bg-white border-gray-400 rounded" value={amount} name="amount" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFlow({ ...flow, [e.target.name]: e.target.value })} placeholder="금액" />
                        </div>
                    </div>
                    <Button type="submit" name="저장" />
                </div>
            </div>
        </form>
    )
}

export default ExpenseInput