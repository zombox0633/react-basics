import React,{useContext,useState} from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
// toast
const toastSuccess = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}
const toastError = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  }

//const fakeUser = {id: 'test',username:'best'}

function LoginForm() {
  //Context
  //ส่วนข้อการเรียกใข้งาน Context
  //*useContext(ตัวที่ถูกสร้างโดย createContext) การใช้งาน useContext จะสมารถรับข้อมูลข้าม component ได้แต่ถ้าข้อมูลไม่ได้ข้ามเกิน 1 component ก็ใช้ props ดีกว่า
  const {authState, authDispatch,members} = useContext(Context) 
  //console.log(members);

  //useState
  const [user, setUser] = useState({
    id:'',
    username:''
  })
  //console.log(user);

  //Function
  const onNoteValueChange = ((event)=>{
    //ทำการระบุตัวที่ต้องการใช้ใน function โดยการใช้ event.target ทำการข้อมูลที่อยู่ใน input มาใช้งาน
    const {name,value} = event.target
    setUser((p) =>{
      return {
        //คือการนำค่าเก่าข้อ Note ที่เป็น content และ author มาทำการคัดลอก โดยใช้ parameter prevNote มาคัดลอกโดยใช้ ...prevNote
        //และใช้ name เป็นเหมือนตัวที่ระบุว่า [name]? 'content' : 'author' และใส่ค่าของ value ของ input ให้ตรงกับ Object
        ...p, 
        [name]:value 
      }
    })
  })

  //length = members.length สร้างมาเพื่อรับค่าการนับจำนวนสมาชิกใน Array 
  let length = null
  const LoginSubmit = ((event)=>{
    event.preventDefault()
    if(!!user.id & !!user.username){
      // x สร้างมานับจำนวน loops การเข้าเมื่อข้อมูลไม่ตรง และนำไปเปรียบเทียบกับจำนวนข้อมูล Array ของ members
      // find คือการ loops หาตัวที่เหมือนกับที่ใส่เงือนไขและจะเอาแค่ตัวแรกที่มันเจอต่างกับ filter ที่จะตรวจตัวที่เหมือนทุกตัวใน Array
      let x = 0
      members.find((member) =>{
        if(user.id !== member.id | user.username !== member.username){
          length = members.length
          ++x
          if(x >= length){
            length = null
            x = 0
            toast.error(`Please enter the correct ID and password.`,toastError)
            return false
          }
          //return false คืนค่าให้ filter members
          return false
        }
        if(user.id === member.id & user.username === member.username){
          //การเปลี่ยนแปลงค่าโดยใช้ authDispatch(จะทำงานตามเงื่อนไขที่ตั้งขึ้นกับ type ) *แบบใช้ useReducer
          //payload เป็นคำสั่งสำหรับส่งข้อมูลไปให้ useContext และส่งไปให้ Context ในการใช้งานต่อ
          toast.success(`successfully connected ${user.id}`,toastSuccess)
          authDispatch({type:'login', payload: user })
           return false
        }else{
          toast.error(`Error`,toastError)
          return false
        }
      })
    }else{
      toast.error(`Please enter your ID and password`,toastError)
    }
  })

  const LogoutSubmit = (()=>{
    //setAuth(null) //ทำให้ตัว useState auth เป็น null จะทำให้ในส่วน Element if(!!auth){} ไม่เข้าเงือนไข *แบบใช้ useState
    // การเปลี่ยนแปลงค่าโดยใช้ authDispatch(จะทำงานตามเงื่อนไขที่ตั้งขึ้นกับ type ) *แบบใช้ useReducer 
    authDispatch({type:'logout'}) 
    setUser({
      id:'',
      username:''
    })
  })

  //Element
  //ถ้า fakeUser มีข้อมูลจะเข้าเงื่อนไข *การทำเงือนไขการใช้ return function LoginForm.jsx ถ้ามีข้อมูลแสดงในเงือนไข ถ้าไม่มีแสดง return ด้านล่าง
  if(!!authState){
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
        <ToastContainer/> {/* การใช้ toast อย่าลืมใส่  <ToastContainer/> */}
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
        <ToastContainer/> {/* การใช้ toast อย่าลืมใส่  <ToastContainer/> */}
    </Body>
  )
}

export default LoginForm
