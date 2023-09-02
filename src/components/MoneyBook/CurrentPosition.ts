import { useEffect, useState } from "react";

const CurrentPosition = () => {
    // 현재 위치를 저장
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0
    })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
    }, []);
    const successHandler = (response: { coords: { latitude: number, longitude: number } }) => {
        const { latitude, longitude } = response.coords;
        setLocation({ latitude, longitude });
    };
    const errorHandler = (error: any) => console.log(error);

    return location
}

export default CurrentPosition