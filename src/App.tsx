import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AllNotes from './pages/AllNotes';
import AddNote from './pages/AddNote';

import {useDbStore} from './stores/dbStore'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/';

setupIonicReact();
export let database:SQLiteObject;

function App(){ 

  // const db=useDbStore(state=>state.db)
  const setDb=useDbStore(state=>state.setDb)

  useEffect(()=>{
    SQLite.create({
      name: 'TodoDB',
      location: 'default'
    }).then(async (db:SQLiteObject)=>{
      setDb(db)
    })
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/main">
            <AllNotes/>
          </Route>
          <Route exact path="/addNote">
            <AddNote />
          </Route>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )

}



export default App;
