import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonRippleEffect, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { backspaceOutline, chevronBack, codeSlashOutline, logoGithub } from 'ionicons/icons'
import React from 'react'
import { Dictionary } from 'typescript-collections'
import MenuItem from '../classes/MenuItem'
import MenuItemComponent from '../components/MenuItemComponent'
import { useHistory } from 'react-router'

export default function About() {

  let externalLinksItems:MenuItem[]=[
    new MenuItem('Github Repository', 
    ()=>{onClickLink('https://github.com/gregory133/todoApp')}, logoGithub),
    new MenuItem('View my other Projects', ()=>{}, codeSlashOutline)
  ]
  const history=useHistory()

  function onClickLink(link:string){
    console.log(link);
    window.open(link)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='toolbar'>
            <IonButton onClick={()=>history.goBack()}>
              <IonIcon className='ion-activatable' icon={chevronBack}
              style={{color: 'white'}}>
                <IonRippleEffect/>
              </IonIcon>
            </IonButton>
            <IonTitle style={{color: 'white', padding: 0}}>About</IonTitle>
          </div>         
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='content'>
          <img style={{objectFit: 'contain', width: 150, 
          margin: 40}} src='/assets/images/timeline.png'/>
          <h1 style={{
            margin: '0px 0px 20px 0px'
            }}>TODO App (Version 0.1)  
            <span style={{fontSize: 14}}> beta</span>

          </h1>

          <div style={{
            display: 'flex', flexDirection: 'column' , 
             alignItems:'center', flex: 1
          }}>
            {
              externalLinksItems.map((externalLinksItem:MenuItem, key:number)=>{

                return <MenuItemComponent menuItem={externalLinksItem}
                defaultBgColor='#171717'
                onClick={externalLinksItem.onClick} currentMenuItem={undefined}/>
              })
            }
            <div style={{flex: 1, display: 'flex', flexDirection: 'column-reverse'}}>
              <p style={{color: 'white'
              }}>Copyright ©: Gregory Marcelin</p>
            </div>
            

          </div>
          

          
        </div>
      </IonContent>
    </IonPage>
  )
}
