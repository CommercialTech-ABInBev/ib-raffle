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
import Raffle from './routes/Raffle';
import Login from './pages/Login';

function App() {

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <LoadingBar />
          <ToastNotifications />
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              {/* <Route isPrivate path="/admin" component={Admin} />
              <Route isPrivate path="/" component={Raffle} /> */}
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Raffle} />
            </Switch>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;