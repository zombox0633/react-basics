import React,{forwardRef} from 'react'
import {DivCanter,ButtonDefault,InputDiv} from './style/Style'

//การจะใช้งาน forwardRef จะต้องเปลี่ยนการสร้าง function ปกตฺิเป็น arrow function เพื่อจะได้กำหนดให้ใช้งาน forwardRef ได้
const ForwardRef = forwardRef((props,ref)=>{
    return(
        <div>
            <DivCanter className='useRef__text' style={{marginTop:'2rem'}}>
                <div>
                    <h3>ForwardRef</h3>
                </div>
                <InputDiv>
                    <input className='Input1' type="text" placeholder='Text'
                    ref={ref} 
                    /> {/* การใช้งาน useRef ที่ส่งข้าม component โดยใช้ forwardRef รับค่าที่ ref = textRef */} 
                    <label className='form__label'><strong>Text</strong></label>
                </InputDiv>
                <ButtonDefault
                    onClick={props.onAllTextClick}
                >submit
                </ButtonDefault>
            </DivCanter>
        </div>
    )
})

export default ForwardRef

    