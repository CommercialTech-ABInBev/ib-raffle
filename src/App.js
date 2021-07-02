import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Route from './components/CustomRoute';
import { AppProvider } from './Provider';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import { ToastNotifications } from './components/ToastNotifications';
import LoadingBar from './components/LoadingBar';

import theme from './theme';

import Admin from './routes/Admin';
import Auth from './routes/Auth';
import Game from './routes/Game';

function App() {

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <LoadingBar />
          <ToastNotifications />
          <Router>
            <Switch>
              <Route isPrivate adminOnly path="/admin" component={Admin} />
              <Route path="/auth" component={Auth} />
              <Route isPrivate userOnly path="/" component={Game} />
            </Switch>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;