import React, { useState } from "react"
import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';
import Input from "../../../InputForm"
import InputLabel from '@mui/material/InputLabel';
import MaginotFixedItem from "./MaginotFixedItem"
import MenuItem from '@mui/material/MenuItem';
import { useGetFixedData, usePostFixedData } from "../../../../react-query/MaginotData/MaginotFixedData";
import { useAtom } from "jotai";
import { finalMaginot } from "../../../../store/initialState";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FixedData } from "../../../../type/fixedData";

const defaultValue = {
    fixed_expenditure: "",
    expenditure_amount: "",
    expenditure_date: ""
}

const DATE_SELECTOR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

const MaginotFixed = () => {
    const [goalValue, setValue] = useState(defaultValue)
    const [finalLine, setFinalLine] = useAtom(finalMaginot)
    const { fixed_expenditure, expenditure_amount, expenditure_date } = goalValue
    const { data } = useGetFixedData()
    const [plus, setPlus] = useState(false)
    const handlePlus = () => setPlus(!plus)
    const dateChange = (e: SelectChangeEvent) => {
        const { value, name } = e.target
        setValue({
            ...goalValue, [name]: String(value)
        })
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
            setFinalLine(finalLine - Number(expenditure_amount))
            setValue(defaultValue)
        }
        catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <div className="flex flex-col w-full p-10 my-10 border rounded">
            <div className="flex items-center mb-2 text-2xl font-semibold">
                <span>고정 지출 항목</span>
                {!plus ? <div className="transition ease-in-out all">
                    <AiOutlinePlusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />
                </div> : <AiOutlineMinusCircle className="ml-4 cursor-pointer" size={30} onClick={handlePlus} />}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex p-3 my-4 text-center">
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
                        <div className="flex items-center justify-center w-full mb-4 ml-6">
                            <FormControl sx={{ m: 1, minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    날짜
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={expenditure_date}
                                    onChange={dateChange}
                                    autoWidth
                                    name="expenditure_date"
                                    label="날짜"
                                >
                                    {DATE_SELECTOR.map((item) => (
                                        <MenuItem key={item} value={item}>{item} 일</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Input type="text" placeholder="지출 항목" value={fixed_expenditure} name="fixed_expenditure" onChange={handleChange} />
                        <Input type="number" value={expenditure_amount} name="expenditure_amount" onChange={handleChange} placeholder="금액" />
                    </div>
                    <button type="submit" className="w-full py-3 my-3 font-semibold text-white uppercase transition bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150">저장</button>
                </div>}
            </form>
        </div>
    )
}

export default MaginotFixed