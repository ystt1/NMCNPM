import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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
import Detail from './pages/Detail';
import SearchPage from './pages/Search';
import Admin from './pages/Admin';
import Author from './pages/Author';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/trang-chu">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/trang-chu" />
        </Route>
        <Route path="/sach/:slug" component={Detail} />
        <Route path="/tim-kiem/:search/:pageNumber" component={SearchPage} />
        <Route path="/tac-gia/:slugTacGia/:pageNumber" component={Author} />
        <Route path="/admin" component={Admin} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
