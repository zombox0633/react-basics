import React from 'react'
import styled from 'styled-components'

const SubMainBasicBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ImgGrid = styled.img`
  width: 12rem;
  border-radius: 0.4rem;
  box-shadow: 0 10px 35px rgba(0,0,0,0.3);
`

function SubMainBasic(props) {
  const {Data,onImgOpenClick} = props
  return (
    <SubMainBasicBody>
        <div>
          <ImgGrid src={Data.ImgUrl} alt={Data.title} 
          onClick={() => {onImgOpenClick(Data)}} //การสร้าง Arrow Function ใน onClick 
          //ในการรับค่า ของตัวค่า Data จะถูกรับโดย TheData ที่เป็น parameter เพื่อไปใช้งานต่อใน onImgClick ในการกระทำการ
          />
          <p><strong>{Data.title}</strong></p>
        </div>
    </SubMainBasicBody>
  )
}

export default SubMainBasic