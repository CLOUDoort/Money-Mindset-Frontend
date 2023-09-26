import { GoalData, graph_color } from '../../../types'
import { end_date, start_date } from '../MoneyBookNav'

import MaginotLineDetail from './MaginotLineDetail'
import { ResponsiveLine } from '@nivo/line'
import { useGetAssetData } from '../../../react-query/AssetData'
import { useGetChartData } from '../../../react-query/Expense/ExpenseChartData'
import { useGetGoalData } from '../../../react-query/MaginotData/MaginotGoalData'

const MaginotLineChart = () => {
    const { data: flow_data } = useGetChartData({ start_date, end_date })
    const { data: asset } = useGetAssetData()
    const { data: goal_data } = useGetGoalData()
    const chart_data = [
        {
            id: "지출",
            color: 'hsl(331, 70%, 50%)',
            data: flow_data?.data.length ? flow_data?.data : [{ x: 0, y: 0 }]
        },
    ]

    // 방어선 
    const currentAsset = asset?.data?.amount + asset?.data?.userIncome - asset?.data?.userExpense - asset?.data?.fixedExpenditureAmount
    let sum = 0;
    const lineData = goal_data?.data?.map((line: GoalData) => {
        sum += line.amount
        return {
            idx: line.idx,
            legend: line.goal,
            value: currentAsset - sum
        }
    })
    lineData?.unshift({ idx: 100, legend: "생존", value: currentAsset })


    // 마커
    const markerCurrentAsset = asset?.data?.amount + asset?.data?.userIncome - asset?.data?.fixedExpenditureAmount
    sum = 0
    const markers = goal_data?.data?.map((element: GoalData, index: number) => {
        sum += element.amount
        return {
            axis: "y",
            lineStyle: {
                stroke: graph_color[index + 1],
                strokeWidth: 4,
            },
            value: markerCurrentAsset - sum,
            legendPosition: "right",
        }
    })
    markers?.unshift({
        axis: "y",
        lineStyle: {
            stroke: graph_color[0],
            strokeWidth: 4,
        },
        value: markerCurrentAsset,
        legendPosition: "right",
    })
    const maxMarker = asset?.data?.amount + asset?.data?.userIncome + asset?.data?.userExpense + 100000
    return (
        <>
            {/* 방어선 */}
            <MaginotLineDetail lineData={lineData} />
            {/* 차트 */}
            <div className='h-[40rem] w-full'>
                <ResponsiveLine
                    data={chart_data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: maxMarker,
                        stacked: true,
                        reverse: false
                    }}
                    markers={markers}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={{
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '지출 날짜',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendOffset: -40,
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 10,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </>
    )
}

export default MaginotLineChart