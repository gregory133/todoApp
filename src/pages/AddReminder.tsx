import { IonButton, IonContent, IonDatetime, IonFooter, IonHeader, IonIcon, IonPage, IonRadio, IonRadioGroup, IonTextarea, IonToolbar } from '@ionic/react'
import { addOutline, chevronBackOutline } from 'ionicons/icons'
import React, { useLayoutEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import './AddReminder.css'
import ReminderFlairRadio from '../components/ReminderFlairRadio'
import { Flair } from '../classes/Reminder'

interface Props{
  isEditing:boolean
}

export default function AddReminder(props:Props) {

  const selectedFlairRef=useRef(-1)
  const flairRef=useRef<HTMLIonRadioGroupElement>(null)
  const memoRef=useRef<HTMLIonTextareaElement>(null)
  const history=useHistory()

  function constructRemainder(){
    const memo=memoRef.current?.value?.toString()
    let flair:Flair='none'

    flairRef.current?.childNodes.forEach((childNode)=>{
      const radioButtonElement=childNode as HTMLIonRadioElement
      if (radioButtonElement.ariaChecked==='true'){
        flair=radioButtonElement.innerText as Flair
      }
    })
  }

  function onClickBackButton(){
    if (props.isEditing){

    }
    else{
      let remainder=constructRemainder()
    }
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
            <IonTextarea ref={memoRef} color='black' placeholder='Add Memo'
            style={{backgroundColor: '#171717', color: 'white',
            fontFamily: 'SignikaNegative', fontSize: 20,
            borderRadius: '10px', height: 150, padding: '0px 15px 0px 15px'
            }}/>
          </div>
          <div style={{backgroundColor: '#171717', borderRadius: 10,
          marginBottom: 10}}>
            <IonDatetime style={{borderRadius: 10,
              color: 'white', backgroundColor: '#171717'
            }} preferWheel={true}/>
          </div>
          
          <div style={{color: 'white', padding: 20, backgroundColor: '#171717', 
          borderRadius: 10,
          flexGrow: 1, flex: 1, flexShrink :1, fontSize: 20}}>
            Add a Flair
            <div>
              <IonRadioGroup allowEmptySelection={true} ref={flairRef}
              style={{display: 'flex', flexDirection: 'column'}}>
                <ReminderFlairRadio label='Homework'/>
                <ReminderFlairRadio label='Exam'/>
                <ReminderFlairRadio label='Work'/>
                <ReminderFlairRadio label='Appointment'/>
                <ReminderFlairRadio label='Chore'/>
                <ReminderFlairRadio label='Miscellaneous'/>
              </IonRadioGroup>
            </div>
          </div>
        </div>
        
        
      </IonContent>
      
    </IonPage>
  )
}
