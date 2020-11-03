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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';


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
      margin: theme.spacing(1, 1, 0, 1),
      width: 200,
    },
  },
  paper: {
    margin: 'auto',
    width: 436,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'center',
    display: 'flex',
  },
  fab: {
    margin: theme.spacing(2),
  },
  vcrabel: {
    fontSize: 13,
    margin: theme.spacing(1),
  },
  textField: {
    width: 436,
  },
  buttonbox: {
    margin: theme.spacing(0, 2),
    display: 'flex',
  },
  tweetbutton: {
    width: 80,
    margin: theme.spacing(5),
    flex: 1,
  },
  cancelbutton: {
    width: 80,
    margin: theme.spacing(5),
    flex: 1,
  },
  twitterShareButton: {
    width: "100%",
  },
}));


interface OwnProps {
}

type Props = OwnProps

const Search: React.FC<Props> = (props: Props) => {



  const classes = useStyles();

  const activityFrequencys = ['週1～2回', '週3～4回', '週5回以上']

  const activityStartTimes = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  const activityEndTimes = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  const positions = ['全て', 'FW', 'MF', 'DF', 'GK', 'ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'LM', 'RM', 'CDM',
    'LWB', 'RWB', 'LB', 'RB', 'CB',];

  const formations = ['4-3-3', '4-2-2-2',];

  const voiceChats = ['PS4', 'DisCord', 'VC不可', ''];

  const clubsHashtags = ['プロクラブ', 'FIFA20'];





  const [position, setPosition] = React.useState('全て');
  const [formation, setFormations] = React.useState('4-3-3');
  const [activityFrequency, setActivityFrequency] = React.useState('週1～2回');
  const [activityStartTime, setActivityStartTime] = React.useState('20:00');
  const [activityEndTime, setActivityEndTime] = React.useState('0:00');
  const [voiceChat, setVoiceChat] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [textArea, setText] = React.useState('');
  const articleTitle = "募集ポジション：" + position + "\nフォーメーション：" + formation + "\n活動頻度：" + activityFrequency
    + "\n活動時間帯：" + activityStartTime + "～" + activityEndTime + "\nボイスチャット：" + voiceChat + "\n" + textArea + "\n"
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
  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div >
        <Tooltip title="クラブメンバーを募集" aria-label="クラブメンバーを募集" >
          <Fab color="primary" className={classes.fab}>
            <GroupAddIcon style={{ fontSize: 40 }} onClick={handleOpen} />
          </Fab>
        </Tooltip>
      </div>
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
            <div >
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
                <FormLabel component="legend" className={classes.vcrabel}>VC選択</FormLabel>
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
              value={textArea}
              onChange={handleTextChange}
              multiline
              rows={3}
              label={"自由記述"}
              variant='outlined'
              className={classes.textField}
            />
            <div className={classes.buttonbox}>
              <Button variant="contained" color="primary" className={classes.tweetbutton}>
                <TwitterShareButton className={classes.twitterShareButton} title={articleTitle} hashtags={clubsHashtags} url={'https://clubes.ml/'}
                >
                  募集する
              </TwitterShareButton>
              </Button>
              <Button variant="contained"
                onClick={handleClose} className={classes.cancelbutton}>キャンセル</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );


}

export default Search; 