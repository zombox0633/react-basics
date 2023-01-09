import React, {useState} from 'react'
import styled from 'styled-components'
import { ButtonDefault,Body} from '../style/Style'

import SubMainBasic from './SubMainBasic'
import PostImg from './PostImg'



const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    display: flex;
    align-items: center;
    h1{
    margin-right: 3rem;
    user-select: none;
    }
  }
  input{
    width: 10rem;
    height: 1.2rem;
    border: 1px solid #fff;
    border-radius: 6px;
    background-color: #333;
    color: #fff;
  }
`
const DivGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 800px;
  gap: 1rem; // gap คือ column-gap & row-gap
  margin-top: 2.5rem;
  margin-left: auto;
  margin-right: auto;
`

function MainBasic(props) {
  //การสร้าง props มาทำการรับค่าที่รับจาก component แม่ *ชื่อ props ที่อยู่ใน component แม่กับลูกต้องตรงกัน
  const {ImgData} = props 

  //[selected ส่วนนี้สำหรับการนำไปใช้งาน, setSelected ส่วนนี้สำหรับการเปลี่ยนแปลงค่าใน useState] = useState(null การกำหนดค่าเริ่มต้นให้ useState)
  const [selected, setSelected] = useState(null)
  const [searchText, setSearchText] = useState('')

  //การสร้าง Arrow function * TheData = parameter ใช้ในการรับค่าและไปใช้งานต่อใน function
  const onImgOpenClick = (TheData) => {
    //การเปลียนแปลงค่าของ useState selected จะเปลียนแปลงได้ต้องใช้ setSelected ในการเปลี่ยนแปลงค่า
    setSelected(TheData) 
  }

  //ทำการเปลี่ยนค่าเป็นสถานะเริ่มต้นเพื่อปิดตัวรูปภาพ
  const onImgCloseClick = () => {
    setSelected(null)
  }

   //การกำหนดให้ตัวแปรเป็น null *ต้องใช้ let ใช้ const ไม่ได้เพราะ const ไม่สามารถเปลี่ยนแปลงค่าได้
  let ImgPost = null
  //ถ้าเป็น true จะเข้าเงือนไข หรือ ถ้า selected มีค่าไม่เป็น null หรือ undefined จะเข้าเงือนไข
  if(!!selected){ 
    //ImgPost ถ้าเข้าเงือนไข ImgPost จะมีค่าเป็น component PostImg.jsx
    // Data ส่งค่าที่อยู่ใน selected useState ในรูปแบบ props ที่เป็นตัวกำหนดการแสดงข้อมูใน PostImg.jsx
    //onImgCloseClick ทำการส่ง function ให้ PostImg.jsx ในการใช้งาน
    ImgPost = <PostImg 
    Data={selected} 
    onClickBg={onImgCloseClick}
    /> 
  }
  
  //filter จะเช็คตัวที่เหมือนมันใน Array ถูกตัว
  //filter จะทำการเลือกตัวที่ใส่มาใน input ว่ามีตรงกับใน ImgData หรือป่าว
  //includes(ข้อความที่จะค้นหา) มีหน้าที่ตรวจสอบว่ามีข้อความนั้นอยู่หรือป่าวใน Data.title
  const filteredImg = ImgData.filter((Data) => { 
    return Data.title.includes(searchText) 
  })

  //ส่งข้อมูลที่มีข้อมูลจำนวนหรือในรูปแบบ Object หรือ Array จำเป็นต้องทำการ map ข้อมูล
  //ทำการเปลี่ยนตัว ImgData เป็น filteredImg ในการตรวจสอบการค้นหาใน searchText
  const ImgDataElements = filteredImg.map((Data,index) => { 
    return( 
      //จำเป็นต้องใส่ key เมื่อทำการ map เฉพาะ React
      //Data การส่งค่าให้ component ลูก SubMainBasic.jsx เพื่อใช้งานต่อ
      // onImgOpenClick เป็น props SubMainBasic.jsx 
    <SubMainBasic key={index} 
      Data={Data}  
      onImgOpenClick = {onImgOpenClick} 
    />)
  })

  return (
    <Body>
      <Head>
        <div>
          <h1>MainBasic</h1>
          {/* ไม่แสดงรูปเพราะไม่มี parameter ในการรับค่า *อย่ากด
              onClick การใส่ function ที่สร้างภายนอกแล้วทำการรับค่า หรือ การสร้าง Arrow function ใน onClick ก็ได้ไม่สามรถสร้าง function ธรรมดาภายในได้
          */}
          <ButtonDefault onClick={onImgOpenClick}
          >Click</ButtonDefault>
        </div>
        <div>
          <input type="text"
          //value ค่าที่ถูกนำข้อมูลมาใส่ input
          // event จะทำงานทุกครั้งที่ input มีการเปลี่ยนแปลง
          placeholder='search' 
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value) 
          }} 
          />
        </div>
      </Head>
      <DivGrid>
        {/* การใช้งาน ตัวแปร หรือ function ใน return function*/}
        {ImgDataElements} 
      </DivGrid>
      {ImgPost}
    </Body>
  )
}

export default MainBasic
