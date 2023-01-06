import styled from "styled-components"

export const ButtonDefault = styled.button`
    width: 4.5rem;
    height: 2.5rem; 
    border: 2px solid #fff;
    border-radius: 8px;
    background-color: #333;
    font-size: 1.2rem;
    color: #fff;
    box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
    user-select: none;

    &:hover{
        cursor: pointer;
    }
    &:focus{
        outline: 2px solid #fff;
        outline-offset: 1 px;
    }
    &:active{
        outline: 2px solid #fff;
        outline-offset: 2px;
        //transform:  scale(0.75);
        box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
        transform:translate(2px, 2px);
        transition: 0.05s ease-out;
    }
`

export const Body = styled.div`
  display: block;
  margin: 0 5%;
  
`

export const FormCanter = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 16rem;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #fff;
    border-radius: 8px;
    box-shadow: 12px 12px 0px;
    
    button{
        margin-top: 2rem;
    }
`
export const InputDiv = styled.div`
    
    input{
        width: 20rem;
        margin-top: 2rem;
        padding: 0.5rem;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0; //การนำกรอบออกเมื่อ  active หรือ focus
        background: transparent;
        transition: border-color 0.2s; //การเปลียนแปลงสีเส้น เวลา
        color: #fff;
        font-size: 1rem;

        &::placeholder{
            color: transparent;
            user-select: none;
        }
        &:placeholder-shown ~ .form__label{ //เมื่อ placeholder ทำการแสดงจะให้ .form__label ทำงานตามเงื่อนไขนี้
            margin-top: -2rem;
        }

        &:focus{
            border-width: 3px ;
            /* border-image: linear-gradient(to right,#11998e, #38ef7d); //การใช้แบบนี้จะต้องเพิ่ม  border-image-slice: 1; ด้วย
            border-image-slice: 1; */
            border-image: linear-gradient(45deg, #11998e, #38ef7d) 1; // 1 ด้านหลังคือ border-image-slice: 1;
        }
        &:focus ~ .form__label{ //เมื่อ focus input ทำการเปลียนแปลง class form__label ด้วย
            margin-top: -3.4rem;
            transition: 0.2s; //เปลียนแปลงกลับ
            font-size: 1rem;
            color: #11998e;
            cursor: text;
        }

    }
    .form__label {
        position: absolute;
        display: block;
        margin-top: -3.4rem;
        transition: 0.2s;
        font-size: 1rem;
        color: #fff;
        z-index: 997;
        user-select: none;
    }
`