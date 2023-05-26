import { usePatchGoalData, useRemoveGoalData } from "../../../../react-query/MaginotData/MaginotGoalData"

import { IoIosRemoveCircleOutline } from "react-icons/io"
import { useState } from "react"

const defaultState = {
    first: false,
    second: false,
    third: false
}

const MaginotGoalItem = ({ item }: any) => {
    const { idx, ranking, goal, amount } = item
    const [newValue, setNewValue] = useState({
        newRanking: ranking,
        newGoal: goal,
        newAmount: amount
    })
    const { newRanking, newGoal, newAmount } = newValue
    const deleteItem = useRemoveGoalData()
    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const clickState = (name: string) => {
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
    const patchFunction = usePatchGoalData(idx)
    const clickPatch = () => {
        patchFunction({
            ranking: newRanking,
            goal: newGoal,
            amount: Number(newAmount)
        })
        setState(defaultState)
    }
    return (
        <>
            <div className="relative flex items-center gap-3 p-3 mb-4 text-center transition-colors border rounded hover:bg-gray-100 group h-[74px]">
                {!first ? <div className="w-[33%] cursor-pointer" onClick={() => clickState("first")}>{ranking}</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out bg-white border-gray-400 rounded text-center h-12 px-4 py-2" type="number" value={newRanking} placeholder="우선순위" name="newRanking" onChange={handleChange}></input>}
                {!second ? <div className="w-[34%] cursor-pointer" onClick={() => clickState("second")}>{goal}</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out bg-white border-gray-400 rounded text-center h-12 px-4 py-2" type="text" value={newGoal} placeholder="우선순위" name="newGoal" onChange={handleChange}></input>}
                {!third ? <div className="w-[33%] cursor-pointer" onClick={() => clickState("third")}>{amount} 원</div> : <input required autoComplete='off' className="w-[33%] transition ease-in-out bg-white border-gray-400 rounded text-center h-12 px-4 py-2" type="number" value={newAmount} placeholder="우선순위" name="newAmount" onChange={handleChange}></input>}
                {(!first && !second && !third) && <IoIosRemoveCircleOutline onClick={() => deleteItem(idx)} size={25} className="absolute hidden cursor-pointer right-2 group-hover:block hover:text-red-500" />}
            </div>
            {(first || second || third) && <div className="flex justify-around gap-3 mb-4">
                <button type="button" onClick={() => setState(defaultState)} className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">취소</button>
                <button type="button" onClick={() => clickPatch()} className="w-full py-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">수정</button>
            </div>}
        </>
    )
}

export default MaginotGoalItem