import { Map, MapMarker } from 'react-kakao-maps-sdk';

import CurrentPosition from '../CurrentPosition';
import { expenseLocation } from '../../../store/initialState';
import { useAtom } from 'jotai';

const ExpenseMap = ({ lat, lng }: { lat: number | undefined, lng: number | undefined }) => {
    // 현재 위치
    const { latitude, longitude } = CurrentPosition()
    // 내가 클릭한 위치
    const [position, setPosition] = useAtom(expenseLocation)

    // 내가 저장한 위치, 저장한 위치가 없으면 현재 위치로 표시
    const location = { lat: lat ? lat : latitude, lng: lng ? lng : longitude }

    return (
        <div className='flex items-center m-3 border rounded'>
            <Map
                center={{ lat: lat ? lat : latitude, lng: lng ? lng : longitude }}
                style={{ width: '100%', height: '15rem' }}
                level={3}
                onClick={(_t, MouseEvent) => setPosition({
                    lat: MouseEvent.latLng.getLat(),
                    lng: MouseEvent.latLng.getLng()
                })}
            >
                {/* 내가 저장한 위치, 저장한 위치가 없으면 현재 위치로 표시 */}
                <MapMarker
                    key={`${location.lat}`}
                    position={location}
                    image={{
                        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                        size: { width: 24, height: 35 },
                    }}
                />
                {/* 내가 클릭한 위치 */}
                <MapMarker
                    key={`${position.lat}`}
                    position={position}
                    image={{
                        src: '/bluepng.png',
                        size: { width: 24, height: 35 },
                    }}
                />
            </Map>
        </div>
    )
};

export default ExpenseMap