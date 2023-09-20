import { IonButton, IonContent, IonDatetime, IonFooter, IonHeader, IonIcon, IonMenu, IonMenuToggle, IonPage, IonToolbar } from '@ionic/react'
import { addOutline, menuOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './AllReminders.css'
import MenuContent from '../components/MenuContent'
import SavedReminders from '../components/SavedReminders'
import { useReminderStore } from '../stores/reminderStore'
import { useDbStore } from '../stores/dbStore'
import Reminder from '../classes/Reminder'
import flairColorDict  from '../classes/FlairColors'

export default function AllReminders() {

  const setCurrentReminder=useReminderStore(state=>state.setCurrentReminder)
  const history=useHistory()

  const db=useDbStore(state=>state.db)
  const reminders=useReminderStore(state=>state.reminders)

  function onClickAddNoteButton(){
    setCurrentReminder(null)
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
            color: 'white', fontWeight: 200, fontFamily: 'SignikaNegative'}}
            highlightedDates={
              reminders.values().map((reminder: Reminder, key:number)=>{
                const date=reminder.dateTime.split('T')[0]
                const flair=reminder.flair
                return {
                  date: date, textColor: '#ffffff', 
                  backgroundColor: flairColorDict.getValue(flair)}
              })
            }/>
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
