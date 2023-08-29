import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { chevronBackOutline,  } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AddNote.css'
import Note from '../classes/Note';
import { useNotesStore } from '../stores/notesStore';

export default function AddNote() {

  const history=useHistory()
  const [isEditing, setIsEditing]=useState<boolean>(false)

  const addNote=useNotesStore(state=>state.addNote)
  const setCurrentNote=useNotesStore(state=>state.setCurrentNote)
  const currentNote=useNotesStore(state=>state.currentNote)

  const contentInputRef=useRef<null|HTMLIonTextareaElement>(null)
  const titleInputRef=useRef<null|HTMLIonInputElement>(null)

  useEffect(()=>{
    if (currentNote){
      setIsEditing(true)
    }
  }, [])

  function onClickBackButton(){
    setCurrentNote(null)
    const createdNote=createNote()
    if (!isEditing){
      if (createdNote?.title){
        addNote(createdNote)
      }
      

    }
    else{
      if (createdNote?.title){
        console.log(createdNote);
      }
    }
    
    history.goBack()
    
  }

  function createNote():Note|null{
    if (titleInputRef.current && contentInputRef.current ){
      
      const title:string=titleInputRef.current.value?.toString()!
      const content:string=contentInputRef.current.value?.toString()!
  
      if (title!=''){
        return new Note(title, content) 
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
              <IonIcon icon={chevronBackOutline}/>
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
