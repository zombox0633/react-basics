import React, {useState} from 'react'
import styled from 'styled-components'
import { ButtonDefault } from '../Header'

import SubMainBasic from './SubMainBasic'
import PostImg from './PostImg'


const MainBasicBody = styled.div`
  display: block;
  margin: 0 5%;
  
`
const Head = styled.div`
  display: flex;
  align-items: center;
  h1{
    margin-right: 3rem;
    user-select: none;
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
  const {ImgData} = props //การสร้าง props มาทำการรับค่าที่รับจาก component แม่ *ชื่อ props ที่อยู่ใน component แม่กับลูกต้องตรงกัน

  const [selected, setSelected] = useState(null) // [selected ส่วนนี้สำหรับการนำไปใช้งาน, setSelected ส่วนนี้สำหรับการเปลี่ยนแปลงค่าใน useState] = useState(null การกำหนดค่าเริ่มต้นให้ useState)

  const onImgOpenClick = (TheData) => { // การสร้าง Arrow function * TheData = parameter ใช้ในการรับค่าและไปใช้งานต่อใน function
    setSelected(TheData) // การเปลียนแปลงค่าของ useState selected จะเปลียนแปลงได้ต้องใช้ setSelected ในการเปลี่ยนแปลงค่า
  }
  const onImgCloseClick = () => {
    setSelected(null)
  }

  let ImgPost = null //การกำหนดให้ตัวแปรเป็น null *ต้องใช้ let ใช้ const ไม่ได้เพราะ const ไม่สามารถเปลี่ยนแปลงค่าได้
  if(!!selected){ //ถ้าเป็น true จะเข้าเงือนไข หรือ ถ้า selected มีค่าไม่เป็น null หรือ undefined จะเข้าเงือนไข
    ImgPost = <PostImg //ถ้าเข้าเงือนไข ImgPost จะมีค่าเป็น component PostImg.jsx
    Data={selected} // ส่งค่าที่อยู่ใน selected useState ในรูปแบบ props ที่เป็นตัวกำหนดการแสดงข้อมูใน PostImg.jsx
    onClickBg={onImgCloseClick} //ทำการส่ง function ให้ PostImg.jsx ในการใช้งาน
    /> 
  }
  
  const ImgDataElements = ImgData.map((Data,index) => { //ส่งข้อมูลที่มีข้อมูลจำนวนหรือในรูปแบบ Object หรือ Array จำเป็นต้องทำการ map ข้อมูล
    return( 
    <SubMainBasic key={index} //จำเป็นต้องใส่ key เมื่อทำการ map เฉพาะ React
      Data={Data}  //การส่งค่าให้ component ลูก SubMainBasic.jsx เพื่อใช้งานต่อ
      onImgOpenClick = {onImgOpenClick} // onImgOpenClick เป็น props SubMainBasic.jsx 
    />)
  })

  return (
    <MainBasicBody>
      <Head>
        <h1>MainBasic</h1>
        <ButtonDefault onClick={onImgOpenClick} //ไม่แสดงรูปเพราะไม่มี parameter ในการรับค่า *อย่ากด
        //onClick การใส่ function ที่สร้างภายนอกแล้วทำการรับค่า หรือ การสร้าง Arrow function ใน onClick ก็ได้ไม่สามรถสร้าง function ธรรมดาภายในได้
        >Click</ButtonDefault>
        <div>
          
        </div>
      </Head>
      <DivGrid>
        {ImgDataElements} {/* การใช้งาน ตัวแปร หรือ function ใน return function*/}
      </DivGrid>
      {ImgPost}
    </MainBasicBody>
  )
}

export default MainBasic
