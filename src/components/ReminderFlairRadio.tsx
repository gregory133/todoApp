import { IonRadio } from '@ionic/react'
import React from 'react'
import './ReminderFlairRadio.css'

interface Props{
  label:string,
  value:number
  // defaultChecked:boolean
}

export default function ReminderFlairRadio(props:Props) {

  // console.log(props.value);

  return (
    <IonRadio value={props.value} style={{margin:5}} justify='start' labelPlacement='end'>
      {props.label}
    </IonRadio>
  )
}
