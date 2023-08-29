import React, { useEffect, useState } from 'react'
import { StoreState, AppDispatch } from '../redux/store';
import Note from '../classes/Note';
import './SavedNotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { IonButton } from '@ionic/react';
import { IonRippleEffect } from '@ionic/react';
import { useHistory } from 'react-router';
import { setCurrentNote, setCurrentNoteAsync } from '../redux/slices/notesSlice';

export default function SavedNotes() {

  const notes:Note[]=useSelector((state:StoreState)=>state.notes.notes)
  const currentNote=useSelector((state:StoreState)=>state.notes.currentNote)
  const [savedNotes, setSavedNotes]=useState<Note[]>(notes)
  const history=useHistory()
  const dispatch=useDispatch<AppDispatch>()

  useEffect(()=>{
    setSavedNotes(notes)
  }, [notes])

  function onClickSavedNote(savedNote:Note){
    
    dispatch(setCurrentNoteAsync(savedNote)) 
    
  }

  useEffect(()=>{
    if (currentNote){
      history.push('addNote')
    }
  }, [currentNote])

  return (

    <>
    {
      savedNotes.length==0 
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
            savedNotes.map((savedNote, index)=>
            <div key={index} className='savedNote'>
              
              <div className=' ion-activatable' onClick={()=>onClickSavedNote(savedNote)}>
                <IonRippleEffect/>
                {savedNote.content}
              </div>
              <span>
                {savedNote.title}
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
