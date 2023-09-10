import React, { useEffect } from 'react'
import { useReminderStore } from '../stores/reminderStore'
import ReminderCard from './ReminderCard'
import { IonContent } from '@ionic/react'
import Reminder from '../classes/Reminder'

export default function SavedReminders() {

  const reminders=useReminderStore(state=>state.reminders)
  const addReminder=useReminderStore(state=>state.addReminder)
  const deleteReminder=useReminderStore(state=>state.deleteReminder)
  const editReminder=useReminderStore(state=>state.editReminder)

  useEffect(()=>{
    // addReminder(new Reminder('Test reminder', new Date(Date.now()).toISOString(),
    // 'none'))
    // addReminder(new Reminder('Test reminder 2', new Date(Date.now()).toISOString(),
    // 'work'))
  }, [])

  return (
    <div style={{backgroundColor: '#171717', margin: 10, 
    borderRadius :10, padding: 10, height: 300}}>
      
      {
        reminders.keys().sort((a, b)=>a-b).map((key:number, index:number)=>{
          return <ReminderCard key={index} reminder={reminders.getValue(key)}/>
        })
      }
    </div>
  )
}
