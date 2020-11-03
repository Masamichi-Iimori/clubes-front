import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'App.css'
import SignUp from 'components/sign_in'
import Home from 'components/Home'
import Post from 'components/post'
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
    <>
      <Header />
      <div className={classes.offset} />
      <Router>
        <div>

          <Switch>
            <Route path='/sign_in'>
              <SignUp />
            </Route>
            <Route path='/post'>
              <Post />
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


export default App;  