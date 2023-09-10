import { IonIcon, IonModal, IonRippleEffect } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import React, { useState } from 'react'

interface Props{
  icon:string,
  color: string,
  onClick:()=>void
}

export default function IconButton(props:Props) {

  return (
    <div onClick={props.onClick} style={{width: 50, height: 50, padding: 10, borderRadius: '100%',
    display :'flex', justifyContent: 'center', alignItems: 'center'}} 
    className='ion-activatable'>
      <IonIcon style={{color: props.color,
        width: '100%', height: '100%'}} icon={props.icon}/>
      <IonRippleEffect/>

    </div>
  )
}
