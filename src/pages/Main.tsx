import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import React from 'react'
import { menuOutline, addOutline } from 'ionicons/icons';
import './Main.css'
import { useHistory, useLocation } from 'react-router-dom';


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
              All Notes
            </span>
          </div>         
           
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='content'>
          <h1>
            No notes
          </h1>
          <p>
            Tap the Add button to create a note.
          </p>
          
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
