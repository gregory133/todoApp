import React, { useEffect } from 'react'
import Reminder from '../classes/Reminder'
import { IonButton, IonIcon, IonRippleEffect } from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import IconButton from './IconButton'

interface Props{
  reminder:Reminder|undefined
}

export default function ReminderCard(props:Props) {

  function parseISODatetime(isoDatetime:string){
    let prettyString=new Date(props.reminder?.dateTime!).toString()

    const mainParts=prettyString.split(' ')
    const timeParts=mainParts[4].split(':')
    
    prettyString=`${mainParts[0]}, ${mainParts[1]} ${mainParts[2]}, ${timeParts[0]}:${timeParts[1]}`
    return prettyString
  }

  useEffect(()=>{
    // console.log(parseISODatetime(props.reminder?.dateTime!)); 
  }, [])

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
        <IconButton icon={createOutline}/>  
        <IconButton icon={trashOutline}/>  
      </div>
      
      
    </div>
  )
}
