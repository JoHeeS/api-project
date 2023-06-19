
import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import KakaoMap from './Map'


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

export default function Datas() {
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
    // console.log(accidents[i].ist_place)
        chartData["한나루로"] ++;
    }
    if (placeName.indexOf("인주대로") > 0) {
        chartData["인주대로"] ++;
    }
    if (placeName.indexOf("경인로") > 0) {
        chartData["경인로"] ++;
    }
  }

  return (
    <>
        <h1>App</h1>
        <p>Total: {datas.response.totalCount}</p>
        <Chart chartData={chartData} />
        <KakaoMap accidents={datas.response.body.items.item} />

    </>
  )
}

