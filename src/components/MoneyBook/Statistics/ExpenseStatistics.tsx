import { FlowDataType, graph_color } from '../../../types'
import { end_date, start_date } from '../MoneyBookNav'

import { MdOutlineSpeakerNotesOff } from 'react-icons/md'
import { ResponsivePie } from '@nivo/pie'
import { useGetFlowData } from '../../../react-query/Expense/ExpenseFlowData'

const ExpenseStatistics = ({ dataName }: { dataName: string }) => {
    const { data: flow_data } = useGetFlowData({ start_date, end_date })
    const statisticsData = flow_data?.data?.filter((item: FlowDataType) => {
        if (dataName === "수입") return item.flow_id <= 4
        else return item.flow_id > 4
    })?.map((item: FlowDataType, index: number) => {
        return {
            id: item.flowName,
            label: item.flowName,
            value: item.amount,
            color: graph_color[index]
        }
    })
    return (
        <div className='lg:h-[26rem] lg:w-[28rem] h-[20rem] w-[25rem] border rounded'>
            {!statisticsData?.length ?
                <div className='flex items-center justify-center w-full h-full m-auto text-2xl font-semibold'>
                    <MdOutlineSpeakerNotesOff size={50} />
                </div>
                :
                <ResponsivePie
                    data={statisticsData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
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
            }
        </div>
    )
}

export default ExpenseStatistics