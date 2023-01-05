import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainBasic from "./components/main/MainBasic";
import StateObject from "./components/StateObject";
import UseEffect from "./components/useEffect/UseEffect";

const ImgData = [
  {
    title: 'lighthouse',
    ImgUrl: "https://images.pexels.com/photos/14887465/pexels-photo-14887465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: 'Barn',
    ImgUrl: "https://images.pexels.com/photos/10924810/pexels-photo-10924810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: 'Mountains',
    ImgUrl: "https://images.pexels.com/photos/12139674/pexels-photo-12139674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: 'Snow',
    ImgUrl: "https://images.pexels.com/photos/2824673/pexels-photo-2824673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
]

function App() {
  
  return (
    <div>
      <Header/> {/* ทำการแสดงข้อมูล Header.jsx ใน component แม่ */}
      <Routes>{/* การกำหนดการจะใช้งาน Route หลายตัวจำเป็นต้องใส่ก่อน และใส่ <Route> ตัวลูกภายใน */}
        <Route path="/" //การกำหนดการเข้าหน้า wed
          element={<MainBasic // กำหนด component ที่จะใช้ในการแสดง 
          ImgData={ImgData} // การรับข้อมูลแบบ props ที่จะส่งข้อมูลไปยัง component ลูก ไม่สามารถส่งข้าม component ได้
          // การส่งข้อมูลจะสามารถส่งเป็น ตัวแปร,function,parameter,data หรือ useState และ etc... ก็สามารถส่งได้
          />} 
        />
        <Route path="/state_object"
        element={<StateObject/>}
        />
        <Route path="/use_effect"
        element={<UseEffect/>}
        />
      </Routes>
    </div>
  );
}

export default App;
