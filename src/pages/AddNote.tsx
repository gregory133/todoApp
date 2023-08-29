import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef } from 'react'
import { chevronBackOutline,  } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AddNote.css'
import Note from '../classes/Note';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../redux/store';
import { addNote } from '../redux/slices/notesSlice';

export default function AddNote() {

  const history=useHistory()
  const dispatch=useDispatch()
  const notes=useSelector((state:StoreState)=>state.notes.notes)
  const currentNote=useSelector((state:StoreState)=>state.notes.currentNote)

  useEffect(()=>{
    console.log(currentNote);
  }, [])
  
  useEffect(()=>{
    // console.log(notes);
  }, [notes])

  const contentInputRef=useRef<null|HTMLIonTextareaElement>(null)
  const titleInputRef=useRef<null|HTMLIonInputElement>(null)

  function onClickBackButton(){
    
    const createdNote=createNote()
    if (createdNote){
      dispatch(addNote(JSON.stringify({title:createdNote.title, content:createdNote.content})))
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
