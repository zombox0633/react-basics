import React,{useState} from 'react'
import styled from 'styled-components'
import { ButtonDefault } from './Header'

const StateObjectBody = styled.div`
    margin-left: 5%;
    margin-right: 5%;
`
const FormCanter = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 16rem;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #fff;
    border-radius: 8px;
    box-shadow: 12px 12px 0px;
`
const InputDiv = styled.div`
    
    input{
        width: 20rem;
        margin-top: 2rem;
        padding: 0.5rem;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0; //การนำกรอบออกเมื่อ  active หรือ focus
        background: transparent;
        transition: border-color 0.2s; //การเปลียนแปลงสีเส้น เวลา
        color: #fff;
        font-size: 1rem;

        &::placeholder{
            color: transparent;
        }
        &:placeholder-shown ~ .form__label{ //เมื่อ placeholder ทำการแสดงจะให้ .form__label ทำงานตามเงื่อนไขนี้
            margin-top: -2rem;
        }

        &:focus{
            border-width: 3px ;
            /* border-image: linear-gradient(to right,#11998e, #38ef7d); //การใช้แบบนี้จะต้องเพิ่ม  border-image-slice: 1; ด้วย
            border-image-slice: 1; */
            border-image: linear-gradient(45deg, #11998e, #38ef7d) 1; // 1 ด้านหลังคือ border-image-slice: 1;
        }
        &:focus ~ .form__label{ //เมื่อ focus input ทำการเปลียนแปลง class form__label ด้วย
            margin-top: -3.3rem;
            transition: 0.2s; //เปลียนแปลงกลับ
            font-size: 1rem;
            color: #11998e;
            cursor: text;
        }

    }
    .form__label {
        position: absolute;
        display: block;
        margin-top: -3.3rem;
        transition: 0.2s;
        font-size: 1rem;
        color: #fff;
        z-index: 999;
    }
`
const DivCenter = styled.div`
    margin-top: 2rem;
`

function StateObject() {
    //useState
    const [Note, setNote] = useState({ //State x Object ทำการแก้ปัญหาการสร้าง useState หลายตัวโดยไม่จำเป็นในการกระทำการ
        content: '',
        author: ''
    })
    const [formNotes, setFromNotes] = useState([]) //State x Array ใช้ในการเก็บข้อมูลของ from ที่ถูก sumbit ของ from

    //function
    const onNoteValueChange = (event) => {
        const {name,value} = event.target //ทำการระบุตัวที่ค้องการใช้ใน function โดยการใช้ event.target ทำการระบุว่าจะเอาตัวใดใน {} เหมือนการใช้ props
        setNote((prevNote)=>{
            return {
                ...prevNote, //คือการนำค่าเก่าข้อ Note ที่เป็น content และ author มาทำการคัดลอก โดยใช้ parameter prevNote มาคัดลอกโดยใช้ ...prevNote
                [name]:value //และใช้ name เป็นเหมือนตัวที่ระบุว่า [name]? 'content' : 'author' และใส่ค่าของ value ของ input ให้ตรงกับ Object
            }
        })
    }

    const onNoteSubmit = (event) => {
        event.preventDefault() //เมื่อ Submit จะป้องกันไม่ให้เกิดการ refetch
        
        //console.log(Note);
        setFromNotes((prevAllNotes) => {
            return ( 
                //[...prevAllNotes,Note] //...prevAllNotes คำสั่งการคัดลอกและเพิ่มตัวที่จะใส่ข้อมูลของ Note ใน Array ของ useState FromNotes
                // ข้อมูลที่เพิ่มมาใหม่จะต่อท้าย Array ตัวเก่า
                [Note,...prevAllNotes] //ข้อมูลที่เพิ่มมาใหม่จะอยู่หน้า Array ตัวเก่า
                )
            
        })
        setNote({ //ทำการ reset ค่าใน useState Note
            content: '',
            author: ''
        })
    }

    //Elements
    const notElements = formNotes.map((theNote ,index)=>{ 
        //map วนลูปเพื่อนำค่าใน Array แต่ละตัวมากระทำตามใน Function  ที่เรากำหนดไว้ แต่ Map นั้น สามารถ return ค่าออกมาได้โดยค่าที่ return ออกมาจะเป็น Array
        return(
             <div key={index}> 
             {/* อย่าลืมใส่ key */}
                <h3>{theNote.author}</h3>
                <p>{theNote.content}</p>
            </div>
        )
    })

  return (
    <StateObjectBody>
        <div>
            <h2>StateObject</h2>
        </div>
        <FormCanter onSubmit={onNoteSubmit}>
            <InputDiv>
                <input className='Input1' type="text" placeholder='Text'
                    name='content' // ใช้ name ของ input ในการระบุการส่งข้อมูลไปให้ onNoteValueChange
                    value={Note.content} //ค่าของ input = useState Content *และทำการระบุการใส่ใน Object useState
                    //onChange={(event)=>{setNote(event.target.value)}} //event = parameter *parameter ที่ทำการชี้ค่า value เมื่อการเปลี่ยนแปลง
                    onChange={onNoteValueChange} //โดยตัว useState ไม่สามารถแยก input ที่เข้ามาได้จึงต้องสร้าง function ในการจัดการ
                    //ตัว onNoteValueChange ใน onChange รับข้อมูลที่อยู่ใน input ไปใช้งานต่อโดยใช้ parameter ในการระบุสิ่งที่ต้องการ
                />
                <label className='form__label'><strong>Text</strong></label>
            </InputDiv>
            <InputDiv>
                <input type="text" placeholder='Name'
                    name='author' // ใช้ name ของ input ในการระบุการส่งข้อมูลไปให้ onNoteValueChange
                    value={Note.author} //ทำการระบุการใส่ใน Object useState 
                    onChange={onNoteValueChange} //โดยตัว useState ไม่สามารถแยก input ที่เข้ามาได้จึงต้องสร้าง function ในการจัดการ
                    //ตัว onNoteValueChange ใน onChange รับข้อมูลที่อยู่ใน input ไปใช้งานต่อโดยใช้ parameter ในการระบุสิ่งที่ต้องการ
                />
                <label className='form__label'><strong>Name</strong></label>
            </InputDiv>
            <DivCenter>
                <ButtonDefault type='submit'>Submit</ButtonDefault>
            </DivCenter>
        </FormCanter>
        <div>
            {notElements}
        </div>
    </StateObjectBody>
  )
}

export default StateObject