import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'App.css'
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

  );
}


export default App;  