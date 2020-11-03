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
import Post from './post'
import Search from './search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inline: {
    display: 'inline',
  },
  paper: {
    width: '50%',
    minWidth: 400,
    margin: theme.spacing(1)
  },
  root: {
    display: 'flex',
    width: '50%',
    minWidth: 400,
    margin: theme.spacing(1),
    justifyContent: "spaceBetween",
  },
  flexOne: {
    flex: 1,
    justifyContent: "spaceBetween",
  },
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

  const tweetsList = tweets.map((tweet: any, index: number) => {
    return (
      <Paper className={classes.paper} key={index}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AccountCircleIcon />
          </ListItemAvatar>
          <ListItemText
            primary={tweet.user.name}
            secondary={tweet.full_text}
          />
        </ListItem>
      </Paper>
    )
  })

  return (

    <List className={classes.list}>
      <div className={classes.root}>
        <Post />
        <Search />
      </div>
      {tweetsList}
    </List>

  )
}

export default Home; 