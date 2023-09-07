import React, { useEffect, useState } from 'react'
import MenuItem from '../classes/MenuItem'
import { copyOutline, calendarOutline, informationCircleOutline } from 'ionicons/icons';
import { IonIcon, IonRippleEffect, IonText } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dictionary } from 'typescript-collections';
import MenuItemComponent from './MenuItemComponent';
import { menuController } from '@ionic/core/components';


export default function MenuContent() {

  const [currentMenuItem, setCurrentMenuItem]=useState<undefined|MenuItem>(undefined)
  let topMenuItems:Dictionary<string, MenuItem>=new Dictionary()
  let bottomMenuItems:Dictionary<string, MenuItem>=new Dictionary()
  initializeMenuItemDict()

  const history=useHistory()

  function onClickMenuItem(clickedItemPath:string){
    menuController.close()
    history.push(clickedItemPath)

  }

  function initializeMenuItemDict(){
    topMenuItems.setValue('/allNotes', new MenuItem('All Notes', ()=>{onClickMenuItem('/allNotes')}, copyOutline))
    topMenuItems.setValue('/nothing', new MenuItem('All Calendar Notifications', ()=>{}, calendarOutline))
    bottomMenuItems.setValue('/about', new MenuItem('About', ()=>{}, informationCircleOutline))
  }

  useEffect(()=>{
    const currentPath=location.pathname
    setCurrentMenuItem(topMenuItems.getValue(currentPath))
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      
    }}>
      <div style={{
        padding: 20,
        flex: 1,
        flexGrow: 1
      }}>
        {
          topMenuItems.values().map((menuItem:MenuItem, key:number)=>{
            
            return (
              <MenuItemComponent onClick={()=>{menuItem.onClick()}}
               menuItem={menuItem} key={key} currentMenuItem={currentMenuItem}/>
            )
          })
        }
      </div>
      <div style={{
        padding: 20,
        flex: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column-reverse'

      }}>
        {
          bottomMenuItems.values().map((menuItem:MenuItem, key:number)=>{

            return <MenuItemComponent onClick={()=>{menuItem.onClick()}}
             menuItem={menuItem} key={key} currentMenuItem={currentMenuItem}/>
          })
        }
      </div>

    </div>
    
  )
}
