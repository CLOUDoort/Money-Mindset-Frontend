import { end_date, start_date } from "../MoneyBookNav"
import { end_date_string, start_date_string } from "../MaginotLine/MoneyBookMaginotLine"
import { useGetExpenseStatisticsIncomeData, useGetExpenseStatisticsOutcomeData } from "../../../react-query/Expense/ExpenseStatisticsData"

import ExpenseStatistics from "./ExpenseStatistics"
import KakaoMap from "../KakaoMap"
import MaginotChart from "../MaginotLine/MaginotChart"
import { useGetFlowData } from "../../../react-query/Expense/ExpenseFlowData"
import { MdOutlineSpeakerNotesOff } from "react-icons/md"
import { PropsFlowItem } from "../../../type/expenseData"

const MoneyBookStatistics = () => {
    const { data: in_static } = useGetExpenseStatisticsIncomeData({ start_date, end_date, flow_type: 0 })
    const { data: out_static } = useGetExpenseStatisticsOutcomeData({ start_date, end_date, flow_type: 1 })
    const { data: flow_data } = useGetFlowData({ start_date, end_date })
    const flowMapData = flow_data?.data.map((item: PropsFlowItem) => {
        if (item.flowDetail) {
            return {
                detail: item.flowDetail,
                flow_id: item.flow_id
            }
        }
    })
    return (
        <div className="lg:ml-52 ml-14 bg-white min-w-[55rem] w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center max-w-[65rem] lg:p-5 min-w-[50rem]">
                <div className="flex flex-col w-full gap-3 mt-10 text-2xl font-semibold">
                    <div className="text-4xl">Statistics</div>
                    <div className="items-center">{start_date_string} ~ {end_date_string}</div>
                </div>
                <MaginotChart />
                <div className="flex items-center justify-center w-full gap-3 my-10 text-2xl font-semibold">
                    <div className="border rounded">
                        <div className="px-10 pt-5">수입</div>
                        <ExpenseStatistics data={in_static} />
                    </div>
                    <div className="border rounded">
                        <div className="px-10 pt-5">지출</div>
                        <ExpenseStatistics data={out_static} />
                    </div>
                </div>
                <div className="w-full mb-10">
                    <div className="text-2xl font-semibold mb-7">수입 및 지출 위치</div>
                    {flowMapData ? <KakaoMap flowMapData={flowMapData} /> : <div className="w-full h-[30rem] flex items-center justify-center">
                        <MdOutlineSpeakerNotesOff size={50} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MoneyBookStatistics