import { IonIcon, IonRippleEffect } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import React from 'react'

interface Props{
  icon:string
}

export default function IconButton(props:Props) {
  return (
    <div style={{width: 50, height: 50, padding: 10, borderRadius: '100%',
    display :'flex', justifyContent: 'center', alignItems: 'center'}} 
    className='ion-activatable'>
      <IonIcon style={{color: 'white',
        width: '100%', height: '100%'}} icon={props.icon}/>
      <IonRippleEffect/>
    </div>
  )
}
