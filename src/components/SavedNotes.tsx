import React, { useEffect, useState } from 'react'
import Note from '../classes/Note';
import './SavedNotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { IonButton } from '@ionic/react';
import { IonRippleEffect } from '@ionic/react';
import { useHistory } from 'react-router';
import { useNotesStore } from '../stores/notesStore';

export default function SavedNotes() {

  const history=useHistory()
  const savedNotes=useNotesStore(state=>state.savedNotes)
  const currentNote=useNotesStore(state=>state.currentNote)
  const setCurrentNote=useNotesStore(state=>state.setCurrentNote)


  function onClickSavedNote(savedNote:Note){
    setCurrentNote(savedNote)
  }

  useEffect(()=>{
    if (currentNote){
      // console.log(currentNote);
      history.push('/addNote')
    }

  }, [currentNote])

  return (

    <>
    {
      savedNotes.size()==0 
      ? (
        <div className='empty'>
          <h1>
            No notes
          </h1>
          <p>
            Tap the Add button to create a note.
          </p>
        </div> 
        
      )
      : (
        <div className='notesContainer'>
          {
            savedNotes.keys().sort((a, b)=>a-b).map((key, index)=>
            <div key={index} className='savedNote'>
              
              <div className=' ion-activatable' 
              onClick={()=>onClickSavedNote(savedNotes.getValue(key)!)}>
                <IonRippleEffect/>
                {savedNotes.getValue(key)!.content}
              </div>
              <span>
                {savedNotes.getValue(key)!.title}
              </span>
            </div>
            )
          }
        </div>
      )
    }  
    </>
    
  )
}
