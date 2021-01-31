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
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Helmet
            title={'Clubhub'}
            meta={[
              { name: 'twitter:card', content: 'summary' },
              { name: 'twitter:title', content: 'Clubhub' },
              { name: 'twitter:description', content: 'プロクラブマッチングサービス' },
              { name: 'twitter:image', content: 'https://proclub-front-bucket.s3-ap-northeast-1.amazonaws.com/logo.png' },
              { property: 'og:image', content: 'https://proclub-front-bucket.s3-ap-northeast-1.amazonaws.com/logo.png' },
              { property: 'og:title', content: 'Clubhub' },
              { property: 'og:description', content: 'プロクラブマッチングサービス' },
              { property: 'og:url', content: `https://clubhub.ga` },
            ]}
          />
          <Header />
          <div className={classes.offset} />
          <Switch>
            <Route path='/sign_in'>
              <SignUp />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/' exact={true} key={document.location.href}>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>


  );
}


export default App;  