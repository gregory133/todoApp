import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { chevronBackOutline,  } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AddNote.css'
import Note from '../classes/Note';
import { useNotesStore } from '../stores/notesStore';
import {clearTable, createNotesTableIfNotExist, addNoteToDB,
getAllNotes, deleteTable, deleteNoteFromDB, updateNoteInDB} from '../database/db'
import { useDbStore } from '../stores/dbStore';
export default function AddNote() {

  const history=useHistory()
  const [isEditing, setIsEditing]=useState<boolean>(false)

  const savedNotes=useNotesStore(state=>state.savedNotes)
  const addNoteToStore=useNotesStore(state=>state.addNote)
  const setCurrentNote=useNotesStore(state=>state.setCurrentNote)
  const currentNote=useNotesStore(state=>state.currentNote)
  const editNote=useNotesStore(state=>state.editNote)

  const contentInputRef=useRef<null|HTMLIonTextareaElement>(null)
  const titleInputRef=useRef<null|HTMLIonInputElement>(null)

  const db=useDbStore(state=>state.db)

  useEffect(()=>{
    if (currentNote){
      setIsEditing(true)
    }
  }, [])

  async function addNote(note:Note){
    addNoteToStore(note)
    if (db){
      addNoteToDB(note, db)
    }
    
  }

  function onClickBackButton(){
    setCurrentNote(null)
    

    if (!isEditing){
      const createdNote=createNote()
      if (createdNote?.title){
        addNote(createdNote)
      }
      
    }
    else{
      const createdNote=createNote(currentNote?.dateCreated)
      if (createdNote?.title){
        editNote(createdNote.dateCreated, createdNote)
        if (db){
          updateNoteInDB(createdNote.dateCreated, createdNote, db)
        }
        
      }
    }
    
    history.goBack()
    
  }

  useEffect(()=>{
    // console.log(savedNotes.values()); 
  }, [savedNotes])

  function createNote(dateCreatedOverride?:number):Note|null{
    if (titleInputRef.current && contentInputRef.current ){
      
      const title:string=titleInputRef.current.value?.toString()!
      let content:string=contentInputRef.current.value?.toString()!
  
      if (title!=''){
        if (content===undefined){
          content=''
        }
        const createdNote=new Note(title, content) 
        if (dateCreatedOverride){
          // console.log('here');
          createdNote.dateCreated=dateCreatedOverride
        }
        return createdNote
      }
      else{
        return null
      }
      

    }
    else{
      return null;
    }
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='toolbar'>
            <IonButton onClick={onClickBackButton}>
              <IonIcon className='backIcon'
               icon={chevronBackOutline}/>
            </IonButton>
            <IonInput ref={titleInputRef} value={currentNote?.title}
             color='black' className='titleInput' placeholder='Title'/>
          </div>
        </IonToolbar>
        
        
      </IonHeader>
      <IonContent>
        <IonTextarea ref={contentInputRef} value={currentNote?.content}
         color='black' className='input' placeholder='Add your notes here'/>
      </IonContent>
      
      <IonFooter>
      </IonFooter>
    </IonPage>
  )
}
