import ExpenseItem from "./ExpenseItem"
import ExpenseModal from "./ExpenseModal"
import { useState } from "react"

export interface FlowItemType {
    idx: number,
    user_idx: number,
    flow_id: number,
    amount: number,
    flow_date: Date
}

const ExpenseItemList = ({ data }: any) => {
    const income_list = data.filter((item: FlowItemType) => item.flow_id <= 4)
    const outcome_list = data.filter((item: FlowItemType) => item.flow_id > 4)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState("")
    const clickModal = (data: string) => {
        setModal(!modal)
        setModalData(data)
    }
    return (
        <>
            <div className="flex items-center justify-center lg:w-[75%] max-w-[70rem] w-[80%] gap-3 h-[45rem]">
                <div className="flex flex-col w-full h-full mb-10 border rounded">
                    <div className="flex items-center justify-between px-5 pt-10 pb-5 font-semibold">
                        <div className="flex gap-5 text-2xl">
                            <p>수입</p>
                            <div>{income_list.length}</div>
                        </div>
                        <div className="cursor-pointer" onClick={() => clickModal("수입")}>수정 및 통계</div>
                    </div>
                    <div className="flex w-full gap-3 px-5 pt-3 pb-5 font-semibold text-center border-b border-b-zinc-500">
                        <div className="w-10">일자</div>
                        <div className="w-16">항목</div>
                        <div>상세내용</div>
                        <div className="flex-1 pr-5 text-right">금액</div>
                    </div>
                    <div className="overflow-y-auto">
                        {income_list.map((item: any) => (
                            <ExpenseItem key={item.idx} data={item} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full h-full mb-10 border rounded whitespace-nowrap">
                    <div className="flex items-center justify-between px-5 pt-10 pb-5 font-semibold">
                        <div className="flex gap-5 text-2xl">
                            <p>지출</p>
                            <div>{outcome_list.length}</div>
                        </div>
                        <div className="cursor-pointer" onClick={() => clickModal("지출")}>수정 및 통계</div>
                    </div>
                    <div className="flex w-full gap-3 px-5 pt-3 pb-5 font-semibold text-center border-b border-b-zinc-500">
                        <div className="w-10">일자</div>
                        <div className="w-16">항목</div>
                        <div>상세내용</div>
                        <div className="flex-1 pr-5 text-right">금액</div>
                    </div>
                    <div className="overflow-y-auto">
                        {outcome_list.map((item: any) => (
                            <ExpenseItem key={item.idx} data={item} />
                        ))}
                    </div>
                </div>
            </div>
            {modal && (modalData === "수입" ? <ExpenseModal setModal={setModal} item={income_list} modalData={modalData} /> : <ExpenseModal setModal={setModal} item={outcome_list} modalData={modalData} />)}
        </>
    )
}

export default ExpenseItemList