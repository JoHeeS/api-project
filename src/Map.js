import React, { useEffect, useState, useMap} from 'react';
import { Map, MapMarker} from 'react-kakao-maps-sdk';



export default function KakaoMap( { accidents }){
    const MapDatas = accidents.map(accident =>{
        return{
            content: accident.ist_place,
            latlng: { lat: accident.lat, lng: accident.lot}
        }
    })

    const EventMarkerContainer = ({ MapDatas}) => {
        const map = useMap()
        const [isVisible, setIsVisible] = useState(false)

        return(
            <MapMarker
                position={MapDatas.latlng}
                onClick={(marker)=> map.panTo(marker.getPosition())}
                onMouseOver={()=> setIsVisible(true)}
                onMouseOut={()=> setIsVisible(false)}
            >
                {isVisible && MapDatas.content}
            </MapMarker>
        )

    }

    console.log(MapDatas);

    return(
        <Map
            center = {{
                lat: 37.450668,
                lng: 126.687214,
            }}
            style={{
                width: "100%",
                height: "450px",
            }}
            level={5}
        >
            {MapDatas.map((MapData) =>(
                <EventMarkerContainer
                key={`EventMarkerContainer-${MapData.latlng.lat}-${MapData.latlng.lng}`}
                position={MapData.latlng}
                content={MapData.content}
              />
            ))}
        </Map>
    )

//     return(
//         <Map
//             center={{
//                 lat: 37.450668,
//                 lng: 126.687214,
//             }}
//             style={{
//                 width: "100%",
//                 height: "450px",
//             }}
//             level={5}
//         >
//             {MapDatas.map((MapData, index) =>(
//                 <MapMarker
//                     key = {`${MapData.title}-${MapData.latlng}`}
//                     position={MapData.latlng}
//                     image={{
//                         src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
//                         size: {
//                           width: 24,
//                           height: 35
//                         },
//                     }}

//                     title={MapData.title}
//                 />
//             ))}
//         </Map>
//     )

}