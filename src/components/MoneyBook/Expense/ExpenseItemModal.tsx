import { AiOutlineArrowRight } from "react-icons/ai"
import Input from "../../InputForm"
import KakaoMap from "../KakaoMap"
import { expenseLocation } from "../../../store/initialState"
import { format } from "date-fns"
import { useAtomValue } from "jotai"
import { useForm } from "react-hook-form"
import { usePostDetailData } from "../../../react-query/Expense/ExpenseDetailData"

type ItemType = {
    flow_date: string,
    flowName: string,
    amount: number,
    idx: number
}

const ExpenseItemModal = ({ clickModal, data }: { clickModal: () => void, data: ItemType }) => {
    const { flow_date, flowName, amount, idx } = data
    const date = format(new Date(flow_date), 'yyyy-MM-dd')
    const position = useAtomValue(expenseLocation)
    const { register, handleSubmit } = useForm()
    console.log('position', position)
    const mutate = usePostDetailData(idx)
    const clickSubmit = async (FieldValues: any) => {
        const { detail } = FieldValues
        try {
            mutate({ detail, lat: position.lat, lng: position.lng })
            clickModal()
        }
        catch (e: any) {
            console.error(e)
        }
    }
    return (
        <div className="min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90 z-50 " onClick={clickModal}>
            <form onSubmit={handleSubmit(clickSubmit)} className="flex flex-col bg-white w-[40rem] border border-black rounded h-[40rem] transition-all 0.5s ease-in-out p-5" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <div className="p-3 text-2xl font-semibold text-left">{date}</div>
                    <AiOutlineArrowRight className='cursor-pointer' size={25} onClick={clickModal} />
                </div>
                <div className="flex gap-3 p-3 text-xl">
                    <div>{flowName}</div>
                    <div className="font-semibold">{amount}</div>원
                </div>
                <div className="flex flex-col gap-3 p-3 text-xl">
                    <div className="text-left">상세내용</div>
                    <Input type="text" placeholder="상세내용" register={{ ...register("detail") }} ></Input>
                </div>
                <div className="p-3">
                    <KakaoMap />
                </div>
                <button className='w-full px-5 py-2 mt-5 font-semibold text-white transition bg-blue-600 rounded shadow-md hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg duration 150' type='submit'>저장</button>
            </form>
        </div>
    )
}

export default ExpenseItemModal