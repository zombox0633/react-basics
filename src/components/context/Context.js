import { createContext } from "react"

export const Context = createContext({ //ทำการประกาศการใช้งาน Context โดย createContext
    //ใส่ค่าเริ่มต้น
    // auth:null,
    // setAuth: ()=>{}
    authState: null, 
    authDispatch: ()=>{}
})