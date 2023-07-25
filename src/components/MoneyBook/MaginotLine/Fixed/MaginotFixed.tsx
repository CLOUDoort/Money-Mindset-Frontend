import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import React, { useState } from "react"
import { useGetFixedData, usePostFixedData } from "../../../../react-query/MaginotData/MaginotFixedData";

import { FixedData } from "../../../../type";
import MaginotFixedItem from "./MaginotFixedItem"

const defaultValue = {
    fixed_expenditure: "",
    expenditure_amount: "",
    expenditure_date: "선택"
}

const DATE_SELECTOR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

const MaginotFixed = () => {
    const [goalValue, setValue] = useState(defaultValue)
    const { fixed_expenditure, expenditure_amount, expenditure_date } = goalValue
    const { data } = useGetFixedData()
    const [plus, setPlus] = useState(false)
    const [dateList, setDateList] = useState(false)
    const handleDateList = () => setDateList(!dateList)
    const handlePlus = () => setPlus(!plus)
    const dateClick = (date: number) => {
        setValue({
            ...goalValue, expenditure_date: String(date)
        })
        setDateList(false)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setValue({
            ...goalValue, [name]: value
        })
    }
    const mutate = usePostFixedData()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            mutate({ fixed_expenditure, expenditure_amount: Number(expenditure_amount), expenditure_date })
            setValue(defaultValue)
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <div className="flex flex-col w-full p-10 my-10 border rounded" onClick={() => setDateList(false)}>
            <div className="flex items-center mb-2 text-2xl font-semibold">
                <span>고정 지출 항목</span>
                {!plus ? <div className="transition ease-in-out all">
                    <AiOutlinePlusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />
                </div> : <AiOutlineMinusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex p-3 my-1 text-center">
                        <div className="w-[33%]">지출 날짜</div>
                        <div className="w-[34%]">지출 항목</div>
                        <div className="w-[33%]">금액(원)</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {data?.data?.map((item: FixedData) => (
                        <MaginotFixedItem key={item.idx} item={item} />
                    ))}
                </div>
                {plus && <div className="flex flex-col">
                    <div className="flex gap-3">
                        <div className="flex items-center justify-center w-[33%] relative" onClick={(e) => e.stopPropagation()} >
                            <div className={`w-full h-12 px-4 py-3 mt-2 mb-4 text-center ${expenditure_date === "선택" && "text-gray-500"} whitespace-nowrap transition ease-in-out bg-white border border-gray-400 rounded cursor-pointer`} onClick={handleDateList}>{expenditure_date === '선택' ? expenditure_date : expenditure_date + ' 일'}</div>
                            {dateList && <div className="absolute z-40 h-48 p-2 overflow-y-scroll transition-all 0.5s bg-white border left-0 top-16 w-full rounded">
                                {DATE_SELECTOR.map((item) => (
                                    <div className="p-2 transition-colors rounded cursor-pointer hover:bg-gray-200" onClick={() => dateClick(item)} key={item}>{item} 일</div>
                                ))}
                            </div>}
                        </div>
                        <input required autoComplete='off' className="w-[34%] h-12 px-4 py-2 mt-2 mb-4 text-center transition ease-in-out bg-white border-gray-400 rounded" type="text" placeholder="지출 항목" value={fixed_expenditure} name="fixed_expenditure" onChange={handleChange} />
                        <input required autoComplete='off' className="w-[33%] h-12 px-4 py-2 mt-2 mb-4 text-center transition ease-in-out bg-white border-gray-400 rounded" type="number" value={expenditure_amount} name="expenditure_amount" onChange={handleChange} placeholder="금액" />
                    </div>
                    <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
                </div>}
            </form>
        </div>
    )
}

export default MaginotFixed