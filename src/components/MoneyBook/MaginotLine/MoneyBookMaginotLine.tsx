import MaginotFixed from "./Fixed/MaginotFixed"
import MaginotGoal from "./Goal/MaginotGoal"
import MaginotLineChart from "./MaginotLineChart"
import moment from "moment"
import { useGetAssetData } from "../../../react-query/AssetData"

const today = moment().toDate()
export const start_date_string = new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString()
export const end_date_string = new Date(today.getFullYear(), today.getMonth() + 1, 0).toLocaleDateString()

const MoneyBookMaginotLine = () => {
    const { data: asset } = useGetAssetData()
    return (
        <div className="bg-white min-w-[50rem] lg:ml-[14rem] ml-[3.5rem] flex justify-center items-center">
            <div className="flex flex-col items-center max-w-[65rem] justify-center w-full px-10">
                <div className="flex flex-col w-full gap-3 my-10 text-2xl font-semibold">
                    <div className="text-4xl">Maginot Line</div>
                    <div className="flex items-center justify-between w-full">
                        <div className="items-center">{start_date_string} ~ {end_date_string}</div>
                        <div>현재 자산 : {asset?.data?.amount + asset?.data?.userIncome - asset?.data?.userExpense} 원</div>
                    </div>
                </div>
                <MaginotLineChart />
                <MaginotGoal />
                <MaginotFixed />
            </div>
        </div>
    )
}

export default MoneyBookMaginotLine