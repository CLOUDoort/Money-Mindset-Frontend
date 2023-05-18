import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import React, { useState } from "react"
import { useGetGoalData, usePostGoalData } from "../../../../react-query/MaginotData/MaginotGoalData"

import Input from "../../../InputForm"
import MaginotGoalItem from "./MaginotGoalItem"

const defaultValue = {
    ranking: "",
    goal: "",
    amount: ""
}

const MaginotGoal = () => {
    const [goalValue, setValue] = useState(defaultValue)
    const { ranking, goal, amount } = goalValue
    const { data } = useGetGoalData()
    const [plus, setPlus] = useState(false)
    const handlePlus = () => setPlus(!plus)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setValue({
            ...goalValue, [name]: value
        })
    }
    const mutate = usePostGoalData()
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            mutate({
                ranking: Number(ranking),
                goal,
                amount: Number(amount)
            })
            setValue(defaultValue)
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <div className="flex flex-col w-full p-10 my-10 border rounded">
            <div className="flex items-center mb-2 text-2xl font-semibold">
                <span>목표 항목</span>
                {!plus ? <div className="transition ease-in-out all">
                    <AiOutlinePlusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />
                </div> : <AiOutlineMinusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex p-3 my-4 text-center">
                        <div className="w-[33%]">우선순위</div>
                        <div className="w-[34%]">목표</div>
                        <div className="w-[33%]">금액(원)</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {data?.data?.map((item: any) => (
                        <MaginotGoalItem key={item.idx} item={item} />
                    ))}
                </div>
                {plus &&
                    <div className="flex flex-col">
                        <div className="flex gap-3">
                            <Input type="number" value={ranking} placeholder="우선순위" name="ranking" onChange={handleChange} />
                            <Input type="text" placeholder="목표" value={goal} name="goal" onChange={handleChange} />
                            <Input type="number" value={amount} name="amount" onChange={handleChange} placeholder="금액" />
                        </div>
                        <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default MaginotGoal