import { useState } from "react"

const defaultState = {
    first: false,
    second: false,
    third: false
}



const ExpenseModalItem = ({ data }: any) => {
    const { flow_date, flowName, amount, idx } = data
    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const temp = new Date(flow_date)
    const getDay = (dateIn: Date) => {
        // getMonth() is zero-based
        var dd = dateIn.getDate()
        return String(dd + '일 ')
    }
    const date = getDay(temp)
    const clickState = (name: string) => {
        setState({
            ...state, [name]: true
        })
    }
    const defaultValue = {
        newDate: date,
        newName: flowName,
        newAmount: amount
    }
    const { newDate, newName, newAmount } = defaultValue
    return (
        <div className="flex flex-col">
            <div className={`flex items-center justify-center text-center border-collapse transition-colors ${!first && !second && !third && "hover:bg-gray-100"} group h-[4.6rem] whitespace-nowrap border-b border-b-zinc-500 gap-3 px-1`}>
                {!first ? <div className="w-[33%] cursor-pointer" onClick={() => clickState("first")}>{newDate}</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out border-gray-400 rounded text-center h-12 px-4 py-2" type="number" />}
                {!second ? <div className="w-[34%] cursor-pointer" onClick={() => clickState("second")} >{newName}</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out border-gray-400 rounded text-center h-12 px-4 py-2" type="text" />}
                {!third ? <div className="w-[33%] pr-5 text-right cursor-pointer" onClick={() => clickState("third")} >{amount} 원</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out border-gray-400 rounded text-center h-12 px-4 py-2" type="number" value={newAmount} />}
            </div>
            {(first || second || third) && <div className="flex justify-between w-full gap-3 my-4">
                <button type="button" onClick={() => setState(defaultState)} className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">취소</button>
                <button type="button" className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">수정</button>
            </div>}
        </div>
    )
}

export default ExpenseModalItem