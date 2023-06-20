import React, { useEffect, useState, useRef} from 'react';
const { kakao } = window; // kakao 객체 생성


export default function Map () {
      // geolocation 을 통해 사용자의 위치정보를 얻음
      // 위치정보를 얻는 것을 성공했을 떄 handleGeoSucc 실행

    const [sidoName, setSidoName] = useState()
    const [cityName, setCityName] = useState()
    const [pm, setPm] = useState()
    const [aerosol, setAerosol] = useState()
    const [coValue , setCoValue] = useState()
    const [oValue, setOValue] = useState()


    navigator.geolocation.getCurrentPosition(handleGeoSucc);
    function handleGeoSucc(position) {
      const latitude = position.coords.latitude // 경도
      const longitude = position.coords.longitude // 위도
      // getMap(latitude, longitude);
      getSiDo(latitude, longitude);
      getMap(latitude,longitude);
    }
  
    function getMap (lat,lon) { 
      // handleGeoSucc 에서 전달받은 경도와 위도 값을 넘겨받음
      const container = document.getElementById('map'); 
      // 지도를 생성할 DOM 요소
      const options = { // 지도의 옵션
        center: new kakao.maps.LatLng(lat, lon), // 현재 위치의 위도와 경도
        level : 5 // 확대,축소 값
       };
      const kakaoMap = new kakao.maps.Map(container, options); 
    }

    function getSiDo (lat,lon) {
      fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,{
        method: "GET",
        headers: {
          "Authorization": `KakaoAK a5b7a199322f9ac423ee6a91c15b991c`
        }
      })
        .then(res => res.json())
        .then(data => {
          const siDo = data.documents[0].address.region_1depth_name
          const gunGu = data.documents[0].address.region_2depth_name
          getData(siDo,gunGu)
        })
      }

      function getData (siDo,gunGu) {
        const serviceKey = 'LgZUP47Qw1wq%2Fsk9qTEd3%2F8iWrddFDcGvqN4Ju7jLwyLl%2FSFIqWnVPdjRWfVdCUg%2F2jqorOjOBi0b7vZ%2Fkvftw%3D%3D'
        const endPoint = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'
        const numOfRows = 10;
        const pageNo = 1;
        const promise = fetch(`${endPoint}?serviceKey=${serviceKey}&returnType=json&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${siDo}&searchCondition=DAILY`)
        .then (res => res.json())
          .then(data => {
      
            const res = data.response.body.items
            const currentLocation = res.find((el,i) => {
              if (res[i].cityName === gunGu){
                return true
              }
            })
            console.log(currentLocation)
            setSidoName(currentLocation.sidoName)
            setCityName(currentLocation.cityName)
            setCoValue(currentLocation.coValue)
            setPm(currentLocation.pm10Value)
            setAerosol(currentLocation.pm25Value)
            setOValue(currentLocation.o3Value)
          })
      }

    return (
      <>
        <main className='p-8'>
          <div className='h-full w-full lg:flex'>
            <div className='lg:w-full'>
            <strong className='block text-center p-8 text-3xl'>{sidoName} {cityName}</strong>
              <ul className='w-full flex flex-wrap justify-center'>

                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    pm < 51 ? {backgroundColor:'#66ff00'} : 
                    pm < 101 ? {backgroundColor:'#0066ff'} :
                    pm < 250 ? {backgroundColor:'#ff0066'} :
                    {backgroundColor:'#ff0000'}
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>미세먼지 농도</h3>
                  <strong className='text-2xl text-white'>{pm} m3</strong>
                </li>

                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    pm < 51 ? {backgroundColor:'#66ff00'} : 
                    pm < 101 ? {backgroundColor:'#0066ff'} :
                    pm < 250 ? {backgroundColor:'#ff0066'} :
                    {backgroundColor:'#ff0000'}
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>초 미세먼지 농도</h3>
                  <strong className='text-2xl text-white'>{aerosol} m3</strong>
                </li>

                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    coValue < 30 ? {backgroundColor:'#0066ff'} : 
                    coValue < 500 ? {backgroundColor:'#ff0066'} :
                    {backgroundColor:'#ff0000'} 
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>일산화탄소 평균농도</h3>
                  <strong className='text-2xl text-white'>{coValue} ppm</strong>
                </li>
                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    oValue < 0.030 ? {backgroundColor:'#66ff00'} : 
                    oValue < 0.090 ? {backgroundColor:'#0066ff'} :
                    {backgroundColor:'#ff0000'} 
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>오존 평균농도</h3>
                  <strong className='text-2xl text-white'>{oValue} ppm</strong>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </>
    );
};

