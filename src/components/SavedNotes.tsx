import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StoreState } from '../redux/store';
import Note from '../classes/Note';
import './SavedNotes.css'

export default function SavedNotes() {

  const notes:Note[]=useSelector((state:StoreState)=>state.notes.notes)
  const [savedNotes, setSavedNotes]=useState<Note[]>(notes)

  useEffect(()=>{
    setSavedNotes(notes)
  }, [notes])


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
              <div>
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
