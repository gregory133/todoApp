import React, { useEffect, useRef, useState } from 'react'
import Note from '../classes/Note';
import './SavedNotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { IonButton, IonModal } from '@ionic/react';
import { IonRippleEffect } from '@ionic/react';
import { useHistory } from 'react-router';
import { useNotesStore } from '../stores/notesStore';
import NoteCard from './NoteCard';

export default function SavedNotes() {

  const history=useHistory()
  const savedNotes=useNotesStore(state=>state.savedNotes)
  const currentNote=useNotesStore(state=>state.currentNote)
  const setCurrentNote=useNotesStore(state=>state.setCurrentNote)

  const longPressedDateCreatedRef=useRef<number>(0)
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen]=useState<boolean>(false)


  function onClickSavedNote(savedNote:Note){
    setCurrentNote(savedNote)
  }

  function onLongPressedNote(dateCreated:number){
    setConfirmDeleteModalOpen(true)
    longPressedDateCreatedRef.current=dateCreated
  }

  function deleteLongPressedNote(){
    const dateCreatedToDelete=longPressedDateCreatedRef.current
    
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
              <NoteCard key={index} dateCreated={key}
              onClickSavedNote={onClickSavedNote} onLongPressedNote={onLongPressedNote}
              savedNotes={savedNotes}/>
            )
          }
        </div>
      )
    }  
    <IonModal onDidDismiss={()=>{setConfirmDeleteModalOpen(false)}} isOpen={confirmDeleteModalOpen}>
      <div className='deleteModalContent'>
        <span>Delete the note?</span>    
        <div>
          <span onClick={()=>{setConfirmDeleteModalOpen(false)}}>Cancel</span>
          <div></div>
          <span onClick={deleteLongPressedNote} className='red'>Delete</span>
        </div>
      </div>
    </IonModal>
    </>
    
  )
}
