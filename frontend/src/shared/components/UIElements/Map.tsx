import React, { useRef, useEffect } from 'react';

import './Map.scss';

declare global {
    interface Window {
        google: any
    }
}

interface ILocation {
    lat: number;
    lng: number;
}
interface MapProps {
    className?: string,
    style?: any,
    center?: ILocation,
    zoom?: number
}


const Map: React.FC<MapProps> = ({ className, style, center, zoom }) => {
    const mapRef: any = useRef();

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });
        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom])

    return <div ref={mapRef} className={`map ${className}`} style={style}></div>
}

export default Map;


