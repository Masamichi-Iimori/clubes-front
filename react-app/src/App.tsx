import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import 'App.css'
import { theme } from './shared/theme'
import SignUp from 'components/sign_in'
import Home from 'components/Home'
import About from 'components/About'
import Header from 'shared/Header'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Header />
          <div className={classes.offset} />
          <Switch>
            <Route path='/sign_in'>
              <SignUp />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/' exact={true}>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>


  );
}


export default App;  