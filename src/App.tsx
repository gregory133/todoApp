import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
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

import { useSQLite } from 'react-sqlite-hook';

setupIonicReact();
export let sqlite:any;
export let existingConnection:any

function App(){

  const [connectionExists, setConnectionExists] = useState(false);
  existingConnection = {existConn: connectionExists, setExistConn: 
    setConnectionExists};
  const {echo, getPlatform, createConnection, closeConnection,
    retrieveConnection, retrieveAllConnections, closeAllConnections,
    addUpgradeStatement, importFromJson, isJsonValid, copyFromAssets,
    isAvailable} = useSQLite();
  sqlite = {echo: echo, getPlatform: getPlatform,
    createConnection: createConnection,
    closeConnection: closeConnection,
    retrieveConnection: retrieveConnection,
    retrieveAllConnections: retrieveAllConnections,
    closeAllConnections: closeAllConnections,
    addUpgradeStatement: addUpgradeStatement,
    importFromJson: importFromJson,
    isJsonValid: isJsonValid,
    copyFromAssets: copyFromAssets,
    isAvailable:isAvailable};

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/main">
            <AllNotes />
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
