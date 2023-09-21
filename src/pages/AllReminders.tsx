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
import { LocalNotifications } from '@capacitor/local-notifications'

export default function AllReminders() {

  const setCurrentReminder=useReminderStore(state=>state.setCurrentReminder)
  const history=useHistory()

  const db=useDbStore(state=>state.db)
  const reminders=useReminderStore(state=>state.reminders)

  function onClickAddNoteButton(){
    setCurrentReminder(null)
    history.push('/addReminder')
  }
  
  useEffect(()=>{

  }, [reminders])

  useEffect(()=>{
    console.log('loading notifications');
    LocalNotifications.schedule({
      notifications:[
        {
          title: 'test',
          body: 'notification body',
          id: 1,
          schedule: { at: new Date(Date.now()+3000)}
        }
      ]
    })
  }, [])

  useEffect(()=>{
    const shadow=document.getElementsByTagName('ion-datetime')[0].shadowRoot
    
    // setTimeout(()=>{
    //   const elements : HTMLCollection = shadow?.children.item(0)
    //   ?.getElementsByClassName('calendar-day')!

    //   for (let i=0; i<elements.length; i++){
    //     const item=elements.item(i) as HTMLElement
    //     console.log(item);
    //     item.style.border='1px solid'
    //     item.style.borderColor='red'
    //   }
    // }, 1000)
  }, [])

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
