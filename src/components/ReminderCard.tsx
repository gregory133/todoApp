import React, { useEffect, useState } from 'react'
import Reminder from '../classes/Reminder'
import { IonButton, IonIcon, IonModal, IonRippleEffect } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import IconButton from './IconButton'
import './ReminderCard.css'
import { useReminderStore } from '../stores/reminderStore'
import { deleteNoteFromDB } from '../database/notesDBInterface'
import { useDbStore } from '../stores/dbStore'
import { deleteReminderFromDB } from '../database/remindersDBInterface'
import { useHistory } from 'react-router'

interface Props{
  reminder:Reminder|undefined
}

export default function ReminderCard(props:Props) {

  const [isDeleteModalOpen, setIsDeleteModalOpen]=useState(false)

  const currentReminder=useReminderStore(state=>state.currentReminder)
  const setCurrentReminder=useReminderStore(state=>state.setCurrentReminder)
  const deleteReminderFromStore=useReminderStore(state=>state.deleteReminder)

  const history=useHistory()

  const db=useDbStore(state=>state.db)

  function parseISODatetime(isoDatetime:string){
    let prettyString=new Date(props.reminder?.dateTime!).toString()

    const mainParts=prettyString.split(' ')
    const timeParts=mainParts[4].split(':')
    
    prettyString=`${mainParts[0]}, ${mainParts[1]} ${mainParts[2]}, ${timeParts[0]}:${timeParts[1]}`
    return prettyString
  }

  function onClickDeleteButton(){
    setIsDeleteModalOpen(true)
  }

  function onClickEditButton(){
    // console.log('wanted to edit');

    const reminder=props.reminder! as Reminder
    setCurrentReminder(reminder)
    
  }

  useEffect(()=>{
    // console.log(JSON.stringify(currentReminder));
    if (currentReminder){
      history.push('/addReminder')
    }
  }, [currentReminder])

  function deleteReminder(){
    const dateCreated:number=props.reminder?.dateCreated!
    deleteReminderFromStore(dateCreated)
    deleteReminderFromDB(dateCreated, db!)
    setIsDeleteModalOpen(false)
  }

  useEffect(()=>{
    // console.log(isDeleteModalOpen);
  }, [isDeleteModalOpen])

  return (
    <div style={{marginBottom: 10, minHeight: 50, display: 'flex', flexDirection: 'row', 
    justifyContent :'space-between', alignItems: 'center',
    backgroundColor: '#3A3A3A', borderRadius: 10,
    padding: 5}}>
      <div style={{paddingLeft:5, display: 'flex', flexDirection: 'column'}}>
        <span style={{color: 'white'}}>{props.reminder?.memo}</span>
        <span style={{fontSize: 11, color: '#A2A2A2'}}>
          {parseISODatetime(props.reminder?.dateTime!)}
        </span>
      </div>
      <div style={{display :'flex'}}>
        <IconButton onClick={onClickEditButton} color= '#0481FF' icon={createOutline}/>  
        <IconButton onClick={onClickDeleteButton} color='#F16B4F' icon={trashOutline}/>  
      </div>
      
      <IonModal onDidDismiss={()=>{setIsDeleteModalOpen(false)}} 
      isOpen={isDeleteModalOpen}>
        <div className='deleteReminderModal'>
          <span>Delete the reminder?</span>    
          <div>
            <span onClick={()=>{setIsDeleteModalOpen(false)}}>Cancel</span>
            <div></div>
            <span onClick={deleteReminder} className='red'>Delete</span>
          </div>
        </div>
      </IonModal>
      
    </div>
  )
}
