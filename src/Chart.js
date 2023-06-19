import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ chartData }) {
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

// import React from 'react';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer
// } from "recharts";

// export default function Chart({ accidents }) {
//     console.log(accidents);
//     var name = 3;
//     var a = 0; // 경인로
//     var b = 0; // 인주대로
//     var c = 0; // 한나루로

//     for (var i=0; i<accidents.length; i++) {
//         var placeName = accidents[i].ist_place;

//         if (placeName.indexOf("경인로") > 0) {
//             // console.log(accidents[i].ist_place)
//             a++;
//         }

//         if (placeName.indexOf("인주대로") > 0) {

//             b++
//         }

//         if (placeName.indexOf("한나루로") > 0) {

//             c++
//         }
//     }

//     const chartData = accidents.map(accident => {
//         return {
//             name: accident.no,
//             경인로 : a,
//             인주대로: b,
//             한나루로 :c
//         }
//     })

//     return (
//         <div style={{ height: "300px" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             width={500}
//             height={300}
//             data={chartData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="경인로" fill="#0af" />
//             <Bar dataKey="인주대로" fill="#fa0" />
//             <Bar dataKey="한나루로" fill="#f00" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     )

    

// }

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export default function Chart({ chartData }) {
//   const chartDataArray = Object.entries(chartData).map(([name, cctv]) => ({ name, cctv }));

//   return (
//     <div style={{ height: '300px' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={chartDataArray} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="cctv" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }