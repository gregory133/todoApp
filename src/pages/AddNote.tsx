import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { chevronBackOutline,  } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AddNote.css'
import Note from '../classes/Note';
import { useNotesStore } from '../stores/notesStore';
import {clearTable, createNotesTableIfNotExist, addNoteToDB,
getAllNotes, test} from '../database/db'
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

  useEffect(()=>{
    if (currentNote){
      setIsEditing(true)
    }
  }, [])

  useEffect(()=>{
    // async function effect(){
    //   try{
    //     await createNotesTableIfNotExist()
    //     await addNoteToDB(new Note('hello', 'world'))
    //     const result=await getAllNotes()
    //     console.log(result.rows.item(0))
    //   }
    //   catch (err:any){
    //     console.log('error', err.message);
    //   }
      
    // }
    // effect()
    test()
  }, [])

  async function addNote(note:Note){
    addNoteToStore(note)
    // const platform = (await sqlite.getPlatform()).platform;
    // console.log('platform', platform);
    // const db = await sqlite.createConnection(
    //   "testNew", false, "no-encryption", 1);
    // await db.open();
    // let ret: any = await db.execute(`
    //   CREATE TABLE Notes (
    //     dateCreated INTEGER PRIMARY KEY NOT NULL
    //   )`);
    // console.log(ret);
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
      const content:string=contentInputRef.current.value?.toString()!
  
      if (title!=''){
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
