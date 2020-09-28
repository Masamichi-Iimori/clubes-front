import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'App.css'
import SignUp from 'components/sign_in'
import Home from 'components/Home'
import Header from 'shared/Header'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.offset} />
      <Router>
        <div>

          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/sign_in'>
              <SignUp />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}


const About = () => {
  return <h2>About</h2>;
}

const Users = () => {
  return <h2>Users</h2>;
}

export default App;  