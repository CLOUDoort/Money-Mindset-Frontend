import { finalMaginot, userIdx } from "../../../../store/initialState"
import { useAtom, useAtomValue } from "jotai"
import { useDeleteFixedData, usePatchFixedData } from "../../../../react-query/MaginotData/MaginotFixedData"

import { IoIosRemoveCircleOutline } from "react-icons/io"
import { useState } from "react"

const defaultState = {
    first: false,
    second: false,
    third: false
}

const MaginotFixedItem = ({ item }: any) => {
    const user_idx = useAtomValue(userIdx)
    const { idx, expenditure_date, fixed_expenditure, expenditure_amount } = item
    const [newValue, setNewValue] = useState({
        newExpenditure_date: expenditure_date,
        newFixed_expenditure: fixed_expenditure,
        newExpenditure_amount: expenditure_amount
    })
    const { newExpenditure_date, newFixed_expenditure, newExpenditure_amount } = newValue
    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const handleClick = (name: string) => {
        setState({
            ...state, [name]: true
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setNewValue({
            ...newValue, [name]: value
        })
    }
    const [finalLine, setFinalLine] = useAtom(finalMaginot)
    const deleteItem = useDeleteFixedData()
    const patchFunction = usePatchFixedData(idx)
    const clickPatch = () => {
        patchFunction({
            user_idx,
            fixed_expenditure: newFixed_expenditure,
            expenditure_amount: Number(newExpenditure_amount),
            expenditure_date: newExpenditure_date
        })
        setState(defaultState)
        setFinalLine(finalLine + (Number(expenditure_amount) - Number(newExpenditure_amount)))
    }
    return (
        <>
            <div className="relative flex items-center gap-3 p-3 mb-4 text-center transition-colors border rounded hover:bg-gray-100 group h-[74px]">
                {!first ? <div className="w-[33%] cursor-pointer" onClick={() => handleClick("first")}>{expenditure_date} 일</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out bg-white border-gray-400 rounded text-center h-12 px-4 py-2" type="number" value={newExpenditure_date} placeholder="지출 날짜" name="newExpenditure_date" onChange={handleChange}></input>}
                {!second ? <div className="w-[34%] cursor-pointer" onClick={() => handleClick("second")}>{fixed_expenditure}</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out bg-white border-gray-400 rounded text-center h-12 px-4 py-2" type="text" value={newFixed_expenditure} placeholder="지출 항목" name="newFixed_expenditure" onChange={handleChange}></input>}
                {!third ? <div className="w-[33%] cursor-pointer" onClick={() => handleClick("third")}>{expenditure_amount} 원</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out bg-white border-gray-400 rounded text-center h-12 px-4 py-2" type="number" value={newExpenditure_amount} placeholder="지출 금액" name="newExpenditure_amount" onChange={handleChange}></input>}
                {(!first && !second && !third) && <IoIosRemoveCircleOutline onClick={() => {
                    deleteItem(idx)
                    setFinalLine(finalLine + expenditure_amount)
                }
                } size={25} className="absolute hidden cursor-pointer right-2 group-hover:block hover:text-red-500" />}
            </div>
            {(first || second || third) && <div className="flex justify-around gap-3 mb-4">
                <button type="button" onClick={() => setState(defaultState)} className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">취소</button>
                <button type="button" onClick={() => clickPatch()} className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">수정</button>
            </div>}
        </>
    )
}

export default MaginotFixedItem