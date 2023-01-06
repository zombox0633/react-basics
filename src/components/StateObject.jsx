import React,{useState} from 'react'
import styled from 'styled-components'
import { ButtonDefault, FormCanter, InputDiv } from './style/Style'

const StateObjectBody = styled.div`
    margin-left: 5%;
    margin-right: 5%;
`

const DivCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`

const ShowContent = styled.div`
    width: 25rem;
    margin-bottom: 2.5rem;
    padding: 0 2rem 2rem;
    border: 2px solid #fff;
    border-radius: 8px;
    box-shadow: 8px 8px 0px;

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`
const EditAndDeleteBody = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 2rem 0 0 0;

    div{
        margin-left: auto;

        a{
        margin-left: 1rem;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
        user-select: none;
        }
    }
`

function StateObject() {

    const time = Date.now()
    const timestamp = new Intl.DateTimeFormat('en-US',
    {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time)

    //useState
    const [Note, setNote] = useState({ //State x Object ทำการแก้ปัญหาการสร้าง useState หลายตัวโดยไม่จำเป็นในการกระทำการ
        content: '',
        author: '',
        timestamp: ''
    })
    const [formNotes, setFromNotes] = useState([]) //State x Array ใช้ในการเก็บข้อมูลของ from ที่ถูก sumbit ของ from
    const [editNotes, setEditNotes] = useState(null)


    //function
    //เมือเกิดการเปลี่ยนแปลงค่าใน useState Note และ input
    const onNoteValueChange = (event) => {
        const {name,value} = event.target //ทำการระบุตัวที่ต้องการใช้ใน function โดยการใช้ event.target ทำการข้อมูลที่อยู่ใน input มาใช้งาน
        setNote((prevNote)=>{
            return {
                ...prevNote, //คือการนำค่าเก่าข้อ Note ที่เป็น content และ author มาทำการคัดลอก โดยใช้ parameter prevNote มาคัดลอกโดยใช้ ...prevNote
                [name]:value //และใช้ name เป็นเหมือนตัวที่ระบุว่า [name]? 'content' : 'author' และใส่ค่าของ value ของ input ให้ตรงกับ Object
            }
        })
    }

    //เมือเกิดการเปลี่ยนแปลงค่าใน useState editNotes และ input
    const onEditNoteValueChange = (event) => {
        const {name,value} = event.target //ทำการระบุตัวที่ค้องการใช้ใน function โดยการใช้ event.target ทำการข้อมูลที่อยู่ใน input มาใช้งาน
        setEditNotes((prevNote)=>{
            return {
                ...prevNote, //คือการนำค่าเก่าข้อ Note ที่เป็น content และ author มาทำการคัดลอก โดยใช้ parameter prevNote มาคัดลอกโดยใช้ ...prevNote
                [name]:value //และใช้ name เป็นเหมือนตัวที่ระบุว่า [name]? 'content' : 'author' และใส่ค่าของ value ของ input ให้ตรงกับ Object
            }
        })
    }

    //function submit
    const onNoteSubmit = (event) => {

        event.preventDefault() //เมื่อ Submit จะป้องกันไม่ให้เกิดการ refetch

        if(!!Note.content & !!Note.author){ //ถ้าค่าของ Note.content และ Note.author ค่าเป็น null หรือ undefined จะไม่สามารถเขาเงือนไข
            setNote((p)=>{ //การทำ timestamp ในการบันทึกข้อมูล
                p.timestamp = timestamp
            })

            //console.log(Note);
            setFromNotes((prevAllNotes) => {
                const newNote = {...Note} //ทำการคัดลอก Note และเพิ่ม id ใน Object เป็น time.toString()
                newNote.id = time.toString()

                return ( 
                    //[...prevAllNotes,Note] //...prevAllNotes คำสั่งการคัดลอกและเพิ่มตัวที่จะใส่ข้อมูลของ Note ใน Array ของ useState FromNotes
                    // ข้อมูลที่เพิ่มมาใหม่จะต่อท้าย Array ตัวเก่า
                    //[Note,...prevAllNotes] //ข้อมูลที่เพิ่มมาใหม่จะอยู่หน้า Array ตัวเก่า

                    [newNote,...prevAllNotes] //ทำการเพิ่ม id เพื่อเป็น key ในการ map ให้ notElements
                    )
            })
            
            setNote({ //ทำการ reset ค่าใน useState Note
                content: '',
                author: '',
                timestamp: ''
            })
        }
    }

    //function edit Submit 
    const onEditNoteSubmit = (event) => {
        event.preventDefault() //เมื่อ Submit จะป้องกันไม่ให้เกิดการ refetch
        if(!!editNotes.content & !!editNotes.author){
            setEditNotes((p)=>{ //การทำ timestamp ในการบันทึกข้อมูลใหม่
                p.timestamp = timestamp
            })

            setFromNotes((prevAllNotes) => {
                return prevAllNotes.map((theNote) =>{
                    if(theNote.id !== editNotes.id){ //ทำการเช็คชนิดข้อมูล และตัวข้อมูลทั้งสองตรงกันไม ถ้าไม่ตรงเข้าเงือนไข
                        return theNote //ส่งข้อมูล Note เก่าไป
                    }
                    return editNotes // ส่งข้อมูล editNotes ไปให้ setFromNotes
                })
            })
            setEditNotes(null) //ทำการปิดตัว editNotesElement โดยการทำให้ editNotes เป็นค่าเริ่มต้น
        }
    }

    //function delete
    const onNoteDelete = (NoteId) => { // รับค่า theNote.id
        setFromNotes((prevAllNotes) => { //ทำการแก้ไข useState setFromNotes
            return prevAllNotes.filter((theNote)=>{ // prevAllNotes ทำการกรองตัวที่อยู่ใน formNotes โดยใช้ parameter theNote
                return theNote.id !== NoteId //เงื่อนไขในการเลือกตัวที่เอาคือ ค่า theNote.id และ NoteId ต้องไม่เท่ากันทั้ง ชนิดตัวแปร และตัวข้อมูลทั้งสองตัองไม่เท่ากัน
                //เงือนไขการสร้างคือการลบ และตัว theNote.id กับ NoteId มันเท่ากัน filter จะไม่สามารถหาตัวที่มีตามเงือนไขได้จึงไม่มีตัวที่หาทำให้ prevAllNotes เป็นค่าว่างและส่งให้ setFromNotes จึงทำการให้ setFromNotes ลบตัวข้อมูลนั้นออกไป
            })
        })
    }


    //Elements

    //ตัวกรองข้อความ
    let formInputElements = (
        <FormCanter onSubmit={onNoteSubmit}> {/* รับข้อมูลใน form ไปกระทำการตาม onNoteSubmit จะสามารถใช้ข้อมูลในแท็กของตนโดยใช้ parameter*/}
            <InputDiv>
                <input className='Input1' type="text" placeholder='Text'
                    name='content' // ใช้ name ของ input ในการระบุการส่งข้อมูลไปให้ onNoteValueChange
                    value={Note.content} //ค่าของ input = useState Content *และทำการระบุการใส่ใน Object useState
                    //onChange={(event)=>{setNote(event.target.value)}} //event = parameter *parameter ที่ทำการชี้ค่า value เมื่อการเปลี่ยนแปลง
                    onChange={onNoteValueChange} //โดยตัว useState ไม่สามารถแยก input ที่เข้ามาได้จึงต้องสร้าง function ในการจัดการ
                    //ตัว onNoteValueChange ใน onChange รับข้อมูลที่อยู่ใน input ไปใช้งานต่อโดยใช้ parameter ในการระบุสิ่งที่ต้องการ
                />
                <label className='form__label'><strong>Text</strong></label>
            </InputDiv>
            <InputDiv>
                <input type="text" placeholder='Name'
                    name='author' // ใช้ name ของ input ในการระบุการส่งข้อมูลไปให้ onNoteValueChange
                    value={Note.author} //ทำการระบุการใส่ใน Object useState 
                    onChange={onNoteValueChange} //โดยตัว useState ไม่สามารถแยก input ที่เข้ามาได้จึงต้องสร้าง function ในการจัดการ
                    //ตัว onNoteValueChange ใน onChange รับข้อมูลที่อยู่ใน input ไปใช้งานต่อโดยใช้ parameter ในการระบุสิ่งที่ต้องการ
                />
                <label className='form__label'><strong>Name</strong></label>
            </InputDiv>
            <ButtonDefault type='submit'>Submit</ButtonDefault>
        </FormCanter>
    )
    if(!!editNotes){ //ทำการปิดตัว formInputElements เมื่อ useState มีข้อมูล
        formInputElements = null
    }


    //การสร้าง Elements ข้อความ
    const noteElements = formNotes.map((theNote)=>{ 
        //map วนลูปเพื่อนำค่าใน Array แต่ละตัวมากระทำตามใน Function  ที่เรากำหนดไว้ แต่ Map นั้น สามารถ return ค่าออกมาได้โดยค่าที่ return ออกมาจะเป็น Array
        return(
             <ShowContent key={theNote.id}> 
             {/* อย่าลืมใส่ key เป็น index หรือจะสร้าง key ก็ได้*/}
                <div>
                    <h3>Name : {theNote.author}</h3>
                    <p>{theNote.timestamp}</p>
                </div>
                <p>{theNote.content}</p>
                <EditAndDeleteBody>
                    <div>
                        <a onClick={
                            () => {setEditNotes(theNote)}} //ใช้ useState setEditNotes ในการแก้ไข เมื่อกดจะทำนำข้อมูลของ parameter theNote มาเก็บใน setEditNotes
                            >Edit</a>
                        <a onClick={
                            () => {onNoteDelete(theNote.id)}} 
                            // ส่งค่า theNote.id ที่ทำการ map ของ notElements ไปใช้งานใน function onNoteDelete โดยใช้ NoteId ทำการรับค่ารับค่า
                            >Delete</a>
                    </div>
                </EditAndDeleteBody>
            </ShowContent>
        )
    })

    //function edit และทำการ delete ข้อตัวเก่าที่ทำการแก้ไข
    let editNotesElement = null
    if(!!editNotes){ //ถ้า editNotes มีข้อมูล หรือ ไม่เป็น null หรือ undefined
        editNotesElement = (
            <ShowContent>
                <form onSubmit={onEditNoteSubmit}> {/* รับข้อมูลใน form ไปกระทำการตาม onEditNoteSubmit จะสามารถใช้ข้อมูลในแท็กของตนโดยใช้ parameter*/}
                    <h2>Edit</h2>
                    <div>
                        <h3>Name : {editNotes.author}</h3>
                    </div>
                    <InputDiv>
                        <input className='Input1' type="text" placeholder='Text'
                            name='content' // ใช้ name ของ input ในการระบุการส่งข้อมูลไปให้ onNoteValueChange
                            value={editNotes.content} //ค่าของ input = useState editNotes.content
                            onChange={onEditNoteValueChange} 
                        />
                        <label className='form__label'><strong>Text</strong></label>
                    </InputDiv>
                    <EditAndDeleteBody>
                        <div>
                            <ButtonDefault type='submit'>Submit</ButtonDefault>
                        </div>
                    </EditAndDeleteBody>
                </form>
            </ShowContent>
        )
    }

  return (
    <StateObjectBody>
        <div>
            <h2>StateObject</h2>
        </div>
        {formInputElements}
        <DivCenter>
            {editNotesElement}
        </DivCenter>
        <DivCenter>
            {noteElements} {/* การนำตัวแปร หรือ function มาใช้งาน */}
        </DivCenter>
    </StateObjectBody>
  )
}

export default StateObject