import React,{useEffect,useState} from 'react'
import Popup from './Popup'

function UseEffect() {
  const time = Date.now()
  //useState
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  //console.log(isPopupOpen);

  //useEffect
  useEffect(()=>{ //การทำงานของ useEffect จะอยู่ในรูปแบบ function *ส่วนใหญ่ใช้ในการทำงานกับการโหลดตัวข้อมูลภายนอก หรือใช้ใน hook
    console.log(`App effect count = ${count}`);

    return () => { //ส่วน return ของ useEffec จะทำงานก็ต่อเมื่อส่วนก่อน return useEffect ทำงานเสร็จ
      //*แต่ตอนโหลดหน้า web ตอนแรกจะไม่แสดงการทำงานของ return ของ useEffect จะมาทำงานอีกทีตอนเกิดการกระทำการโดย [count]
      console.log(`App effect return count = ${count}`);
    }
  }, [count])// [count] ด้านหลังคือตัวรวบรวมปัจจัย หรือ การกระทำที่จะทำให้ UseEffect กลับมา run ใหม่ *เมื่อ count มีการเปลี่ยนแปลงตัว useEffect จะทำงาน
  //*กรณีที่ 1 ไม่ใส่ตัว [] คือ UseEffect จะจับทุกสิ่งทุกอย่างที่กระทำในหน้า wed *ในไฟล์ที่ใช้ UseEffect นี้เท่านั้น
  //*กรณีที่ 2 ใส่ตัว [] แต่ไม่ใส่ค่าในวงเล็บ คือ ตัว UseEffect จะไม่จับการทำงานอะไรเลย แต่จะทำงานตอนเปิดหน้า web ครั้งเดียว

  useEffect(() => { // useEffect นี้ใช้ในการโหลดข้อมูล
    fetch('https://reqres.in/api/users?page=2').then((res) => { //โหลดข้อมูลจาก https://reqres.in/api/users?page=2 *then เมื่อตัวเก่าทำทำเสร็จใน then จะทำงานต่อ
      return res.json(); //ทำการ res(parameter) แปลงเป็นไฟล์ json
    }).then((resJon) => { //*then เมื่อทำเสร็จ
      //console.log(resJon);
      setUsers(resJon.data); //นำข้อมูลที่แปลงแล้วไปใส่ใน useState Users
    })
  }, [])//มันจะทำงานครั้งแรกแค่ครั้งเดียวเพราะไม่ได้กำหนดปัจจัยในการที่มันจะทำงานต่อ
  
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
    <div>
      <div>
        <div>
          <h2>useEffect</h2>
          <div>
            <button onClick={
              () => setCount((p) => p+1)}
            >Add</button>
            <button onClick={
              () => setIsPopupOpen(true)}
            >Open</button>
          </div>
        </div>
        {popup}
        {userElements}
      </div>
    </div>
  )
}

export default UseEffect