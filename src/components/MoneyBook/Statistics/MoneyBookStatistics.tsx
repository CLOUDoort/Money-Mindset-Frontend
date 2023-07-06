import { end_date, start_date } from "../MoneyBookNav"
import { end_date_string, start_date_string } from "../MaginotLine/MoneyBookMaginotLine"
import { useGetExpenseStatisticsIncomeData, useGetExpenseStatisticsOutcomeData } from "../../../react-query/Expense/ExpenseStatisticsData"

import ExpenseStatistics from "./ExpenseStatistics"
import KakaoMap from "../KakaoMap"
import { ResponsiveRadar } from '@nivo/radar'

const data = [
    {
        "taste": "fruity",
        "chardonay": 102,
        "carmenere": 46,
        "syrah": 79
    },
    {
        "taste": "bitter",
        "chardonay": 96,
        "carmenere": 65,
        "syrah": 32
    },
    {
        "taste": "heavy",
        "chardonay": 40,
        "carmenere": 93,
        "syrah": 54
    },
    {
        "taste": "strong",
        "chardonay": 99,
        "carmenere": 55,
        "syrah": 85
    },
    {
        "taste": "sunny",
        "chardonay": 120,
        "carmenere": 89,
        "syrah": 47
    }
]

const MoneyBookStatistics = () => {
    const { data: in_static } = useGetExpenseStatisticsIncomeData({ start_date, end_date, flow_type: 0 })
    const { data: out_static } = useGetExpenseStatisticsOutcomeData({ start_date, end_date, flow_type: 1 })
    return (
        <div className="lg:ml-52 ml-14 bg-[#fbfbfb] min-w-[55rem] w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center max-w-[65rem] lg:p-5 min-w-[50rem]">
                <div className="flex items-center w-full gap-3 my-5 mt-10 text-2xl font-semibold">
                    <div>{start_date_string} ~</div>
                    <div>{end_date_string}</div>
                </div>
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
                <div className="h-[40rem] w-full">
                    <ResponsiveRadar
                        data={data}
                        keys={['chardonay', 'carmenere', 'syrah']}
                        indexBy="taste"
                        valueFormat=">-.2f"
                        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                        borderColor={{ from: 'color' }}
                        gridLabelOffset={36}
                        dotSize={10}
                        dotColor={{ theme: 'background' }}
                        dotBorderWidth={2}
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        motionConfig="wobbly"
                        legends={[
                            {
                                anchor: 'top-left',
                                direction: 'column',
                                translateX: -50,
                                translateY: -40,
                                itemWidth: 80,
                                itemHeight: 20,
                                itemTextColor: '#999',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
                <KakaoMap />
            </div>
        </div>
    )
}

export default MoneyBookStatistics