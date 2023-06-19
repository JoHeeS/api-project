
import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import Map from './Map';

function fetchData() {
  const endPoint = "http://apis.data.go.kr/3510500/illegal_parking_control_cctv/getList";
  const serviceKey = "Mf%2F7uAm3gWBUG7QaksqnTq7Oh7SBMCpvQl6%2F34k3Pp3fqR664rCOqarH0ikdFN7uJNbr6Zg7wgJ6GyhpWgdw0A%3D%3D";
  const type = "json";
  const pageNo = 1;
  const numOfRows = 10;

  const url = `${endPoint}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=${type}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    })
    .then(data => {
      const items = data.response.body.items.item;
      const modifiedItems = items.map(item => {
        const { ist_place, lat, lot, ...rest } = item;
        return { ist_place, lat, lot, data: rest };
      });
      const lat = items[0].lat; // 첫 번째 아이템의 'lat' 값
      const lot = items[0].lot; // 첫 번째 아이템의 'lot' 값
      return { modifiedItems, lat, lot };
    });
}

export default function Datas() {
  const [datas, setDatas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState('');
  const [lot, setLot] = useState('');
  const [istPlace, setIstPlace] = useState('');

  useEffect(() => {
    setIsLoaded(false);
    setError(null);

    fetchData()
      .then(({ modifiedItems, lat, lot }) => {
        setDatas(modifiedItems);
        setLat(lat);
        setLot(lot);
        setIstPlace(modifiedItems[0]?.ist_place); // 첫 번째 아이템의 'ist_place' 값을 설정합니다.
        setIsLoaded(true);
      })
      .catch(error => {
        setError(error);
        setIsLoaded(true);
      });
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

  datas.forEach(data => {
    if (data && data.ist_place && data.ist_place.includes("한나루로")) {
      chartData["한나루로"]++;
    } else if (data && data.ist_place && data.ist_place.includes("인주대로")) {
      chartData["인주대로"]++;
    } else if (data && data.ist_place && data.ist_place.includes("경인로")) {
      chartData["경인로"]++;
    }
  });

  return (
    <>
      <Chart chartData={chartData} />
      {/* <Map lat={lat} lot={lot} istPlace={istPlace} /> */}
      {/* <Map MapData = {{lat}, {lot}, {istPlace}}/> */}
    </>
  );
}