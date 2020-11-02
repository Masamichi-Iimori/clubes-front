// components/Increment.tsx  
import React, { useState, useEffect } from 'react';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import { makeStyles, Paper, ListItemAvatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Post from './post'
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
  iconList: {
    justifyContent: 'flex-end',
  },
  root: {
    display: 'flex',
    width: '50%',
    minWidth: 400,
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

  const tweetsList = tweets.map((tweet: any, index: number) => {
    return (
      <Paper className={classes.paper} key={index}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AccountCircleIcon style={{ fontSize: 40 }} color='action' />
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
        <div className={classes.iconList}>
          <Post />
        </div>
      </div>
      {tweetsList}
    </List>

  )
}

export default Home; 