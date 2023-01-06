import React,{useReducer} from 'react'
import { Context } from './Context'

function Reducer(state, action){//Reducer เหมือนเป็นตัวจัดการ State
  if(action.type === 'login'){ //เมื่อเรียกใช้ Dispatch({type:'login'}) จะเข้าเงื่อนไขและส่งค่าที่ตั้ง 
    const {id, username} = action.payload //การนำข้อมูลที่ payload รับมาใช้งาน
    return {id, username}
  }
  if(action.type === 'logout'){ //เมื่อเรียกใช้ Dispatch({type:'login'}) จะเข้าเงื่อนไขและส่งค่าที่ตั้ง
    return null
  }
  return state
}

function ProviderData({children}) {
  //useState
   //const [auth, setAuth] = useState(null)

  //useReducer
  const [authState, authDispatch] = useReducer(Reducer,null) // Dispatch คือตัวส่งข้อมูลคำสั่ง parameter action ไปทำงานข้างใน State(Reducer)
  //useReducer(funtion ที่จะใช้งาน,ค่าเริ่มต้น)

  return (
    <Context.Provider 
    value={{authState, authDispatch}}> {/* คำสั่ง Provider ของ Context เป็นตัวประกาศว่าภายใน component มันจะสามารถใข้ useContext ส่งข้อมูลข้าม component ได้โดยจะต่างกับ props ที่จะต้องส่งเป็นเป็นทอดๆ component แม่ไปลูกต่อๆไป */}
      {children}
    </Context.Provider>
  )
}

export default ProviderData
