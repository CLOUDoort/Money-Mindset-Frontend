import { SubmitHandler, useForm } from "react-hook-form"
import { useDeleteFixedData, usePatchFixedData } from "../../../../react-query/MaginotData/MaginotFixedData"

import Button from "../../../ButtonForm"
import DateList from "./DateList"
import { FixedData } from "../../../../types"
import Input from "../../../InputForm"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { userIdx } from "../../../../store/initialState"

const defaultState = {
    first: false,
    second: false,
    third: false
}
type FieldValues = {
    newFixed_expenditure: string,
    newExpenditure_amount: number
}

const MaginotFixedItem = ({ item }: { item: FixedData }) => {
    const [dateList, setDateList] = useState(false)
    const handleDateList = () => setDateList(!dateList)
    const user_idx = useAtomValue(userIdx)
    const { idx, expenditure_date, fixed_expenditure, expenditure_amount } = item
    const [newExpenditureDate, setNewExpenditureDate] = useState(expenditure_date)
    const dateClick = (date: number) => {
        setNewExpenditureDate(String(date))
        setDateList(false)
    }
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            newFixed_expenditure: fixed_expenditure,
            newExpenditure_amount: expenditure_amount
        }
    })
    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const handleClick = (name: string) => {
        setState({
            ...state, [name]: true
        })
    }
    const deleteItem = useDeleteFixedData()
    const patchFunction = usePatchFixedData(idx)
    const clickPatch: SubmitHandler<FieldValues> = (FieldValues) => {
        const { newFixed_expenditure, newExpenditure_amount } = FieldValues
        patchFunction({
            user_idx,
            fixed_expenditure: newFixed_expenditure,
            expenditure_amount: newExpenditure_amount,
            expenditure_date: newExpenditureDate
        })
        setState(defaultState)
    }
    return (
        <>
            <div className="relative flex items-center gap-3 p-3 mb-4 text-center transition-colors border rounded hover:bg-gray-100 group h-[74px]">
                {!first ? <div className="w-[33%] cursor-pointer" onClick={() => handleClick("first")}>{expenditure_date} 일</div>
                    : <div className="flex items-center justify-center w-[33%] relative" onClick={(e) => e.stopPropagation()} >
                        <div className={`w-full h-12 px-4 py-3 my-2 text-center ${newExpenditureDate === expenditure_date && "text-gray-500"} whitespace-nowrap bg-white border border-gray-400 rounded cursor-pointer`} onClick={handleDateList}>{newExpenditureDate === expenditure_date ? newExpenditureDate : newExpenditureDate + ' 일'}</div>
                        {dateList && <DateList dateClick={dateClick} />}
                    </div>}
                {!second ? <div className="w-[34%] cursor-pointer" onClick={() => handleClick("second")}>{fixed_expenditure}</div>
                    : <Input register={{ ...register("newFixed_expenditure") }} styleProp="w-[34%] text-center my-0" type="text" placeholder="지출 항목" />}
                {!third ? <div className="w-[33%] cursor-pointer" onClick={() => handleClick("third")}>{expenditure_amount} 원</div>
                    : <Input register={{ ...register("newExpenditure_amount") }} styleProp="w-[33%] text-center my-0" type="number" placeholder="지출 금액" />}
                {(!first && !second && !third) && <IoIosRemoveCircleOutline onClick={() => {
                    deleteItem(idx)
                }
                } size={25} className="absolute hidden cursor-pointer right-2 group-hover:block hover:text-red-500" />}
            </div>
            {(first || second || third) && <div className="flex justify-around gap-3 mb-4">
                <Button type="button" click={() => setState(defaultState)} name="취소" styleProp="my-0" />
                <Button type="button" click={handleSubmit(clickPatch)} styleProp="my-0" name="수정" />
            </div>}
        </>
    )
}

export default MaginotFixedItem