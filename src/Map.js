import React, { useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

export default function KakaoMap({ accidents }) {
  const [filter, setFilter] = useState(null);

  const filteredAccidents = accidents.filter((accident) => {
    if (filter === '경인로') {
      return (
        accident.no === 10 ||
        accident.no === 9 ||
        accident.no === 6 ||
        accident.no === 5
      );
    }
    if (filter === '한나루로') {
      return accident.no === 8 || accident.no === 1;
    }
    if (filter === '인주대로') {
      return (
        accident.no === 2 ||
        accident.no === 3 ||
        accident.no === 7 ||
        accident.no === 4
      );
    }
    if (filter === '미추홀구') {
      return true; 
    }
    return false;
  });

  const MapDatas = accidents.map((accident) => {
    return {
      content: accident.ist_place,
      latlng: { lat: accident.lat, lng: accident.lot },
      num: accident.no,
    };
  });

  const EventMarkerContainer = ({ MapData }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={MapData.latlng}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && MapData.content}
      </MapMarker>
    );
  };

  const handleFilterButtonClick = (filter) => {
    setFilter(filter);
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <button onClick={() => handleFilterButtonClick('경인로')}>경인로</button>
        <button onClick={() => handleFilterButtonClick('한나루로')}>한나루로</button>
        <button onClick={() => handleFilterButtonClick('인주대로')}>인주대로</button>
        <button onClick={() => handleFilterButtonClick('미추홀구')}>미추홀구</button>
    </div>
      <Map
        center={{
          lat: 37.45184,
          lng: 126.6764592,
        }}
        style={{
          width: '100%',
          height: '450px',
        }}
        level={6}
      >
        {MapDatas.map((MapData) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${MapData.latlng.lat}-${MapData.latlng.lng}`}
            MapData={MapData}
          />
        ))}
      </Map>
    </>
  );
}