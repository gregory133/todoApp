import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonToolbar } from '@ionic/react'
import React from 'react'
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './AddNote.css'

export default function AddNote() {

  const history=useHistory()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='toolbar'>
            <IonButton onClick={()=>{history.goBack()}}>
              <IonIcon icon={chevronBackOutline}/>
            </IonButton>
            <IonInput placeholder='Title'/>
          </div>
        </IonToolbar>
        
        
      </IonHeader>
      <IonContent>
        <IonTextarea className='input' placeholder='Add your notes here'/>
      </IonContent>
      <IonFooter>

      </IonFooter>
    </IonPage>
  )
}
