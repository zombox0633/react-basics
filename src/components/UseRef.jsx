import React,{useState,useRef} from 'react'
import {Body,DivCanter,ButtonDefault,InputDiv} from './style/Style'

function UseRef() {
    //useState
    //useState เมื่อใช้งานจะสามารถการเปลี่ยนแปลง ui หน้าเว็บได้
    const [file, setFile] = useState(null)
    console.log('1 '+file); //การทดสอบการเปลี่ยนแปลงหน้าเว็บจากการเปลี่ยนแปลงไฟล์รูปภาพ เมื่อมีการเปลี่ยนแปลง useState หน้าเว็บจะเกิดการเปลี่ยนแปลง *ซึ่งมันไม่ดีต่อ performance(ประสิทธิภาพ) ของหน้าเว็บ

    //useRef 
    //เป็นคำสั่ง React hook ไว้เก็บคำสั่งของเรา ที่ใช้เก็บข้อมูลใน component ข้อมูลของ useRef สามารถเปลี่ยนแปลงได้ และข้อมูล component จะอยู่เสมอเว้นแต่ component จะถูกนำออกจากหน้าเว็บ
    //ข้อมูลใน useRef จะเปลี่ยนแปลงยังไงจะไม่ทำให้ ui react เปลี่ยนแปลงไปตามหน้าที่ของ useRef ใช้เก็บข้อมูลเท่านั้น
    //ข้อมูลที่ใส่ useRef ไม่ได้อยู่ที่มันแต่อยู่ใน ตัวแปรที่รับ useRef และ .current *ตามบรรทัด 16
    const fileRef = useRef(null) 
    const fileRefV2 = useRef(null)
    const textRef = useRef(null)

    //function
    const onFileChange = ((event) => {
        //current แปลงว่าค่าล่าสุด *ข้อมูลที่ใส่ useRef ไม่ได้อยู่ที่มันแต่อยู่ใน useRef.current
        //การระบุค่าที่ใช้เป็น files ตำแหน่งแรกในตัว input
        fileRef.current = event.target.files[0] //
    })

    const onUploadClick = (()=>{
        //การนำ useRef ไปใช้งานต่อ *เมื่อกดก็ไม่มีการเปลี่ยนของหน้าเว็บ
        console.log(fileRef.current); 
    })

    const onUploadClickV2 = (()=>{
        //การใช้ useRef ในการรับข้อมูลของ input type files
        //การนำ useRef ไปใช้งานต่อ *เมื่อกดก็ไม่มีการเปลี่ยนของหน้าเว็บ
        const myfileRef = fileRefV2.current.files[0] 
        console.log(myfileRef); 
    })

    const onAllTextClick = (()=>{
        //focus ทำการ focus input
        //select ทำการคุมคำใน input
        // blur ทำการ remove focus ออก
        textRef.current.focus()
        textRef.current.select()
        //textRef.current.blur()
    })

  return (
    <Body>
        <h2>UseRef</h2>
        <DivCanter className='UseRef'>
            <div>
                <h3>useState</h3>
            </div>
            <InputDiv>
                <input className='Input1' type="file" placeholder='file'
                onChange={(event) => setFile(event.target.files[0])} //การระบุค่าที่ใช้เป็น files ตำแหน่งแรกในตัว input
                />
                <label className='form__label'><strong>File</strong></label>
            </InputDiv>
            <ButtonDefault
            >submit
            </ButtonDefault>
        </DivCanter>
        <DivCanter className='UseRef' style={{marginTop:'2rem'}}>
            <div>
                <h3>useRef</h3>
            </div>
            <InputDiv>
                <input className='Input1' type="file" placeholder='file'
                onChange={onFileChange}
                />
                <label className='form__label'><strong>File</strong></label>
            </InputDiv>
            <ButtonDefault
                onClick={onUploadClick}
            >submit
            </ButtonDefault>
        </DivCanter>
        <DivCanter className='useRef.v2' style={{marginTop:'2rem'}}>
            <div>
                <h3>useRef.v2</h3>
            </div>
            <InputDiv>
                <input className='Input1' type="file" placeholder='file'
                ref={fileRefV2} //การใช้งาน useRef ที่ถูกต้อง *useRef สามารถเก็บข้อมูลของ input นี้ได้โดยใช้ ref={useRef}
                />
                <label className='form__label'><strong>File</strong></label>
            </InputDiv>
            <ButtonDefault
                onClick={onUploadClickV2}
            >submit
            </ButtonDefault>
        </DivCanter>
        <DivCanter className='useRef__text' style={{marginTop:'2rem'}}>
            <div>
                <h3>useRef text</h3>
            </div>
            <InputDiv>
                <input className='Input1' type="text" placeholder='Text'
                ref={textRef} //การใช้งาน useRef ที่ถูกต้อง *useRef สามารถเก็บข้อมูลของ input นี้ได้โดยใช้ ref={useRef}
                />
                <label className='form__label'><strong>Text</strong></label>
            </InputDiv>
            <ButtonDefault
                onClick={onAllTextClick}
            >submit
            </ButtonDefault>
        </DivCanter>
    </Body>
  )
}

export default UseRef