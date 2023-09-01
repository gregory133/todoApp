import React, { useEffect, useRef } from 'react'
import Note from '../classes/Note'
import { Dictionary } from 'typescript-collections'
import { IonRippleEffect } from '@ionic/react'
import Hammer from 'hammerjs';

interface Props{
  dateCreated:number,
  onClickSavedNote: (savedNote:Note)=>void,
  onLongPressedNote: (dateCreated:number)=>void,
  savedNotes:Dictionary<number, Note>
}

export default function NoteCard(props:Props) {

  const elementRef=useRef(null)

  useEffect(()=>{
    if (elementRef.current){
      let hammer=new Hammer(elementRef.current)
      hammer.on('press', ev=>{
        setTimeout(()=>{props.onLongPressedNote(props.dateCreated)}, 500) 
      })
    }
  }, [elementRef.current])

  return (
    <div ref={elementRef} className='savedNote'>         
      <div className=' ion-activatable' 
      onClick={()=>props.onClickSavedNote(props.savedNotes.getValue(props.dateCreated)!)}>
        <IonRippleEffect/>
        {props.savedNotes.getValue(props.dateCreated)!.content}
      </div>
      <span>
        {props.savedNotes.getValue(props.dateCreated)!.title}
      </span>
    </div>
  )
}
