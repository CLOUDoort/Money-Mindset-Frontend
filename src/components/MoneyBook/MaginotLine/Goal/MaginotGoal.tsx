import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { GoalData, PostGoalData } from "../../../../types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useGetGoalData, usePostGoalData } from "../../../../react-query/MaginotData/MaginotGoalData"

import Button from "../../../ButtonForm"
import Input from "../../../InputForm"
import MaginotGoalItem from "./MaginotGoalItem"
import { useState } from "react"

const MaginotGoal = () => {
    const { data } = useGetGoalData()
    const [plus, setPlus] = useState(false)
    const handlePlus = () => setPlus(!plus)

    const { register, handleSubmit, reset } = useForm<PostGoalData>()
    const mutate = usePostGoalData()
    const clickSubmit: SubmitHandler<PostGoalData> = (FieldValues) => {
        const { ranking, goal, amount } = FieldValues
        try {
            mutate({
                ranking: Number(ranking),
                goal: String(goal),
                amount: Number(amount)
            })
            reset()
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <div className="flex flex-col w-full p-10 my-10 border rounded">
            <div className="flex items-center mb-2 text-2xl font-semibold">
                <span>목표 항목</span>
                {!plus ?
                    <AiOutlinePlusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />
                    : <AiOutlineMinusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />}
            </div>
            <form onSubmit={handleSubmit(clickSubmit)}>
                <div>
                    <div className="flex p-3 my-1 text-center">
                        <div className="w-[33%]">우선순위</div>
                        <div className="w-[34%]">목표</div>
                        <div className="w-[33%]">금액(원)</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {data?.data?.map((item: GoalData) => (
                        <MaginotGoalItem key={item.idx} item={item} />
                    ))}
                </div>
                {plus &&
                    <div className="flex flex-col">
                        <div className="flex gap-3">
                            <Input type="number" styleProp="text-center" placeholder="우선순위" register={{ ...register("ranking") }} />
                            <Input type="text" styleProp="text-center" placeholder="목표" register={{ ...register("goal") }} />
                            <Input type="number" styleProp="text-center" placeholder="금액" register={{ ...register("amount") }} />
                        </div>
                        <Button type="submit" name="저장" />
                    </div>
                }
            </form>
        </div>
    )
}

export default MaginotGoal