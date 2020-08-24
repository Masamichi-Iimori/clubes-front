// components/Increment.tsx  
import React, { Dispatch, useState, useEffect } from 'react';
import Twitter from 'twitter'
import axios from "axios";
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import { makeStyles, Grid, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    //maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
interface OwnProps { }

type Props = OwnProps

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    ApiBaseRepository.get('/api/v1/tweets').then(response => {
      setTweets(response.data.data)
    });
  }, [])

  const tweetsList = tweets.map((tweet: any) => {
    return (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={tweet.user.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {tweet.text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    )
  })

  return (
    <React.Fragment>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={5}>
          <List className={classes.list}>
            <Paper>
              {tweetsList}
            </Paper>
          </List>
        </Grid>
      </Grid>

    </React.Fragment>
  )
}

export default Home; 