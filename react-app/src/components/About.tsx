// components/Increment.tsx  
import React, { useState, useEffect } from 'react';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import Tweet from '../models/Tweet'
import { makeStyles, Paper, ListItemAvatar, Chip, Typography, IconButton } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import Logo from '../shared/Logo'
import Feature from './Feature';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  list: {
    display: 'flex',
    flexDirection: 'column',
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
  buttonArea: {
    display: 'flex',
    width: '50%',
    minWidth: 400,
    margin: theme.spacing(1),
    justifyContent: "space-around",
    alignItems: "center"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  positionTag: {
    //margin: theme.spacing(0, 7)
  },
  userInfo: {
    display: "flex",
    marginBottom: theme.spacing(2)
  },
  paperUpper: {
    display: "flex",
    justifyContent: "space-between",
    //margin: theme.spacing(0, 7)
  },
  paperBottom: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, 7)
  },
  features: {
    margin: theme.spacing(3, 10)
  }

}));
interface OwnProps { }

type Props = OwnProps

const About: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.buttonArea}>
        <Logo width={400} height="100%" />
      </div>
      <Grid container spacing={3} className={classes.features}>
        <Grid item xs={6}>
          <Feature
            number={1}
            normalWord="募集を検索する"
            subTitle={"This site will automatically match you with the people who has same interest, hobby, or life style. So you don't have to find the right person yourself! We will do that for you."}
            icon={<SearchIcon color="primary" style={{ fontSize: 50 }} />}
          />
        </Grid>
        <Grid item xs={6}>
          <Feature
            number={1}
            normalWord='メンバーを募集する'
            subTitle={"This site will automatically match you with the people who has same interest, hobby, or life style. So you don't have to find the right person yourself! We will do that for you."}
            icon={<GroupAddIcon color="primary" style={{ fontSize: 50 }} />}
          />
        </Grid>
      </Grid>
    </div>

  )
}



export default About; 