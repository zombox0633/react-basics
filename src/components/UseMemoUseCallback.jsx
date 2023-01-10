import React,{useCallback,useMemo,useState} from 'react'
import styled from 'styled-components'
import { Body,DivCanter,ButtonDefault} from './style/Style'

const DivTextBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const DivButtonBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

function UseMemoUseCallback() {
    //getTime คือการกำหนดเวลาให้อยู่ในรูปแบบชนิดข้อมูล number
    const getTimestamp = (()=>(new Date().getTime()))
    //console.log(getTime());

    //useState
        //useState สำหรับ useMemo
        //numberOutMemo ใช้สำหรับการทดสอบการไม่ใช้ useMemo เมือมีการใช้งาน setNumberOutMemo
        //someValueMemo ใช้สำหรับการทดสอบการใช้ useMemo กับ function getNumberWithMemo
        const [numberOutMemo, setNumberOutMemo] = useState(0)
        const [someValueMemo, setSomeValueMemo] = useState(0)

        //useState สำหรับ useCallback
        const [numberOutCallback, setNumberOutCallback] = useState(0)
        const [someValueCallback, setSomeValueCallback] = useState(0)
        const [numberWithCallback, setNumberWithCallback] = useState(undefined)


    //function UseMemo

        //แบบไม่ใช้ useMemo
        //Timestamp แสดงครั้งแรกเมื่อมีการ Render
        //Timestamp แสดงอีกครั้งเมื่อมีการ Re-Render (Number หรือ Some Value เปลี่ยนแปลง)

        //numberWithoutMemo ใช้สำหรับการทดสอบการไม่ใช้ useMemo เมื่อมีการเปลี่ยนแปลง component UseMemoUseCallback.jsx จะทำให้ numberWithoutMemo เปลี่ยนแปลงค่า
        const numberWithoutMemo = getTimestamp()

        //แบบใช้ useMemo
        //*Timestamp แสดงครั้งแรกเมื่อมีการ Render
        //Timestamp แสดงอีกครั้งเมื่อมีการ Re-Render และ ค่า Some Value มีการเปลี่ยนแปลงเท่านั้น

        //getNumberWithMemo ใช้สำหรับการทดสอบการใช้ useMemo เมื่อ[ ตัวแปรที่ต้องการจับเปลี่ยนแปลงค่าเหมือน UseEffect ] เมือค่าใน [] เปลี่ยนแปลงจะทำงานเท่านั้น
        //getNumberWithMemo แสดงข้อมูล
        const getNumberWithMemo = useMemo(()=>{
            return getTimestamp()
        },[someValueMemo])


    //function UseCallback

        //แบบไม่ใช้ useCallback
        //Timestamp แสดงครั้งแรกเมื่อมีการ Render
        //Timestamp แสดงอีกครั้งเมื่อมีการ Re-Render (Number หรือ Some Value เปลี่ยนแปลง)

        //numberWithoutCallback ใช้สำหรับการทดสอบการไม่ใช้ useMemo เมื่อมีการเปลี่ยนแปลง component UseMemoUseCallback.jsx จะทำให้ numberWithoutCallback เปลี่ยนแปลงค่า
        const numberWithoutCallback = getTimestamp()

        //แบบใช้ useCallback
        //Timestamp ไม่แสดงครั้งแรกเรียกเมื่อมีการ Render (จะแสดงเมื่อเราสั่ง Call ฟังก์ชันเอง)
        //Timestamp แสดงเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Some Value มีการเปลี่ยนแปลงเท่านั้น

        //getNumberWithMemo ใช้สำหรับการทดสอบการใช้ useCallback เมื่อ[ ตัวแปรที่ต้องการจับเปลี่ยนแปลงค่าเหมือน UseEffect ] เมือค่าใน [] เปลี่ยนแปลงจะทำงานเท่านั้น
        //getNumberWithMemo จะนำ function นี้ไปใส่ใน button และใช้ numberWithCallback state เป็นตัวแสดงผล *ถ้าไม่ใส่ getNumberWithMemo ใน onClick จะไม่ทำงาน
        const getNumberWithCallbackFn = useCallback(()=>{
            setNumberWithCallback(() => getTimestamp())
        },[someValueCallback])

  return (
    <Body>
        <h2>UseMemo and UseCallback</h2>
        <DivCanter>
            <h3>UseMemo</h3>
            <DivTextBetween>
                <div style={{marginRight:'3rem'}}>
                    <p>not used useMemo : {numberWithoutMemo}</p>
                    <p>used useMemo : {getNumberWithMemo}</p>
                </div>
                <div style={{marginLeft:'3rem'}}>
                    <p>not used useMemo : {numberOutMemo}</p>
                    <p>used useMemo :  {someValueMemo}</p>
                </div>
            </DivTextBetween>
            <DivButtonBetween style={{marginBottom:'1rem'}}>
                <div>
                    <ButtonDefault style={{marginRight:'1rem'}} 
                    onClick={()=>setNumberOutMemo((p) => ++p)}
                    >add</ButtonDefault>
                    <ButtonDefault style={{marginRight:'3rem'}}
                    onClick={()=>setNumberOutMemo((p) => --p)}
                    >reduce</ButtonDefault>
                </div>
                <div>
                    <ButtonDefault style={{marginRight:'1rem'}}
                    onClick={()=>setSomeValueMemo((p) => ++p)}
                    >add</ButtonDefault>
                    <ButtonDefault style={{marginRight:'1rem'}}
                    onClick={()=>setSomeValueMemo((p) => --p)}
                    >reduce</ButtonDefault>
                </div>
            </DivButtonBetween>
        </DivCanter>
        <DivCanter style={{marginTop:'2rem'}}>
            <h3>UseCallback</h3>
            <DivTextBetween>
                <div style={{marginRight:'3rem'}}>
                    <p>not used useCallback : {numberWithoutCallback}</p>
                    <p>used useCallback : {numberWithCallback}</p>
                </div>
                <div style={{marginLeft:'3rem'}}>
                    <p>not used useCallback : {numberOutCallback}</p>
                    <p>used useCallback : {someValueCallback}</p>
                </div>
            </DivTextBetween>
            <DivButtonBetween style={{marginBottom:'1rem'}}>
                <div>
                <ButtonDefault style={{marginRight:'1rem'}} 
                    onClick={()=>setNumberOutCallback((p) => ++p)}
                    >add</ButtonDefault>
                    <ButtonDefault style={{marginRight:'3rem'}}
                    onClick={()=>setNumberOutCallback((p) => --p)}
                    >reduce</ButtonDefault>
                </div>
                <div>
                    <ButtonDefault style={{marginRight:'1rem'}}
                    onClick={() => {setSomeValueCallback((p) => ++p)
                    getNumberWithCallbackFn()}}
                    >add</ButtonDefault>
                    <ButtonDefault style={{marginRight:'1rem'}}
                    onClick={() => {setSomeValueCallback((p) => --p)
                    getNumberWithCallbackFn()}}
                    >reduce</ButtonDefault>
                </div>
            </DivButtonBetween>
        </DivCanter>
    </Body>
  )
}

export default UseMemoUseCallback