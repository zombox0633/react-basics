import React,{useContext,useState} from 'react'
import styled from 'styled-components'

import { Context } from '../context/Context'
import { ButtonDefault,
  Body,
  FormCanter,
  InputDiv 
} from '../style/Style'

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32rem;
  height: 14rem;
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #fff;
  border-radius: 8px;
  box-shadow: 12px 12px 0 #fff ;

  p{
    margin-bottom: 2rem;
  }
`

const fakeUser = {id: 'test',username:'best'}

function LoginForm() {
  //Context
  const {authState, authDispatch} = useContext(Context) //ส่วนข้อการเรียกใข้งาน Context
  //*useContext(ตัวที่ถูกสร้างโดย createContext) การใช้งาน useContext จะสมารถรับข้อมูลข้าม component ได้แต่ถ้าข้อมูลไม่ได้ข้ามเกิน 1 component ก็ใช้ props ดีกว่า
  //console.log(authState);

  //useState
  const [user, setUser] = useState({
    id:'',
    username:''
  })
  //console.log(user);
  //Function

  const onNoteValueChange = ((event)=>{
    const {name,value} = event.target //ทำการระบุตัวที่ต้องการใช้ใน function โดยการใช้ event.target ทำการข้อมูลที่อยู่ใน input มาใช้งาน
    setUser((p) =>{
      return {
        ...p, //คือการนำค่าเก่าข้อ Note ที่เป็น content และ author มาทำการคัดลอก โดยใช้ parameter prevNote มาคัดลอกโดยใช้ ...prevNote
        [name]:value //และใช้ name เป็นเหมือนตัวที่ระบุว่า [name]? 'content' : 'author' และใส่ค่าของ value ของ input ให้ตรงกับ Object
      }
    })
  })

  const LoginSubmit = ((event)=>{
    event.preventDefault() //กำหนดให้เมื่อ Function LoginSubmit ถูกใช้งานจะไม่ refresh หน้าจอ *เมื่อมีการกระทำการในหน้าเว็บจะเกิดการ refresh
    //setAuth(fakeUser) //แบบใช้ useState
    if(!!user.id & !!user.username){
      authDispatch({type:'login', //การเปลี่ยนแปลงค่าโดยใช้ authDispatch(จะทำงานตามเงื่อนไขที่ตั้งขึ้นกับ type ) *แบบใช้ useReducer
      payload: user //payload เป็นคำสั่งสำหรับส่งข้อมูลไปให้ useContext และส่งไปให้ Context ในการใช้งานต่อ
      }) 
    }
  })

  const LogoutSubmit = (()=>{
    //setAuth(null) //ทำให้ตัว useState auth เป็น null จะทำให้ในส่วน Element if(!!auth){} ไม่เข้าเงือนไข *แบบใช้ useState
    authDispatch({type:'logout'}) // การเปลี่ยนแปลงค่าโดยใช้ authDispatch(จะทำงานตามเงื่อนไขที่ตั้งขึ้นกับ type ) *แบบใช้ useReducer 
    setUser({
      id:'',
      username:''
    })
  })

  //Element
  if(!!authState){//ถ้า fakeUser มีข้อมูลจะเข้าเงื่อนไข *การทำเงือนไขการใช้ return function LoginForm.jsx ถ้ามีข้อมูลแสดงในเงือนไข ถ้าไม่มีแสดง return ด้านล่าง
    return(
      <Body>
        <h2>LoginForm</h2>
        <ContentDiv>
          <div>
            <p>Auth id : {authState.id}</p>
            <p>Auth username : {authState.username}</p>
          </div>
          <ButtonDefault onClick={LogoutSubmit}>logout</ButtonDefault>
        </ContentDiv>
      </Body>
    )
  }

  return (
    <Body>
        <h2>LoginForm</h2>
        <FormCanter onSubmit={LoginSubmit}>
          <InputDiv>
            <input className='Input' type="text" placeholder='Username'
              name='id'
              value={user.id} 
              onChange={onNoteValueChange} 
            />
            <label className='form__label'><strong>Username</strong></label>
          </InputDiv>
          <InputDiv>
            <input className='Input' type="password" placeholder='Password'
              name='username'
              value={user.username} 
              onChange={onNoteValueChange} 
            />
            <label className='form__label'><strong>Password</strong></label>
          </InputDiv>
          <ButtonDefault type='submit'>login</ButtonDefault>
        </FormCanter>
    </Body>
  )
}

export default LoginForm

