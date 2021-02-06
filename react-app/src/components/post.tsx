import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
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
    marginTop: theme.spacing(5),
    minWidth: 340,
    width: '30%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fab: {
    margin: theme.spacing(2),
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  vclabel: {
    fontSize: 13,
    margin: theme.spacing(1),
  },
  textField: {
    minWidth: 340,
  },
  buttonbox: {
    margin: theme.spacing(0, 1),
    display: 'flex',
    justifyContent: 'center'

  },
  tweetbutton: {
    minWidth: 120,
    margin: theme.spacing(5),
    flex: 1,
  },
  selecter: {
    display: 'flex',
    justifyContent: 'center'
  },
  cancelbutton: {
    minWidth: 120,
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

const Post: React.FC<Props> = (props: Props) => {

  const classes = useStyles();

  const activityFrequencys = ['週1～2回', '週3～4回', '週5回以上']

  const activityStartTimes = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  const activityEndTimes = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  const positions = ['全て', 'FW', 'MF', 'DF', 'GK', 'ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'LM', 'RM', 'CDM',
    'LWB', 'RWB', 'LB', 'RB', 'CB',];

  const formations = ['そのときに応じて変更', '4-3-3', '4-2-2-2', '4-2-3-1', '4-4-2', '5-3-2', '5-4-1', '3-5-2', '3-4-3'];

  const clubsHashtags = ['プロクラブ', 'FIFA20'];


  const [position, setPosition] = React.useState('全て');
  const [formation, setFormations] = React.useState('4-3-3');
  const [activityFrequency, setActivityFrequency] = React.useState('週1～2回');
  const [activityStartTime, setActivityStartTime] = React.useState('20:00');
  const [activityEndTime, setActivityEndTime] = React.useState('0:00');
  const [voiceChat, setVoiceChat] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [textArea, setText] = React.useState('');
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
      <Tooltip title="クラブメンバーを募集" aria-label="クラブメンバーを募集" >
        <Fab color="primary" className={classes.fab}>
          <GroupAddIcon style={{ fontSize: 40 }} onClick={handleOpen} />
        </Fab>
      </Tooltip>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={3} justify='center' alignItems='center' >
              <Grid item xs={12} className={classes.centerGrid}>
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
              </Grid>
              <Grid item xs={12}>
                <div className={classes.selecter}>
                  <TextField
                    id="select-activityStartTime"
                    select
                    label="活動開始時間"
                    value={activityStartTime}
                    onChange={handleActivityStartTimeChange}
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
                    label="活動終了時間"
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

              </Grid>
              <Grid item xs={12} >
                <div className={classes.selecter}>
                  <TextField
                    id="select-position"
                    select
                    label="募集ポジション"
                    value={position}
                    onChange={handleChange}

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

                  >
                    {formations.map((currentFormation: string) => (
                      <MenuItem key={currentFormation} value={currentFormation}>
                        {currentFormation}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

              </Grid>
              <Grid item xs={12} className={classes.centerGrid}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className={classes.vclabel}>VC選択</FormLabel>
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
              </Grid>
              <Grid item xs={12} className={classes.centerGrid}>
                <TextField
                  required={false}
                  value={textArea}
                  onChange={handleTextChange}
                  multiline
                  rows={3}
                  label={"自由記述"}
                  variant='outlined'
                  className={classes.textField}
                  fullWidth
                />
              </Grid>
            </Grid>

            <div className={classes.buttonbox}>
              <Button variant="contained" color="primary" href={`http://twitter.com/share?url=https://clubhub.ga&text=プロクラブのメンバーを募集します！%0a募集ポジション：${position}%0aフォーメーション：${formation}%0a活動頻度：${activityFrequency}
               %0a活動時間帯：${activityStartTime} ～${activityEndTime}%0aボイスチャット：${voiceChat}%0a${textArea} %0a &hashtags=${clubsHashtags}`} className={classes.tweetbutton} data-url="https://clubhub.ga" data-show-count="false" target="_blank" rel="noopener noreferrer">
                募集する
              </Button>
              <Button variant="contained" onClick={handleClose} className={classes.cancelbutton}>キャンセル</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );


}

export default Post; 