import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useState } from 'react';

const locations = [
    { title: '카카오', latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: '생태연못', latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: '텃밭', latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: '근린공원', latlng: { lat: 33.451393, lng: 126.570738 } },
];

const KakaoMap = () => {
    const [level, setLevel] = useState(3);
    return (
        <Map
            center={{ lat: 33.450701, lng: 126.570667 }}   // 지도의 중심 좌표
            style={{ width: '800px', height: '600px', margin: "50px" }} // 지도 크기
            level={level}                                   // 지도 확대 레벨
        >
            {locations.map((loc, idx) => (
                <MapMarker
                    key={`${loc.title}-${loc.latlng}`}
                    position={loc.latlng}
                    image={{
                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                        size: { width: 24, height: 35 },
                    }}
                    title={loc.title}
                />
            ))}
            <div className='flex items-center justify-center gap-3'>
                <button className='px-5 py-2 border rounded' onClick={() => setLevel(level + 1)}>-</button>
                <button className='px-5 py-2 border rounded' onClick={() => setLevel(level - 1)}>+</button>
            </div>
        </Map>);
};

export default KakaoMap