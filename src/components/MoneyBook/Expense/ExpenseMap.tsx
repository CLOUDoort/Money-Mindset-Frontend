import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

import { expenseLocation } from '../../../store/initialState';
import { useAtom } from 'jotai';

const ExpenseMap = ({ lat, lng }: any) => {
    const [location, setLoacation] = useState({
        latitude: 0,
        longitude: 0
    }); // 현재 위치를 저장할 상태
    const { latitude, longitude } = location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    }, []);
    const successHandler = (response: { coords: { latitude: number, longitude: number } }) => {
        const { latitude, longitude } = response.coords;
        setLoacation({ latitude, longitude });
    };

    const errorHandler = (error: any) => console.log(error);

    const locations = [
        { title: '현재 위치', latlng: { lat: lat ? lat : latitude, lng: lng ? lng : longitude } },
    ];

    const [position, setPosition] = useAtom(expenseLocation)
    return (
        <div className='flex items-center'>
            {location &&
                <Map
                    center={{ lat: latitude, lng: longitude }}
                    style={{ width: '100%', height: '15rem' }}
                    level={3}
                    onClick={(_t, MouseEvent) => setPosition({
                        lat: MouseEvent.latLng.getLat(),
                        lng: MouseEvent.latLng.getLng()
                    })}
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
                </Map>
            }
        </div>
    )
};

export default ExpenseMap