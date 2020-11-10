import React, { useState, useEffect, ReactNode } from 'react';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import Tweet from '../models/Tweet'
import { makeStyles, Paper, ListItemAvatar, Chip, Typography, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
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
  icon: {
    // width: 300,
    //fontSize: 40
  }

}));
interface OwnProps {
  icon: ReactNode,
  number: number,
  normalWord: string,
  subTitle: string
}

type Props = OwnProps

const Feature: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        {props.icon}
      </div>
      <div className='content content-body'>
        <Typography variant="h4" color="textPrimary">
          {props.normalWord}
        </Typography>

        <Typography variant="h6" color="textPrimary">
          {props.subTitle}
        </Typography>

      </div>
    </div>
  )
}



export default Feature; 