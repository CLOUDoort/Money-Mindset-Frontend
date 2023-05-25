import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState } from "react"
import { useGetGoalData, usePostGoalData } from "../../../../react-query/MaginotData/MaginotGoalData"

import MaginotGoalItem from "./MaginotGoalItem"
import { useForm } from "react-hook-form"

const MaginotGoal = () => {
    const { data } = useGetGoalData()
    const [plus, setPlus] = useState(false)
    const handlePlus = () => setPlus(!plus)

    const { register, handleSubmit, reset } = useForm()
    const mutate = usePostGoalData()
    const clickSubmit = async (formValues: any) => {
        try {
            mutate({
                ranking: Number(formValues.ranking),
                goal: String(formValues.goal),
                amount: Number(formValues.amount)
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
                {!plus ? <div className="transition ease-in-out all">
                    <AiOutlinePlusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />
                </div> : <AiOutlineMinusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />}
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
                    {data?.data?.map((item: any) => (
                        <MaginotGoalItem key={item.idx} item={item} />
                    ))}
                </div>
                {plus &&
                    <div className="flex flex-col">
                        <div className="flex gap-3">
                            <input autoComplete='off' required className="w-full h-12 px-4 py-2 mt-2 mb-4 text-center transition ease-in-out bg-white border-gray-400 rounded" type="number" placeholder="우선순위" {...register("ranking")} />
                            <input autoComplete='off' required className="w-full h-12 px-4 py-2 mt-2 mb-4 text-center transition ease-in-out bg-white border-gray-400 rounded" type="text" placeholder="목표" {...register("goal")} />
                            <input autoComplete='off' required className="w-full h-12 px-4 py-2 mt-2 mb-4 text-center transition ease-in-out bg-white border-gray-400 rounded" type="number" placeholder="금액" {...register("amount")} />
                        </div>
                        <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default MaginotGoal