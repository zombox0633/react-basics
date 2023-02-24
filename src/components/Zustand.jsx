import React from 'react'
import { ButtonDefault, FormCanter } from './style/Style'
import useZustand from '../store/counter.store'
function Zustand() {
  //การเรียกใช้งาน zustand 
  //การใช้งานแบบ basic ข้อเสียวิธีนี้คือถ้า มีการใช้งานใน components อื่นหรือ File อื่น *component นี้และ componentอื่นที่ใช้ useZustand ของตัว zustand จะทำการ refresh component นั้นด้วย
  // const {bears,increasePopulation,reducePopulation,removeAll} = useZustand()

  //2 วิธีนี้เมื่อแก้ไขข้อมูล component อื่นจะไม่กระทบ หรือ refresh
  const bears = useZustand((state) => state.bears)
  const increase = useZustand((state) => state.increasePopulation)
  const reduce = useZustand((state) => state.reducePopulation)
  const removeAll = useZustand((state) => state.removeAll)

  return (
    <FormCanter style={{marginTop:"3rem"}}>
        <h1>{bears}</h1>
        <ButtonDefault type='button' onClick={()=> increase()}>Add</ButtonDefault>
        <ButtonDefault type='button' onClick={()=> reduce()}>Reduce</ButtonDefault>
        <ButtonDefault type='button' onClick={()=> removeAll()}>Reset</ButtonDefault>
    </FormCanter>
  )
}

export default Zustand