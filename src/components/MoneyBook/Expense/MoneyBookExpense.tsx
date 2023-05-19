import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

import Input from "../../InputForm"
import { useState } from "react"

const defaultValue = {
    flow_id: 0,
    amount: "",
    flow_date: ""
}

const MoneyBookExpense = () => {
    const [flow, setFlow] = useState(defaultValue)
    const { flow_id, amount, flow_date } = flow
    const [plus, setPlus] = useState(false)
    const handlePlus = () => setPlus(!plus)
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            // mutate({
            //     ranking: Number(ranking),
            //     goal,
            //     amount: Number(amount)
            // })
            // setValue(defaultValue)
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setFlow({
            ...flow, [name]: value
        })
    }
    return (
        <div className="lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[30rem] w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center lg:w-[75%] w-[80%] p-5 lg:p-10">
                <div className="flex flex-col w-full p-10 my-10 border rounded">
                    <div className="flex items-center mb-2 text-2xl font-semibold">
                        <span>수입 지출 기록</span>
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
                            {/* 데이터 항목 */}
                        </div>
                        {plus &&
                            <div className="flex flex-col">
                                <div className="flex gap-3">
                                    <Input type="number" value={flow_date} placeholder="우선순위" name="ranking" onChange={handleChange} />
                                    <Input type="text" placeholder="목표" value={flow_id} name="goal" onChange={handleChange} />
                                    <Input type="number" value={amount} name="amount" onChange={handleChange} placeholder="금액" />
                                </div>
                                <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MoneyBookExpense