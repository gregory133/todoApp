import { IonRadio } from '@ionic/react'
import React from 'react'
import './ReminderFlairRadio.css'

interface Props{
  label:string,
  // defaultChecked:boolean
}

export default function ReminderFlairRadio(props:Props) {
  return (
    <IonRadio style={{margin:5}} justify='start' labelPlacement='end'>
      {props.label}
    </IonRadio>
  )
}
