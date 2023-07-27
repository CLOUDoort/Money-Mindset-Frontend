import { ExpenseStatisticsType, graph_color } from '../../../type'
import { useEffect, useState } from 'react'

import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdOutlineSpeakerNotesOff } from 'react-icons/md'
import { ResponsivePie } from '@nivo/pie'

const ExpenseStatisticsModal = ({ click, data }: { click: () => void, data: any }) => {
    const [stData, setData] = useState([])
    useEffect(() => {
        const statistic_data = data?.data?.map((element: ExpenseStatisticsType, index: number) => {
            return {
                id: element.label,
                label: element.label,
                value: element.value,
                color: graph_color[index]
            }
        })
        setData(statistic_data)
    }, [data?.data])
    return (
        <div className='w-[50rem] relative flex justify-center'>
            <AiOutlineArrowRight className='absolute cursor-pointer right-5 top-5' size={25} onClick={click} />
            <div className='h-[40rem] w-[45rem]'>
                {!stData.length ?
                    <div className='flex items-center justify-center w-full h-full m-auto text-2xl font-semibold'>
                        <MdOutlineSpeakerNotesOff size={50} />
                    </div>
                    :
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
                }
            </div>
        </div>
    )
}

export default ExpenseStatisticsModal