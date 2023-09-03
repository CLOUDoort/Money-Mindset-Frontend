import { end_date_string, start_date_string } from "./MaginotLine/MoneyBookMaginotLine"

import ExpenseStatistics from "./Statistics/ExpenseStatistics"
import KakaoMap from "./KakaoMap"
import { Link } from "react-router-dom"
import MaginotLineChart from "./MaginotLine/MaginotLineChart"
import { useGetAssetData } from "../../react-query/AssetData"

const MoneyBookDashboard = () => {
    const { data: asset } = useGetAssetData()
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

                {/* 방어선 및 차트 */}
                <div className="flex flex-col w-full gap-3 font-semibold">
                    <div className="text-2xl">
                        Maginot Line
                        <Link className="ml-2 text-lg text-black/60" to={"/money-book/maginot-line"}>설정</Link>
                    </div>
                    <MaginotLineChart />
                </div>

                {/* 수입 및 지출 */}
                <div className="flex flex-col w-full gap-3 mb-10 text-2xl font-semibold">
                    <div>
                        Income & Outcome
                        <Link className="ml-2 text-lg text-black/60" to={"/money-book/expense"}>설정</Link>
                    </div>
                    <div className="flex items-center justify-between w-full gap-5 text-lg font-semibold lg:text-xl">
                        <div className="flex flex-col">
                            <div className="pb-2">수입</div>
                            <div className="border rounded">
                                <ExpenseStatistics dataName="수입" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="pb-2">지출</div>
                            <div className="border rounded">
                                <ExpenseStatistics dataName="지출" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 지도 */}
                <div className="w-full mb-10">
                    <div className="text-xl font-semibold lg:text-2xl mb-7">
                        수입 및 지출 위치
                        <Link className="ml-2 text-lg text-black/60" to={"/money-book/expense"}>설정</Link>
                    </div>
                    <KakaoMap />
                </div>
            </div>
        </div >
    )
}

export default MoneyBookDashboard