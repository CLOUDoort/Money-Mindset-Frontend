import ExpenseItem from "./ExpenseItem"
import ExpenseItemModal from "./ExpenseItemModal"
import _ from "lodash"
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
            <div className="flex items-center justify-center lg:w-[75%] max-w-[70rem] w-[80%] gap-3">
                <div className="flex flex-col w-[50%] p-10 mb-10 border rounded h-[30rem]">
                    <div className="flex items-center justify-between mb-5 font-semibold">
                        <div className="text-2xl">수입</div>
                        <div className="cursor-pointer" onClick={() => clickModal("수입")}>목록 및 통계</div>
                    </div>
                    <div className="overflow-y-scroll">
                        {income_list.map((item: any) => (
                            <ExpenseItem key={item.idx} data={item} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-[50%] p-10 mb-10 border rounded h-[30rem]">
                    <div className="flex items-center justify-between mb-5 font-semibold">
                        <div className="text-2xl">지출</div>
                        <div className="cursor-pointer" onClick={() => clickModal("지출")}>목록 및 통계</div>
                    </div>
                    <div className="overflow-y-scroll">
                        {outcome_list.map((item: any) => (
                            <ExpenseItem key={item.idx} data={item} />
                        ))}
                    </div>
                </div>
            </div>
            {modal && (modalData === "수입" ? <ExpenseItemModal setModal={setModal} item={income_list} modalData={modalData} /> : <ExpenseItemModal setModal={setModal} item={outcome_list} modalData={modalData} />)}

        </>
    )
}

export default ExpenseItemList