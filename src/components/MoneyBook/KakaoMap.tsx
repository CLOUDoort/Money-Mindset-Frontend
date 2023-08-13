import { FlowDetailType, MapDataType } from '../../type';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

import { MdOutlineSpeakerNotesOff } from 'react-icons/md';
import { useState } from 'react';

const KakaoMap = ({ flowMapData }: { flowMapData: FlowDetailType[] }) => {
    const data = flowMapData?.map((item: FlowDetailType) => {
        return {
            content: <div className='p-2'>{item?.detail?.detail}</div>,
            flow_idx: item?.detail?.flow_idx,
            flow_id: item?.flow_id,
            lat: item?.detail?.lat,
            lng: item?.detail?.lng
        }
    })
    const EventMarkerContainer = ({ position, content, flow_id }: {
        position: {
            lat: number;
            lng: number;
        }, content: JSX.Element, flow_id: number
    }) => {
        const map = useMap()
        const [isVisible, setIsVisible] = useState(false)
        return (
            <MapMarker position={position} onClick={(marker) => map.panTo(marker.getPosition())} onMouseOver={() => setIsVisible(true)} onMouseOut={() => setIsVisible(false)} image={{
                src: `${flow_id <= 4 ? '/bluepng.png' : '/redpng.png'}`,
                size: { width: 24, height: 35 },
            }}>
                {isVisible && content}
            </MapMarker>
        )
    }
    return (
        <div className='w-full h-[30rem] border rounded flex items-center justify-center'>
            {flowMapData[0]?.detail ? <Map
                center={{ lat: flowMapData[0]?.detail?.lat, lng: flowMapData[0]?.detail?.lng }}
                style={{ width: '100%', height: '30rem' }}
                level={6}
            >
                {data?.map((value: MapDataType) => (
                    <EventMarkerContainer key={value.flow_idx} position={{ lat: value.lat, lng: value.lng }} content={value.content} flow_id={value.flow_id} />
                ))}
            </Map> : <div className="w-full h-[30rem] border rounded flex items-center justify-center">
                <MdOutlineSpeakerNotesOff size={50} />
            </div>}
        </div>
    )
};

export default KakaoMap