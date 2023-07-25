import { FlowDataType, GoalData, LineData, graph_color } from "../../type"
import { end_date, start_date } from "./MoneyBookNav"
import { end_date_string, start_date_string } from "./MaginotLine/MoneyBookMaginotLine"

import ExpenseStatistics from "./Statistics/ExpenseStatistics"
import KakaoMap from "./KakaoMap"
import { Link } from "react-router-dom"
import MaginotChart from "./MaginotLine/MaginotChart"
import { MdOutlineSpeakerNotesOff } from "react-icons/md"
import { useGetAssetData } from "../../react-query/AssetData"
import { useGetFlowData } from "../../react-query/Expense/ExpenseFlowData"
import { useGetGoalData } from "../../react-query/MaginotData/MaginotGoalData"

const MoneyBookDashboard = () => {
    const { data: flow_data } = useGetFlowData({ start_date, end_date })
    const { data: asset } = useGetAssetData()
    const { data: goal_data } = useGetGoalData()
    console.log('asset', asset?.data)
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
    const flowMapData = flow_data?.data?.filter((item: FlowDataType) => item.flowDetail)?.map((item: FlowDataType) => {
        return {
            detail: item.flowDetail,
            flow_id: item.flow_id
        }
    })
    let sum = 0;
    const lineData = goal_data?.data?.map((line: GoalData) => {
        sum += line.amount
        return {
            "idx": line.ranking,
            "legend": line.goal,
            "value": asset?.data?.amount + asset?.data?.userIncome - asset?.data?.fixedExpenditureAmount - sum
        }
    })
    lineData?.unshift({ "legend": "생존", "value": asset?.data?.amount + asset?.data?.userIncome - asset?.data?.fixedExpenditureAmount })
    return (
        <div className="bg-white min-w-[50rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center">
            <div className="flex flex-col items-center max-w-[65rem] justify-center w-full px-10">
                <div className="flex flex-col w-full gap-3 my-10 text-2xl font-semibold">
                    <div className="text-4xl">Dashboard</div>
                    <div className="flex items-center justify-between w-full">
                        <div className="items-center">{start_date_string} ~ {end_date_string}</div>
                        <div>현재 자산 : {asset?.data?.amount + asset?.data?.userIncome - asset?.data?.userExpense} 원</div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3 mb-10 font-semibold">
                    <div className="text-2xl">
                        Maginot Line
                        <Link className="ml-2 text-lg text-black/60" to={"/money-book/maginot-line"}>설정</Link>
                    </div>
                    {lineData ?
                        <div className="grid grid-cols-2 gap-3 text-2xl">
                            {lineData?.map((item: LineData) => (
                                <div key={item.idx} className={`flex flex-col items-center ${asset?.data?.userExpense > item.value ? "bg-red-300" : "bg-green-300"} justify-center font-semibold w-full h-[10rem] border rounded-3xl`}>
                                    <div>
                                        {item.value - asset?.data?.userExpense < 0 ? "파괴" : item.value - asset?.data?.userExpense + "원 사용가능"}
                                        <div>{item.legend} 방어선</div>
                                    </div>
                                </div>
                            ))}
                        </div> : <div className="w-full h-[30rem] border rounded flex items-center justify-center">
                            <MdOutlineSpeakerNotesOff size={50} />
                        </div>}
                    {lineData && <MaginotChart line={lineData} max={asset?.data?.amount + asset?.data?.userIncome} />}
                </div>
                <div className="flex flex-col w-full gap-3 mb-10 text-2xl font-semibold">
                    <div>
                        Income & Outcome
                        <Link className="ml-2 text-lg text-black/60" to={"/money-book/expense"}>설정</Link>
                    </div>
                    <div className="flex items-center justify-between w-full gap-5 text-lg font-semibold lg:text-xl">
                        <div className="flex flex-col">
                            <div className="pb-2">수입</div>
                            <div className="border rounded">
                                <ExpenseStatistics data={in_expense} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="pb-2">지출</div>
                            <div className="border rounded">
                                <ExpenseStatistics data={out_expense} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-10">
                    <div className="text-xl font-semibold lg:text-2xl mb-7">
                        수입 및 지출 위치
                        <Link className="ml-2 text-lg text-black/60" to={"/money-book/expense"}>설정</Link>
                    </div>
                    {flowMapData && <KakaoMap flowMapData={flowMapData} />}
                </div>
            </div>
        </div >
    )
}

export default MoneyBookDashboard