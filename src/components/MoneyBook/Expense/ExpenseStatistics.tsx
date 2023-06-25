import { useEffect, useState } from 'react'

import { AiOutlineArrowRight } from 'react-icons/ai'
import { ResponsivePie } from '@nivo/pie'

const color = [
    "#ff0000",
    "#490184",
    "#1d039d",
    "#3e6ab0",
    "#135607",
    "#d9f409",
    "#ee8803",
    "#d60101",
    "#694e80",
    "#50487c",
    "#3b4e6d",
    "#3f5d3a",
    "#dde3ad",
    "#f1d6b1",
]

type StatisticsType = {
    id: number,
    label: string,
    value: number,
}

const ExpenseStatistics = ({ click, data }: { click: () => void, data: any }) => {
    const [stData, setData] = useState([])
    useEffect(() => {
        const statistic_data = data?.data.map((element: StatisticsType, index: number) => {
            return {
                id: element.label,
                label: element.label,
                value: element.value,
                color: color[index]
            }
        })
        setData(statistic_data)
    }, [data?.data])
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