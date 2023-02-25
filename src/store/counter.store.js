import { create } from 'zustand'
import {devtools, persist} from "zustand/middleware"

// https://devahoy.com/blog/state-management-with-zustand

//การสร้าง zustand แบบพื้นฐาน (จะคล้ายๆ กับ context ที่ต้องสร้างตัวส่วนกลางแต่จะใช้งานง่ายและสะดวกกว่า)
//*สิ่งที่แตกแต่างระหว่าง context กับ zustand คือ 
//context จะเป็นส่วนกลางในการเก็บและจัดการโดยไม่ใช้ props แต่จะไม่สามารถส่งข้อมูลที่ได้จาก component ลูก  ไปหา component แม่ได้
//zustand จะเป็นตัวกลางภายนอกที่รับและส่งข้อมูลโดยไม่สนใจการส่งข้อมูลแบบ dom แต่การทำงานของมันคือ component ลูก ส่งไป zustand และ zustand ส่งไปให้ component แม่

//create<สามารถใส่ type ได้ถ้าเป็น .ts>(()=>{})(สำหรับทำ persist *persist คือตัวเกิดข้อมูลที่เมือทำการ refresh หน้าข้อมูลก็จะไม่หายไปแต่จะไปเก็บใน Application Storage)
//create((set,get)=>{}) *รู้แค่ set * set จะเหมือน useState(setState) ที่ทำหน้าที่เปลี่ยนค่าของ zustand
//การใช้งาน set คือ สร้าง fn : () => set((parameter) => ({ค่าที่อยู่ภายใน zustand ที่ถูกสร้างขึ้น : parameter.ค่าที่อยู่ภายใน zustand และการเปลี่ยนแปลง}))
//ส่วน () => {set((state)=>(),false ถ้าเป็น true จะไม่สนใจค่าเก่าของตัวที่ set ,"increasePopulation" คือการระบุบชื่อเมือทำการเช็ดการทำงานของ state ใน Redux Dev)}

//zustand basic
// const useZustand = create((set)=>({
//     bears:0,
//     increasePopulation: () => set((state)=>({bears:state.bears + 1}),false,"increasePopulation"),
//     reducePopulation: () => {set((state) => ({bears:state.bears - 1}))},
//     removeAll: () => set({bears: 0})
// }))

//zustand persist
const useZustand = create()(
  devtools(persist((set)=>({
    bears:0,
    increasePopulation: () => set((state)=>({bears:state.bears + 1}),false,"increasePopulation"),
    reducePopulation: () => {set((state) => ({bears:state.bears - 1}))},
    removeAll: () => set({bears: 0})
  }),{name: "counter",}),{ store: "counterStore" })
)

export default useZustand