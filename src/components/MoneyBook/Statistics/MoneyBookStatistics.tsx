import { end_date_string, start_date_string } from "../MaginotLine/MoneyBookMaginotLine"

import ExpenseChart from "./ExpenseChart"
import ExpenseStatistics from "./ExpenseStatistics"
import KakaoMap from "../KakaoMap"

const MoneyBookStatistics = () => {

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
                        <ExpenseStatistics dataName="수입" />
                    </div>
                    <div className="flex flex-col">
                        <div className="pb-5">지출</div>
                        <ExpenseStatistics dataName="지출" />
                    </div>
                </div>
                <div className="w-full mb-10">
                    <div className="text-2xl font-semibold lg:text-3xl mb-7">수입 및 지출 위치</div>
                    <KakaoMap />
                </div>
            </div>
        </div>
    )
}

export default MoneyBookStatistics