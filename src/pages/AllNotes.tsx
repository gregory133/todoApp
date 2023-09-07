import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { menuOutline, addOutline } from 'ionicons/icons';
import './AllNotes.css'
import { useHistory, useLocation } from 'react-router-dom';
import SavedNotes from '../components/SavedNotes';
import {database} from '../App'
import { SQLiteObject } from '@ionic-native/sqlite';
import {useDbStore} from '../stores/dbStore'
import { useNotesStore } from '../stores/notesStore';
import MenuContent from '../components/MenuContent';

export default function Main(){

  const db=useDbStore(state=>state.db)
  const setCurrentNotes=useNotesStore(state=>state.setCurrentNote)

  const location = useLocation();
  const history = useHistory();

  // useEffect(()=>{
  //   console.log(location.pathname);
  // }, [])

  function onClickAddNoteButton(){
    setCurrentNotes(null)
    history.push('/addNote')
  }

  return (
    <>
      <IonMenu contentId='AllNotes'>
        <IonContent>
          <div className='menuContent'>
            <MenuContent/>
          </div>
          
        </IonContent>
      </IonMenu>
      
      <IonPage id='AllNotes'>
        <IonHeader>
          <IonToolbar>
            <div className='toolbar'>
              <IonMenuToggle>
                <IonButton>
                  <IonIcon className='menuIcon' icon={menuOutline}/>
                </IonButton>
              </IonMenuToggle>
              
              <span>
                All Notes
              </span>    
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='content'>
            <SavedNotes/> 
          </div>
        </IonContent>
        <IonFooter>
          <IonButton onClick={onClickAddNoteButton}>
            <IonIcon className='footerIcon' icon={addOutline}/>
          </IonButton>
        </IonFooter>
      </IonPage>
    </>
    
  )
}
