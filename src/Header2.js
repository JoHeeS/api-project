import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function App2() {
    return (
      <>
        <Datas />
      </>
    );
  }
  
  
  function fetchData() {
    const endPoint = "http://apis.data.go.kr/3510500/illegal_parking_control_cctv/getList";
    const serviceKey = "Mf%2F7uAm3gWBUG7QaksqnTq7Oh7SBMCpvQl6%2F34k3Pp3fqR664rCOqarH0ikdFN7uJNbr6Zg7wgJ6GyhpWgdw0A%3D%3D";
    const type = "json";
    const pageNo = 1;
    const numOfRows = 10;
  
    const url = `${endPoint}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=${type}`;
  
    const promise = fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      
      return promise
  }
  
  function Datas() {
    const [datas, setDatas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setIsLoaded(false);
      setError(null);
  
      fetchData()
        .then((data) => {
  
          setDatas(data)
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setIsLoaded(true))
    }, []);
  
  
  
    if (error) {
      return <p>Failed to fetch data.</p>;
    }
  
    if (!isLoaded) {
      return <p>Loading data...</p>;
    }
  
    const chartData = {
      "한나루로": 0,
      "인주대로": 0,
      "경인로": 0
    };
  
  
  
    var accidents = datas.response.body.items.item;
  
    for( var i = 0; i<accidents.length; i++){
      var placeName = accidents[i].ist_place;
  
      if (placeName.indexOf("한나루로") > 0) {
  
          chartData["한나루로"] ++;
      }
      if (placeName.indexOf("인주대로") > 0) {
          chartData["인주대로"] ++;
      }
      if (placeName.indexOf("경인로") > 0) {
          chartData["경인로"] ++;
      }
    }
  
    console.log(accidents);
  
    return (
      <>
          <h3 style={{ textAlign: 'center' }}>인천광역시 미추홀구_불법주정차단속CCTV</h3>
          <Chart chartData={chartData} />
          <KakaoMap accidents={datas.response.body.items.item} />
  
      </>
    )
  }
  
  function Chart({ chartData }) {
    const chartDataArray = Object.entries(chartData).map(([name, cctv]) => ({ name, cctv }));
  
    return (
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartDataArray} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cctv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  function KakaoMap({ accidents }) {
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
  
    const MapDatas = filteredAccidents.map((accident) => {
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