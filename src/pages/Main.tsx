import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import React from 'react'
import { menuOutline, addOutline } from 'ionicons/icons';
import './Main.css'

export default function Main() {
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

      </IonContent>
      <IonFooter>
        <IonButton>
          <IonIcon icon={addOutline}/>
        </IonButton>
      </IonFooter>
    </IonPage>
  )
}
