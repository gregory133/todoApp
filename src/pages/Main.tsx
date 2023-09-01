import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import React, { useEffect } from 'react'
import { menuOutline, addOutline } from 'ionicons/icons';
import './Main.css'
import { useHistory, useLocation } from 'react-router-dom';
import SavedNotes from '../components/SavedNotes';

export default function Main() {

  const history = useHistory();


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='test'>
          <div className='toolbar'>
            <IonButton>
              <IonIcon icon={menuOutline}/>
            </IonButton>
            <span>
              All Notess
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
