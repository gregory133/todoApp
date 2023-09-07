import { IonIcon, IonRippleEffect } from '@ionic/react'
import React from 'react'
import MenuItem from '../classes/MenuItem'


interface Props{
  menuItem:MenuItem,
  currentMenuItem: MenuItem|undefined,
  onClick: ()=>void
  defaultBgColor: string
}

export default function MenuItemComponent(props:Props) {

  let bgColor=props.defaultBgColor
  if (props.menuItem.title==props.currentMenuItem?.title){bgColor='#3A3A3A'}

  return (
    <div onClick={props.onClick} className='ion-activatable' style={{
      backgroundColor: bgColor,
      display: 'flex',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      margin: '10px 0px'
    }}>
      <IonRippleEffect style={{color: 'white'}}/>
      <IonIcon style={{
        color: 'white',
        margin: '0px 20px 0px 0px'
      }} icon={props.menuItem.icon}/>
      <div style={{
        color: 'white'
      }}>
        {props.menuItem.title}
      </div>
    </div>
  )
}
