import { IonButton, IonContent, IonDatetime, IonFooter, IonHeader, IonIcon, IonPage, IonRadio, IonRadioGroup, IonTextarea, IonToolbar } from '@ionic/react'
import { addOutline, chevronBackOutline } from 'ionicons/icons'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import './AddReminder.css'
import ReminderFlairRadio from '../components/ReminderFlairRadio'
import Reminder, { Flair } from '../classes/Reminder'
import { useReminderStore } from '../stores/reminderStore'
import { addReminderToDB, updateReminderInDB } from '../database/remindersDBInterface'
import { useDbStore } from '../stores/dbStore'

export default function AddReminder() {

  const [isEditing, setIsEditing]=useState(false)

  const addReminder=useReminderStore(state=>state.addReminder)
  const editReminder=useReminderStore(state=>state.editReminder)
  const currentReminder=useReminderStore(state=>state.currentReminder)
  const reminders=useReminderStore(state=>state.reminders)

  const db=useDbStore(state=>state.db)

  const selectedFlairRef=useRef(-1)
  const flairRef=useRef<HTMLIonRadioGroupElement>(null)
  const ionDatetimeRef=useRef<HTMLIonDatetimeElement>(null)
  const memoRef=useRef<HTMLIonTextareaElement>(null)

  const history=useHistory()

  const [currentDatetime, setCurrentDatetime]=useState<string>(
    new Date(Date.now()).toISOString())
  const [currentMemoText, setCurrentMemoText]=useState<string>('')
  const [currentFlairValue, setCurrentFlairValue]=useState(-1)

  const flairLabels=['Homework', 'Exam', 'Work', 'Appointment', 'Chore', 
  'Miscellaneous']

  function constructRemainder(){
    let memo=memoRef.current?.value?.toString()
    if (memo === undefined){
      memo=''
    }
    let flair:Flair='None'
    try{
      flair=flairLabels[flairRef.current?.value] as Flair
    }
    catch (err){}
  

    let datetime=currentDatetime
    if (datetime==''){
      datetime=new Date(Date.now()).toISOString()
    }
    
    const reminderConstructed=new Reminder(memo, datetime, flair)
    // console.log(JSON.stringify(reminderConstructed));
    return reminderConstructed

  }

  function onDatetimeChange(event:any){
    setCurrentDatetime(event.detail.value)
  }
  function onMemoTextareaChange(){
    const newMemo:string=memoRef.current?.value!;
    setCurrentMemoText(newMemo)
  }

  useEffect(()=>{
    if (currentReminder){
      setReminderValues(currentReminder)
      setIsEditing(true)
    }
  }, [])

  useEffect(()=>{
    ionDatetimeRef.current?.reset(currentDatetime)
  }, [currentDatetime])

  function setReminderValues(reminder:Reminder){
    setCurrentDatetime(reminder.dateTime)
    setCurrentMemoText(reminder.memo)
    for (let i=0; i<flairLabels.length; i++){
      const flairLabel=flairLabels[i]
      if (flairLabel==reminder.flair){
        setCurrentFlairValue(i)
        break;
      }
    }
  }

  function addOrUpdateReminder(){
    let reminder=constructRemainder()
    if (isEditing){
      reminder.dateCreated=currentReminder?.dateCreated!
      editReminder(currentReminder?.dateCreated!, reminder)
      updateReminderInDB(reminder.dateCreated, db!, reminder)
    }
    else{
      addReminder(reminder)
      addReminderToDB(reminder, db!)
    }
  }

  function onClickBackButton(){
    addOrUpdateReminder()
    history.goBack()
  }
  

  return (
 
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <IonButton onClick={onClickBackButton}>
              <IonIcon className='backIcon'
              icon={chevronBackOutline}/>
            </IonButton>
            <p style={{fontSize: 25, margin: 0,
              display: 'flex', flexDirection: 'row', alignItems: 'center', 
              color: 'white'}}>New Reminder</p>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{display:'flex', flexDirection: 'column',
         padding: 10, height :'100%'}}>
          <div style={{marginBottom: 10}}>
            <IonTextarea value={currentMemoText} ref={memoRef} color='black' 
            placeholder='Add Memo' style={{backgroundColor: '#171717', color: 'white',
            fontFamily: 'SignikaNegative', fontSize: 20,
            borderRadius: '10px', height: 150, padding: '0px 15px 0px 15px'
            }} onIonChange={onMemoTextareaChange}/>
          </div>
          <div style={{backgroundColor: '#171717', borderRadius: 10,
          marginBottom: 10}}>
            <IonDatetime 
            ref={ionDatetimeRef}
            value={currentDatetime}
            onIonChange={onDatetimeChange}
            style={{borderRadius: 10,
              color: 'white', backgroundColor: '#171717'
            }} preferWheel={true}/>
          </div>
          
          <div style={{color: 'white', padding: 20, backgroundColor: '#171717', 
          borderRadius: 10,
          flexGrow: 1, flex: 1, flexShrink :1, fontSize: 20}}>
            Add a Flair
            <div>
              <IonRadioGroup value={currentFlairValue} allowEmptySelection={true} 
              ref={flairRef}
              style={{display: 'flex', flexDirection: 'column'}}>
                {
                  flairLabels.map((flairLabel:string, index:number)=>{
                    return <ReminderFlairRadio key={index} label={flairLabel}
                    value={index}/>
                  })
                }
              </IonRadioGroup>
            </div>
          </div>
        </div>
        
        
      </IonContent>
      
    </IonPage>
  )
}
