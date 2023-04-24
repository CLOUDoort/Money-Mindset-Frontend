import React, { useState } from "react"

import Input from "../../InputForm"
import MaginotItem from "./MaginotItem"
import { apiInstance } from "../../../apis/setting"
import { toast } from "react-toastify"
import { useAtomValue } from "jotai"
import { userIdx } from "../../../store/initialState"

const defaultValue = {
    ranking: 0,
    goal: "",
    amount: 0
}

const MaginotGoal = () => {
    const idx = useAtomValue(userIdx)
    const [goalValue, setValue] = useState(defaultValue)
    const { ranking, goal, amount } = goalValue
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setValue({
            ...goalValue, [name]: value
        })
    }
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await apiInstance.post(`/maginot/user/2`, {
                ranking: Number(ranking),
                goal,
                amount: Number(amount)
            })
            toast.success("입력성공")
            setValue(defaultValue)
            console.log(response.data)
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <div className="flex flex-col mb-10">
            <div className="mb-2 text-2xl font-semibold">목표 항목</div>
            <form onSubmit={handleSubmit}>
                <table >
                    <thead>
                        <tr>
                            <th>우선순위</th>
                            <th>목표</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Input type="number" value={ranking} name="ranking" onChange={handleChange} />
                            </td>
                            <td>
                                <Input type="text" placeholder="목표" value={goal} name="goal" onChange={handleChange} />
                            </td>
                            <td>
                                <Input type="number" value={amount} name="amount" onChange={handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <MaginotItem />
                <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
            </form>
        </div>
    )
}

export default MaginotGoal