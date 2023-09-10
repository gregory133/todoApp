import { IonButton, IonContent, IonDatetime, IonFooter, IonHeader, IonIcon, IonMenu, IonMenuToggle, IonPage, IonToolbar } from '@ionic/react'
import { addOutline, menuOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'
import './AllReminders.css'
import MenuContent from '../components/MenuContent'
import SavedReminders from '../components/SavedReminders'

export default function AllReminders() {

  const history=useHistory()

  function onClickAddNoteButton(){
    history.push('/addReminder')
  }

  return (
    <>
      <IonMenu contentId='AllReminders'>
        <IonContent>
          <div className='menuContent'>
            <MenuContent type='allReminders'/>
          </div>
        </IonContent>
      </IonMenu>
      <IonPage id='AllReminders'>
        <IonHeader>
          <IonToolbar>
            <div style={{color: 'white', display: 'flex'}} className='toolbar'>
              <IonMenuToggle>
                <IonButton>
                  <IonIcon className='menuIcon' icon={menuOutline}/>
                </IonButton>
              </IonMenuToggle>
              
              All Reminders
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{padding: 10}}>
            <IonDatetime style={{borderRadius: 10, backgroundColor: 'black',
            color: 'white', fontWeight: 200, fontFamily: 'SignikaNegative'}}/>
          </div>
          <SavedReminders/>
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
