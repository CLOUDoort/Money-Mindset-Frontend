import { SubmitHandler, useForm } from "react-hook-form"
import { usePatchGoalData, useRemoveGoalData } from "../../../../react-query/MaginotData/MaginotGoalData"

import Button from "../../../ButtonForm"
import { GoalData } from "../../../../types"
import Input from "../../../InputForm"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { useState } from "react"

const defaultState = {
    first: false,
    second: false,
    third: false
}

type FieldValues = {
    newRanking: number,
    newGoal: string,
    newAmount: number
}

const MaginotGoalItem = ({ item }: { item: GoalData }) => {
    const { idx, ranking, goal, amount } = item
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            newRanking: ranking,
            newGoal: goal,
            newAmount: amount
        }
    })
    const deleteItem = useRemoveGoalData()
    const [state, setState] = useState(defaultState)
    const { first, second, third } = state
    const clickState = (name: string) => {
        setState({
            ...state, [name]: true
        })
    }

    const patchFunction = usePatchGoalData(idx)
    const clickPatch: SubmitHandler<FieldValues> = (FieldValues) => {
        try {
            const { newRanking, newGoal, newAmount } = FieldValues
            patchFunction({
                ranking: newRanking,
                goal: newGoal,
                amount: Number(newAmount)
            })
            setState(defaultState)
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="relative flex items-center gap-3 p-3 mb-4 text-center transition-colors border rounded hover:bg-gray-100 group h-[74px]">
                {!first ? <div className="w-[33%] cursor-pointer" onClick={() => clickState("first")}>{ranking}</div>
                    : <Input register={{ ...register("newRanking") }} styleProp="w-[33%] text-center my-0" type="number" placeholder="우선순위" />}
                {!second ? <div className="w-[34%] cursor-pointer" onClick={() => clickState("second")}>{goal}</div>
                    : <Input register={{ ...register("newGoal") }} styleProp="w-[34%] text-center my-0" type="text" placeholder="목표" />}
                {!third ? <div className="w-[33%] cursor-pointer" onClick={() => clickState("third")}>{amount} 원</div>
                    : <Input register={{ ...register("newAmount") }} styleProp="w-[33%] text-center my-0" type="number" placeholder="금액" />}
                {(!first && !second && !third) && <IoIosRemoveCircleOutline onClick={() => deleteItem(idx)} size={25} className="absolute hidden cursor-pointer right-2 group-hover:block hover:text-red-500" />}
            </div>
            {(first || second || third) && <div className="flex justify-around gap-3 mb-4">
                <Button type="button" click={() => setState(defaultState)} name="취소" styleProp="my-0" />
                <Button type="button" click={handleSubmit(clickPatch)} name="수정" styleProp="my-0" />
            </div>}
        </>
    )
}

export default MaginotGoalItem