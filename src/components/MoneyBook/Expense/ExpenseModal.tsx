import { FlowDataType, graph_color } from "../../../type"
import { end_date, start_date } from "../MoneyBookNav"
import { useEffect, useState } from "react"

import ExpenseModalItem from "./ExpenseModalItem"
import ExpenseStatistics from "./ExpenseStatisticsModal"
import { MdOutlineSpeakerNotesOff } from "react-icons/md"
import { useGetFlowData } from "../../../react-query/Expense/ExpenseFlowData"

const ExpenseModal = ({ setModal, item, modalData }: any) => {
    const [state, setState] = useState(false)
    const { data: flow_data } = useGetFlowData({ start_date, end_date })

    const in_expense = flow_data?.data?.filter((item: FlowDataType) => { return item.flow_id <= 4 })?.map((item: FlowDataType, index: number) => {
        return {
            id: item.idx,
            label: item.flowName,
            value: item.amount,
            color: graph_color[index]
        }
    })
    const out_expense = flow_data?.data?.filter((item: FlowDataType) => { return item.flow_id > 4 })?.map((item: FlowDataType, index: number) => {
        return {
            id: item.idx,
            label: item.flowName,
            value: item.amount,
            color: graph_color[index]
        }
    })

    // scroll fix
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, [])
    const clickStatistics = () => setState(!state)
    return (
        <div className="min-w-[47rem] flex-col fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90 z-50" onClick={() => setModal(false)}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white w-[50rem] border border-black rounded h-[40rem]">
                {state ? <ExpenseStatistics click={clickStatistics} data={modalData === "수입" ? in_expense : out_expense} /> : <>
                    <div className="flex items-center justify-between pt-10 pb-5 font-semibold px-14 bg-gray">
                        <div className="text-2xl">{modalData}</div>
                        <div className="cursor-pointer" onClick={clickStatistics}>통계</div>
                    </div>
                    {item.length ?
                        <div className="h-full overflow-y-scroll">
                            {item.map((item: any) => (
                                <ExpenseModalItem key={item.idx} data={item} />
                            ))}
                        </div>
                        : <div className='flex items-center justify-center h-full m-auto text-2xl font-semibold'>
                            <MdOutlineSpeakerNotesOff size={50} />
                        </div>
                    }

                </>}
            </div>

        </div>
    )
}

export default ExpenseModal