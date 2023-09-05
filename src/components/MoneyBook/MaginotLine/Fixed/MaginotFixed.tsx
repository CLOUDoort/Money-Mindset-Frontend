import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetFixedData, usePostFixedData } from "../../../../react-query/MaginotData/MaginotFixedData";

import Button from "../../../ButtonForm";
import DateList from "./DateList";
import { FixedData } from "../../../../types";
import Input from "../../../InputForm";
import MaginotFixedItem from "./MaginotFixedItem"
import { useState } from "react"

type FieldValues = {
    fixed_expenditure: string,
    expenditure_amount: string,
}

const MaginotFixed = () => {
    const [expenditureDate, setExpenditureDate] = useState("선택")
    const { register, handleSubmit, reset } = useForm<FieldValues>()
    const { data } = useGetFixedData()
    const [plus, setPlus] = useState(false)
    const [dateList, setDateList] = useState(false)
    const handleDateList = () => setDateList(!dateList)
    const handlePlus = () => setPlus(!plus)
    const dateClick = (date: number) => {
        setExpenditureDate(String(date))
        setDateList(false)
    }
    const mutate = usePostFixedData()
    const clickSubmit: SubmitHandler<FieldValues> = (FieldValues) => {
        const { fixed_expenditure, expenditure_amount } = FieldValues
        try {
            mutate({ fixed_expenditure, expenditure_amount: Number(expenditure_amount), expenditure_date: expenditureDate })
            setExpenditureDate("선택")
            reset()
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <div className="flex flex-col w-full p-10 my-10 border rounded" onClick={() => setDateList(false)}>
            <div className="flex items-center mb-2 text-2xl font-semibold">
                <span>고정 지출 항목</span>
                {!plus ?
                    <AiOutlinePlusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />
                    : <AiOutlineMinusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />}
            </div>
            <form onSubmit={handleSubmit(clickSubmit)}>
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
                            <div className={`w-full h-12 px-4 py-3 mt-2 mb-4 text-center ${expenditureDate === "선택" && "text-gray-500"} whitespace-nowrap bg-white border border-gray-400 rounded cursor-pointer`} onClick={handleDateList}>{expenditureDate === '선택' ? expenditureDate : expenditureDate + ' 일'}</div>
                            {dateList && <DateList dateClick={dateClick} />}
                        </div>
                        <Input register={{ ...register("fixed_expenditure") }} styleProp="w-[34%] mt-2 mb-4 text-center" type="text" placeholder="지출 항목" />
                        <Input register={{ ...register("expenditure_amount") }} styleProp="w-[33%] mt-2 mb-4 text-center" type="number" placeholder="금액" />
                    </div>
                    <Button type="submit" name="저장" />
                </div>}
            </form>
        </div>
    )
}

export default MaginotFixed