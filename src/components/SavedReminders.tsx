import React, { useEffect } from 'react'
import { useReminderStore } from '../stores/reminderStore'
import ReminderCard from './ReminderCard'
import { IonContent } from '@ionic/react'
import Reminder from '../classes/Reminder'
import { useDbStore } from '../stores/dbStore'
import { createReminderTableIfNotExist, getAllReminders } from '../database/remindersDBInterface'

export default function SavedReminders() {

  const reminders=useReminderStore(state=>state.reminders)
  const addReminder=useReminderStore(state=>state.addReminder)
  const deleteReminder=useReminderStore(state=>state.deleteReminder)
  const editReminder=useReminderStore(state=>state.editReminder)

  const db=useDbStore(state=>state.db)

  function loadRemindersFromDB(){
    getAllReminders(db!)
    .then((storedReminders:Reminder[])=>{
      console.log(storedReminders);
      storedReminders.forEach((storedReminder:Reminder)=>{
        addReminder(storedReminder)
      })
    })
  }

  useEffect(()=>{
    createReminderTableIfNotExist(db!)
    loadRemindersFromDB()
  }, [db])

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
