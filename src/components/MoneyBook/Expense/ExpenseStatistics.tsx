import { AiOutlineArrowRight } from 'react-icons/ai'
import { ResponsivePie } from '@nivo/pie'
import { useGetExpenseStatisticsData } from '../../../react-query/Expense/ExpenseStatisticsData'
import { end_date, start_date } from '../MoneyBookNav'
import { useEffect, useState } from 'react'

const color = [
    "#ff0000",
    "#490184",
    "#1d039d",
    "#3e6ab0",
    "#135607",
    "#d9f409",
    "#ee8803",
]
const data = [
    {
        "id": "erlang",
        "label": "erlang",
        "value": 397,
        "color": "hsl(85, 70%, 50%)"
    },
    {
        "id": "rust",
        "label": "rust",
        "value": 523,
        "color": "hsl(162, 70%, 50%)"
    },
    {
        "id": "lisp",
        "label": "lisp",
        "value": 259,
        "color": "hsl(42, 70%, 50%)"
    },
    {
        "id": "javascript",
        "label": "javascript",
        "value": 260,
        "color": "hsl(171, 70%, 50%)"
    },
    {
        "id": "hack",
        "label": "hack",
        "value": 335,
        "color": "hsl(170, 70%, 50%)"
    }
]

type StatisticsType = {
    id: number,
    label: string,
    value: number,
}

const ExpenseStatistics = ({ click, modalData }: { click: () => void, modalData: number }) => {
    const { data: statistic } = useGetExpenseStatisticsData({ start_date, end_date, flow_type: modalData })
    console.log('static', modalData)
    const [stData, setData] = useState([])
    useEffect(() => {
        const statistic_data = statistic?.data.map((element: StatisticsType, index: number) => {
            return {
                id: element.label,
                label: element.label,
                value: element.value,
                color: color[index]
            }
        })
        setData(statistic_data)
    }, [statistic])
    return (
        <div className='w-[50rem] relative flex justify-center'>
            <AiOutlineArrowRight className='absolute cursor-pointer right-5 top-5' size={25} onClick={click} />
            <div className='h-[40rem] w-[45rem]'>
                <ResponsivePie
                    data={stData}
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
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'c'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'go'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'python'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'scala'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'lisp'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'elixir'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'javascript'
                            },
                            id: 'lines'
                        }
                    ]}
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
            </div>
        </div>
    )
}

export default ExpenseStatistics