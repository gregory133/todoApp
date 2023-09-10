import React, { useEffect, useRef, useState } from 'react'
import Note from '../classes/Note';
import './SavedNotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { IonButton, IonModal } from '@ionic/react';
import { IonRippleEffect } from '@ionic/react';
import { useHistory } from 'react-router';
import { useNotesStore } from '../stores/notesStore';
import NoteCard from './NoteCard';
import {createNotesTableIfNotExist, deleteNoteFromDB, addNoteToDB, getAllNotes
  ,getNumberOfNotes
} from '../database/notesDBInterface'
import { useDbStore } from '../stores/dbStore';

export default function SavedNotes() {

  const history=useHistory()
  const savedNotes=useNotesStore(state=>state.savedNotes)
  const currentNote=useNotesStore(state=>state.currentNote)
  const setCurrentNote=useNotesStore(state=>state.setCurrentNote)
  const deleteNote=useNotesStore(state=>state.deleteNote)
  const addNote=useNotesStore(state=>state.addNote)

  const longPressedDateCreatedRef=useRef<number>(0)
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen]=useState<boolean>(false)
  const [finishedLoading, setFinishedLoading]=useState(false)
  const db=useDbStore(state=>state.db)

  useEffect(()=>{
    async function dbRoutine(){
      // console.log('db', JSON.stringify(db));
      await createNotesTableIfNotExist(db!)
      let storedNotes=await getAllNotes(db!)
      storedNotes.forEach((storedNote:Note)=>{
        addNote(storedNote)
      }) 
      
    }
    if (db){
      dbRoutine()
    }
   
  }, [db])

  useEffect(()=>{
    if (db){
      getNumberOfNotes(db)
      .then(numberOfNotesInDB=>{
        console.log('number', numberOfNotesInDB);
        const numberOfNotesActuallyLoaded=savedNotes.keys().length
        if (numberOfNotesActuallyLoaded==numberOfNotesInDB){
          setFinishedLoading(true)
        }
      })
    }
    
  }, [savedNotes, db])

  function onClickSavedNote(savedNote:Note){
    setCurrentNote(savedNote)
  }

  function onLongPressedNote(dateCreated:number){
    // console.log('long pressed', dateCreated);
    setConfirmDeleteModalOpen(true)
    longPressedDateCreatedRef.current=dateCreated
  }

  function deleteLongPressedNote(){
    
    const dateCreatedToDelete=longPressedDateCreatedRef.current
    // console.log('trying to delete', dateCreatedToDelete);
    deleteNote(dateCreatedToDelete)
    if (db){
      deleteNoteFromDB(dateCreatedToDelete, db)
    }
    setConfirmDeleteModalOpen(false)

  }

  useEffect(()=>{
    if (currentNote){
      history.push('/addNote')
    }

  }, [currentNote])


  return (

    <>{
      finishedLoading
      ? (savedNotes.size()==0 
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
                onClickSavedNote={onClickSavedNote} 
                onLongPressedNote={onLongPressedNote}
                savedNotes={savedNotes}/>
              )
            }
          </div>
        ))
      : (null)
  
    }

    
    <IonModal onDidDismiss={()=>{setConfirmDeleteModalOpen(false)}} 
    isOpen={confirmDeleteModalOpen}>
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
