// components/Increment.tsx  
import React, { Dispatch, useState, useEffect } from 'react';
import Twitter from 'twitter'
import axios from "axios";
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import { makeStyles, Grid, Paper, Avatar, ListItemAvatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: 700,
    minWidth: 300
  },
  inline: {
    display: 'inline',
  },
  paper: {
    margin: theme.spacing(1)
  }
}));
interface OwnProps { }

type Props = OwnProps

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    ApiBaseRepository.get('/tweets').then(response => {
      setTweets(response.data)
    });

  }, [])

  const tweetsList = tweets.map((tweet: any) => {
    return (
      <Paper className={classes.paper}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AccountCircleIcon />
          </ListItemAvatar>
          <ListItemText
            primary={tweet.user.name}
            secondary={tweet.text}
          />


        </ListItem>
      </Paper>
    )
  })

  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={5}>
          <List className={classes.list}>
            {tweetsList}
          </List>
        </Grid>
      </Grid>

    </React.Fragment>
  )
}

export default Home; 