import React, { useEffect, useState } from 'react'
import MenuItem from '../classes/MenuItem'
import { copyOutline, calendarOutline, magnetSharp } from 'ionicons/icons';
import { IonIcon, IonRippleEffect, IonText } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dictionary } from 'typescript-collections';


export default function MenuContent() {

  const [currentMenuItem, setCurrentMenuItem]=useState<undefined|MenuItem>(undefined)
  let topMenuItems:Dictionary<string, MenuItem>=new Dictionary()
  let bottomMenuItems:Dictionary<string, MenuItem>=new Dictionary()
  initializeMenuItemDict()

  function initializeMenuItemDict(){
    topMenuItems.setValue('/allNotes', new MenuItem('All Notes', ()=>{}, copyOutline))
    topMenuItems.setValue('/nothing', new MenuItem('All Calendar Notifications', ()=>{}, calendarOutline))
    bottomMenuItems.setValue('/about', new MenuItem('About', ()=>{}, copyOutline))
  }

  useEffect(()=>{
    const currentPath=location.pathname
    setCurrentMenuItem(topMenuItems.getValue(currentPath))
  }, [])

  return (
    <div style={{
      padding: 20
    }}>
      {
        topMenuItems.values().map((menuItem:MenuItem, key:number)=>{

          let bgColor=''
          if (menuItem.title==currentMenuItem?.title){bgColor='#3A3A3A'}

          return (
            <div className='ion-activatable' key={key} style={{
              backgroundColor: bgColor,
              display: 'flex',
              alignItems: 'center',
              padding: 20,
              borderRadius: 10,
              margin: '10px 0px'
            }}>
              <IonRippleEffect/>
              <IonIcon style={{
                color: 'white',
                margin: '0px 20px 0px 0px'
              }} icon={menuItem.icon}/>
              <div style={{
                color: 'white'
              }}>
                {menuItem.title}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
