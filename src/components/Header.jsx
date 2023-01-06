import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonDefault } from './style/Style'

const HeaderBody = styled.div`
    position: sticky;
    width: 100%;
    top: 0;
    background-color: #333;
    overflow-x: hidden;
    z-index: 999;
    
`
const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    border-bottom: 1px solid #fff;
    
`
const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 25%;

    .AddItem{
        width: 13rem;
        span{
            padding-right: 0.5rem;
            cursor: pointer;
            user-select: none;
        }
        button{
            margin-right: 0.5rem;
        }
    }
`
const LinkMain = styled(Link)`
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    user-select: none;
`

function Header() {
    const [count, setCount] = useState(0)
    // [count ส่วนนี้สำหรับการนำไปใช้งาน, setCount ส่วนนี้สำหรับการเปลี่ยนแปลงค่าใน useState] = useState(0 การกำหนดค่าเริ่มต้นให้ useState) 
    // *แต่ถ้าเป็น ts สามารถกำหนดชนิดข้อมูลของตัว useState ได้โดย useState:number(0)

    const PlusNumber = () => {
        return setCount((p) => ++p)
        // การใช้งาน useState * ใช้ setCount ในการเปลี่ยนแปลงค่า ตัว setCount จะทำงานเมื่ออยู่ในรูปแบบ function คือ setCount()
        // setCount((parameter) => ++parameter เพิ่มค่าก่อน 1)
    }
    const MinusNumber = () => {
        if(count >= 1){
           return  setCount((p) => --p)
           // setCount((parameter) => --parameter ลดค่าก่อน 1)
        }
        else{
            return setCount(0)
            // การระบุค่าให้ useState ของ count มีค่าเป็น 0
        }
    }

  return (
    <HeaderBody>
        <HeaderContent>
            <LinkMain to='/'>
                <h1>Header</h1>
            </LinkMain>
            <FlexBetween>
                <div className='AddItem'>
                    <span>
                        {count} {/* การใส่ค่าของตัวแปรใน function ส่วน return จะต้องมี {ตัวแปรที่ต้องการ} */}
                    </span>
                    <ButtonDefault 
                    onClick={PlusNumber}
                    >Plus
                    </ButtonDefault>
                    <ButtonDefault 
                    onClick={MinusNumber}
                    >Minus
                    </ButtonDefault>
                </div>
                <ButtonDefault>menu</ButtonDefault>
            </FlexBetween>
        </HeaderContent>
    </HeaderBody>
  )
}

export default Header