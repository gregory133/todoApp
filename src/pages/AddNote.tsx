import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from '@ionic/react'
import React, { useRef } from 'react'
import { chevronBackOutline,  } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AddNote.css'
import Note from '../classes/Note';


export default function AddNote() {

  const history=useHistory()

  const contentInputRef=useRef<null|HTMLIonTextareaElement>(null)
  const titleInputRef=useRef<null|HTMLIonInputElement>(null)

  function onClickBackButton(){
    
    const createdNote=createNote()
    if (createdNote){
      
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
            <IonInput ref={titleInputRef}
             color='black' className='titleInput' placeholder='Title'/>
          </div>
        </IonToolbar>
        
        
      </IonHeader>
      <IonContent>
        <IonTextarea ref={contentInputRef}
         color='black' className='input' placeholder='Add your notes here'/>
      </IonContent>
      
      <IonFooter>
      </IonFooter>
    </IonPage>
  )
}
