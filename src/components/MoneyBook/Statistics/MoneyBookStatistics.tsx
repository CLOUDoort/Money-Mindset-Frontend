import { end_date, start_date } from "../MoneyBookNav"
import { end_date_string, start_date_string } from "../MaginotLine/MoneyBookMaginotLine"
import { useGetExpenseStatisticsIncomeData, useGetExpenseStatisticsOutcomeData } from "../../../react-query/Expense/ExpenseStatisticsData"

import ExpenseChart from "./ExpenseChart"
import ExpenseStatistics from "./ExpenseStatistics"
import KakaoMap from "../KakaoMap"
import { PropsFlowItem } from "../../../type"
import { useGetFlowData } from "../../../react-query/Expense/ExpenseFlowData"

const MoneyBookStatistics = () => {
    const { data: in_static } = useGetExpenseStatisticsIncomeData({ start_date, end_date, flow_type: 0 })
    const { data: out_static } = useGetExpenseStatisticsOutcomeData({ start_date, end_date, flow_type: 1 })
    const { data: flow_data } = useGetFlowData({ start_date, end_date })
    const temp = flow_data?.data.filter((item: PropsFlowItem) => item.flowDetail && item.flowDetail)
    const flowMapData = temp?.map((item: PropsFlowItem) => {
        return {
            detail: item.flowDetail,
            flow_id: item.flow_id
        }
    })
    return (
        <div className="bg-white min-w-[50rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center">
            <div className="flex flex-col items-center max-w-[65rem] justify-center w-full px-10 lg:px-10">
                <div className="flex flex-col w-full gap-3 mt-10 text-2xl font-semibold">
                    <div className="text-4xl">Statistics</div>
                    <div className="items-center">{start_date_string} ~ {end_date_string} 지출 그래프</div>
                </div>
                <ExpenseChart />
                <div className="flex items-center justify-between w-full gap-5 my-10 text-2xl font-semibold lg:text-3xl">
                    <div className="flex flex-col">
                        <div className="pb-5">수입</div>
                        <ExpenseStatistics data={in_static} />
                    </div>
                    <div className="flex flex-col">
                        <div className="pb-5">지출</div>
                        <ExpenseStatistics data={out_static} />
                    </div>
                </div>
                <div className="w-full mb-10">
                    <div className="text-2xl font-semibold lg:text-3xl mb-7">수입 및 지출 위치</div>
                    {flowMapData && <KakaoMap flowMapData={flowMapData} />}
                </div>
            </div>
        </div>
    )
}

export default MoneyBookStatistics