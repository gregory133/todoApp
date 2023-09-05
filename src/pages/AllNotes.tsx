import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { menuOutline, addOutline } from 'ionicons/icons';
import './AllNotes.css'
import { useHistory, useLocation } from 'react-router-dom';
import SavedNotes from '../components/SavedNotes';
import {database} from '../App'
import { SQLiteObject } from '@ionic-native/sqlite';
import {useDbStore} from '../stores/dbStore'


export default function Main(){

  const db=useDbStore(state=>state.db)
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='toolbar'>
            <IonButton>
              <IonIcon className='menuIcon' icon={menuOutline}/>
            </IonButton>
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
        <IonButton onClick={()=>{history.push('/addNote')}}>
          <IonIcon className='footerIcon' icon={addOutline}/>
        </IonButton>
      </IonFooter>
    </IonPage>
  )
}
