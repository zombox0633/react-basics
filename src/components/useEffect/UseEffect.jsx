import React,{useEffect,useState} from 'react'
import Popup from './Popup'

import { ButtonDefault,Body } from '../style/Style'

function UseEffect() {
  
  //useState
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  //console.log(isPopupOpen);

  //useEffect
  //การทำงานของ useEffect จะอยู่ในรูปแบบ function *ส่วนใหญ่ใช้ในการทำงานกับการโหลดตัวข้อมูลภายนอก หรือใช้ใน hook
  useEffect(()=>{ 
    console.log(`App effect count = ${count}`);
    //ส่วน return ของ useEffec จะทำงานก็ต่อเมื่อส่วนก่อน return useEffect ทำงานเสร็จ
    //*แต่ตอนโหลดหน้า web ตอนแรกจะไม่แสดงการทำงานของ return ของ useEffect จะมาทำงานอีกทีตอนเกิดการกระทำการโดย [count]
    return () => { 
      console.log(`App effect return count = ${count}`);
    }
  }, [count])
  // [count] ด้านหลังคือตัวรวบรวมปัจจัย หรือ การกระทำที่จะทำให้ UseEffect กลับมา run ใหม่ *เมื่อ count มีการเปลี่ยนแปลงตัว useEffect จะทำงาน
  //*กรณีที่ 1 ไม่ใส่ตัว [] คือ UseEffect จะจับทุกสิ่งทุกอย่างที่กระทำในหน้า wed *ในไฟล์ที่ใช้ UseEffect นี้เท่านั้น
  //*กรณีที่ 2 ใส่ตัว [] แต่ไม่ใส่ค่าในวงเล็บ คือ ตัว UseEffect จะไม่จับการทำงานอะไรเลย แต่จะทำงานตอนเปิดหน้า web ครั้งเดียว

  // useEffect นี้ใช้ในการโหลดข้อมูล
  //โหลดข้อมูลจาก https://reqres.in/api/users?page=2 *then เมื่อตัวเก่าทำทำเสร็จใน then จะทำงานต่อ
  useEffect(() => {
    //ทำการ res(parameter) แปลงเป็นไฟล์ json
    //*then เมื่อทำเสร็จ
    fetch('https://reqres.in/api/users?page=2').then((res) => { 
      return res.json(); 
    }).then((resJon) => {
      //console.log(resJon);
      //setUsers(resJon.data) นำข้อมูลที่แปลงแล้วไปใส่ใน useState Users
      setUsers(resJon.data); 
    })
  }, [])
  //มันจะทำงานครั้งแรกแค่ครั้งเดียวเพราะไม่ได้กำหนดปัจจัยในการที่มันจะทำงานต่อ
  
  //Element
  const userElements = users.map((user, index) =>{ //การนำข้อมูล useState users มาทำการ map และแสดง
    return(
      <div key={index}>
        <p>{user.email}</p>
      </div>
    )
  })

  let popup = null
  if(!!isPopupOpen){
    popup = <Popup 
    onPopupClose = {() => setIsPopupOpen(false)} //เป็นการส่ง props ในรูปแบบ Arrow function 
    />
  }

  return (
    <Body>
      <div>
        <div>
          <h2>useEffect</h2>
          <div>
            <ButtonDefault onClick={
              () => setCount((p) => p+1)}
              style={{marginRight:'1rem'}} //การใช้ style ใน React return function จะต้องสร้าง {{style css ที่จะใช้}} จะไม่มีเว้นวรรค หรือ - จะเป็นตัวพิมใหญ่แทน
            >Add</ButtonDefault>
            <ButtonDefault onClick={
              () => setIsPopupOpen(true)}
            >Open</ButtonDefault>
          </div>
        </div>
        {popup}
        {userElements}
      </div>
    </Body>
  )
}

export default UseEffect