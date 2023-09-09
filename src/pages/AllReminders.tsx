import { IonButton, IonContent, IonDatetime, IonFooter, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react'
import { addOutline, menuOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import './AllReminders.css'

export default function AllReminders() {

  const history=useHistory()


  function onClickAddNoteButton(){
    history.push('/addReminder')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='toolbar'>
            <IonButton>
              <IonIcon className='menuIcon' icon={menuOutline}/>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{padding: 10}}>
          <IonDatetime style={{borderRadius: 10, backgroundColor: 'black',
          color: 'white', fontWeight: 200, fontFamily: 'SignikaNegative'}}/>
        </div>
      </IonContent>
      <IonFooter>
        <IonButton onClick={onClickAddNoteButton}>
          <IonIcon className='footerIcon' icon={addOutline}/>
        </IonButton>
      </IonFooter>
    </IonPage>
  )
}
