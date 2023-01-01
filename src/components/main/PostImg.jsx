import React from 'react'
import styled from 'styled-components'

const PostImgBody = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0; // ย่อจาก  top bottom left right 0
  z-index: 998;
`
const PostImgBg = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 998;
`
const ImgPostContent = styled.div`
  max-width: 80%;
  background-color: transparent;
  margin-top: 8rem;
  img{
    display: block;
    max-width: 360px;
    border-radius: 8px;
    box-shadow: 0 10px 38px rgba(0,0,0,0.7);
  }
  h4{
    user-select: none;
    cursor: pointer;
  }
  z-index: 999;
`
function PostImg(props) {
  const {Data,onClickBg} = props
  //การปิดรูปภาพ หรือเปิดรูปภาพของ PostImg.jsx ขึ้นอยู่กับการเปลี่ยนแปลง selected useState ของ component แม่ MainBasic.jsx
  return (
    <PostImgBody>
        <PostImgBg onClick={onClickBg}/>{/* เมื่อทำการกดจะทำการเปลี่ยนค่า selected useState เป็นค่า null จะทำการ*/}
        <ImgPostContent>
            <img src={Data.ImgUrl} alt={Data.title} />
            <h4>{Data.title}</h4>
        </ImgPostContent>
    </PostImgBody>
  )
}

export default PostImg