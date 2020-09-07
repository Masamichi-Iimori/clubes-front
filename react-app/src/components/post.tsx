import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Modal from '@material-ui/core/Modal';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { TextareaAutosize } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    margin: 'auto',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


interface OwnProps {
}

type Props = OwnProps

const Post: React.FC<Props> = (props: Props) => {



  const classes = useStyles();

  const activityFrequencys = ['週1～2回', '週3～4回', '週5回以上']

  const activityStartTimes = ['20:00', '21:00', '22:00', '23:00']

  const activityEndTimes = ['21:00', '22:00', '23:00', '0:00']

  const positions = ['全て', 'FW', 'MF', 'DF', 'GK',];

  const formations = ['4-3-3', '4-2-2-2',];

  const voiceChats = ['PS4', 'DisCord', 'VC不可']

  const clubsHashtags = ['プロクラブ', 'FIFA20']




  const [position, setPosition] = React.useState('全て');
  const [formation, setFormations] = React.useState('4-3-3');
  const [activityFrequency, setActivityFrequency] = React.useState('週1～2回');
  const [activityStartTime, setActivityStartTime] = React.useState('20:00');
  const [activityEndTime, setActivityEndTime] = React.useState('0:00');
  const [voiceChat, setVoiceChat] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const articleTitle = position + "/r/n" + formation + activityFrequency + activityStartTime + activityEndTime + voiceChat
  const handleActivityFrequencyChange = (event: any) => {
    setActivityFrequency(event.target.value);
  };
  const handleActivityStartTimeChange = (event: any) => {
    setActivityStartTime(event.target.value);
  };
  const handleActivityEndTimeChange = (event: any) => {
    setActivityEndTime(event.target.value);
  };
  const handleChange = (event: any) => {
    setPosition(event.target.value);
  };
  const handleFormationChange = (event: any) => {
    setFormations(event.target.value);
  };
  const handleVoiceChatChange = (event: any) => {
    setVoiceChat(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(voiceChat);
  return (<div>
    <button type="button" onClick={handleOpen}>
      <TwitterIcon size={32} round />投稿
      </button>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="select-activityFrequency"
              select
              label="活動頻度"
              value={activityFrequency}
              onChange={handleActivityFrequencyChange}
              helperText="活動頻度を選択してください"
            >
              {activityFrequencys.map((currentActivityFrequency: string) => (
                <MenuItem key={currentActivityFrequency} value={currentActivityFrequency}>
                  {currentActivityFrequency}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="select-activityStartTime"
              select
              label="開始時間"
              value={activityStartTime}
              onChange={handleActivityStartTimeChange}
              helperText="活動時間帯を選択したください"
            >
              {activityStartTimes.map((currentActivityStartTime: string) => (
                <MenuItem key={currentActivityStartTime} value={currentActivityStartTime}>
                  {currentActivityStartTime}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-activityEndTime"
              select
              label="終了時間"
              value={activityEndTime}
              onChange={handleActivityEndTimeChange}
              helperText=""
            >
              {activityEndTimes.map((currentActivityEndTime: string) => (
                <MenuItem key={currentActivityEndTime} value={currentActivityEndTime}>
                  {currentActivityEndTime}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="select-position"
              select
              label="ポジション"
              value={position}
              onChange={handleChange}
              helperText="募集ポジションを選択してください"
            >
              {positions.map((currentPosition: string) => (
                <MenuItem key={currentPosition} value={currentPosition}>
                  {currentPosition}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-formation"
              select
              label="フォーメーション"
              value={formation}
              onChange={handleFormationChange}
              helperText="チームで使用するフォーメーションを選択してください"
            >
              {formations.map((currentFormation: string) => (
                <MenuItem key={currentFormation} value={currentFormation}>
                  {currentFormation}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">VC選択</FormLabel>
              <RadioGroup aria-label="position" name="position" value={voiceChat} onChange={handleVoiceChatChange} row>
                <FormControlLabel
                  value="PS4"
                  control={<Radio color="primary" />}
                  label="PS4"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="DisCord"
                  control={<Radio color="primary" />}
                  label="DisCord"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="VC不可"
                  control={<Radio color="primary" />}
                  label="VC不可"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>

          </div>

          <TextField
            required={false}
            multiline
            rows={3}
            label={"自由記述"}
            variant='outlined' />
          <TwitterShareButton title={articleTitle} url={'http://localhost:3000/post'} hashtags={clubsHashtags}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </form>
      </div>
    </Modal>
  </div>
  );


}

export default Post; 