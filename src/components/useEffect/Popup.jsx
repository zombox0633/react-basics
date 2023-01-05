import React,{useEffect} from 'react'
import styled from 'styled-components';

const BackgroundBlack = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 998;
`

function Popup(props) {

    useEffect(() => {
      console.log('Popup start');
        document.documentElement.style.overflowY = 'hidden' //การใช้งาน javascirpt ในการเปลี่ยนแปลง css ในหน้า Popup.jsx
      return () => {
        console.log('Popup end');
        document.documentElement.style.overflowY = 'auto' //*การเปิดใช้งานอะไรใน useEffect ก็อย่าลืมปิดหรือเปลี่ยนเป็นค่าเดิม
      }
    }, [])
    

  return (
    <div>
        <BackgroundBlack 
        onClick={props.onPopupClose} //รับ function ของ component แม่มาทำงานโดยเมื่อกดจะทำการเปลี่ยน useState isPopupOpen เป็น false และทำการปิด
        />
    </div>
  )
}

export default Popup