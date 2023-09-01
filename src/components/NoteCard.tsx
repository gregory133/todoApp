import React, { useEffect, useRef, useState } from 'react'
import Note from '../classes/Note'
import { Dictionary } from 'typescript-collections'
import { IonRippleEffect } from '@ionic/react'
import { useGesture } from '@use-gesture/react'

interface Props{
  dateCreated:number,
  onClickSavedNote: (savedNote:Note)=>void,
  onLongPressedNote: (dateCreated:number)=>void,
  savedNotes:Dictionary<number, Note>
}

export default function NoteCard(props:Props) {

  const [isPressed, setIsPressed]=useState<boolean>(false)
  const isPressedRef=useRef<boolean>(false)
  const elementRef=useRef(null)

  const bind=useGesture({
    onTouchStart:(state)=>{
      isPressedRef.current=true
      setIsPressed(true)
    },
    onTouchEnd:(state)=>{
      isPressedRef.current=false
      setIsPressed(false)
    }
  })

  useEffect(()=>{
    if (isPressed){
      setTimeout(()=>{
        if (isPressedRef.current){
          props.onLongPressedNote(props.dateCreated)
        }
      }, 500)
    }
  }, [isPressed])

  return (
    <div {...bind()} ref={elementRef} className='savedNote'>         
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
