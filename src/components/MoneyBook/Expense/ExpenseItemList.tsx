import ExpenseItem from "./ExpenseItem"
import _ from "lodash"

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
    return (
        <div className="flex items-center justify-between lg:w-[75%] max-w-[70rem] w-[80%] lg:p-10 gap-5">
            <div className="flex flex-col w-[50%] p-10 my-10 border rounded h-96">
                <div className="flex items-center justify-between mb-5 font-semibold">
                    <div className="text-2xl">수입</div>
                    <div className="cursor-pointer">목록 및 통계</div>
                </div>
                <div className="overflow-y-scroll">
                    {income_list.map((item: any) => (
                        <ExpenseItem key={item.idx} data={item} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-[50%] p-10 my-10 border rounded h-96">
                <div className="flex items-center justify-between mb-5 font-semibold">
                    <div className="text-2xl">지출</div>
                    <div className="cursor-pointer">목록 및 통계</div>
                </div>
                <div className="overflow-y-scroll">
                    {outcome_list.map((item: any) => (
                        <ExpenseItem key={item.idx} data={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExpenseItemList