import { FlowDataType, MapDataType } from "../../../types"
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import NoItem from "../NoItem";
import { useState } from "react"

const CalendarKakaoMap = ({ flow_data }: { flow_data: any }) => {
    const flowMapData = flow_data?.filter((item: FlowDataType) => item.flowDetail)?.map((item: FlowDataType) => {
        return {
            content: <div className='p-2'>{item?.flowDetail?.detail}</div>,
            flow_idx: item?.flowDetail?.flow_idx,
            flow_id: item?.flow_id,
            lat: item?.flowDetail?.lat,
            lng: item?.flowDetail?.lng
        }
    })

    const EventMarkerContainer = ({ position, content, flow_id }: {
        position: {
            lat: number;
            lng: number;
        }, content: JSX.Element, flow_id: number
    }) => {
        const [isVisible, setIsVisible] = useState(false)
        return (
            <MapMarker position={position} onMouseOver={() => setIsVisible(true)} onMouseOut={() => setIsVisible(false)} image={{
                src: `${flow_id <= 4 ? '/bluepng.png' : '/redpng.png'}`,
                size: { width: 24, height: 35 },
            }}>
                {isVisible && content}
            </MapMarker>
        )
    }
    return (
        <div className='w-full h-[30rem] border rounded flex items-center justify-center'>
            {flowMapData?.length
                ? <Map
                    center={{ lat: flowMapData[0]?.lat, lng: flowMapData[0]?.lng }}
                    style={{ width: '100%', height: '30rem' }}
                    level={6}
                >
                    {flowMapData?.map((value: MapDataType) => (
                        <EventMarkerContainer key={value.flow_idx} position={{ lat: value.lat, lng: value.lng }} content={value.content} flow_id={value.flow_id} />
                    ))}
                </Map>
                : <NoItem styleProp="w-full h-[30rem]" />}
        </div>
    )
}

export default CalendarKakaoMap