import React from 'react'
import Note from '../classes/Note'
import { Dictionary } from 'typescript-collections'
import { IonRippleEffect } from '@ionic/react'

interface Props{
  dateCreated:number,
  onClickSavedNote: (savedNote:Note)=>void,
  savedNotes:Dictionary<number, Note>
}

export default function NoteCard(props:Props) {
  return (
    <div className='savedNote'>         
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
