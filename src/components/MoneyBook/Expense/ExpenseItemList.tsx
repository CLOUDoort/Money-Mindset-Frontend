import ExpenseItem from "./ExpenseItem"
import ExpenseModal from "./ExpenseModal"
import { FlowDataType } from "../../../types"
import { useState } from "react"

const ExpenseItemList = ({ data }: { data: FlowDataType[] }) => {
    const list = ["수입", "지출"]
    const income_list = data.filter((item: FlowDataType) => item.flow_id <= 4)
    const outcome_list = data.filter((item: FlowDataType) => item.flow_id > 4)
    const [modal, setModal] = useState(false)
    const [dataName, setDataName] = useState("")
    const clickModal = (data: string) => {
        setModal(!modal)
        setDataName(data)
    }
    return (
        <>
            <div className="flex items-center justify-center mt-10 bg-white w-full gap-3 h-[45rem]">
                {list.map((name: string) => (
                    <div key={name} className="flex flex-col w-full h-full mb-10 border rounded">
                        <div className="flex items-center justify-between px-5 pt-10 pb-5 font-semibold" >
                            <div className="flex gap-5 text-2xl">
                                <p>{name}</p>
                                <div>{name === "수입" ? income_list?.length : outcome_list?.length}</div>
                            </div>
                            <div className="cursor-pointer" onClick={() => clickModal(name)}>수정 및 통계</div>
                        </div>
                        <div className="flex w-full gap-3 px-5 pt-3 pb-5 font-semibold text-center border-b border-b-zinc-500">
                            <div className="w-10">일자</div>
                            <div className="w-16">항목</div>
                            <div>상세내용</div>
                            <div className="flex-1 pr-5 text-right">금액</div>
                        </div>
                        <div className="overflow-y-auto">
                            {(name === "수입" ? income_list : outcome_list).map((item: FlowDataType) => (
                                <ExpenseItem key={item.idx} data={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {modal && <ExpenseModal setModal={setModal} item={dataName === "수입" ? income_list : outcome_list} dataName={dataName} />}
        </>
    )
}

export default ExpenseItemList