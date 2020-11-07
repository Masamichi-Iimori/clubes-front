import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
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
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'


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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  vclabel: {
    fontSize: 13,
    margin: theme.spacing(1),
  },
}));


interface OwnProps {
}

type Props = OwnProps



const Search: React.FC<Props> = (props: Props) => {



  const classes = useStyles();
  const theme = useTheme();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // ApiBaseRepository.get('/tweets/search').then(response => {
    //   setTweets(response.data)
    // });

  }, [])


  const positions = ['全て', 'ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'LM', 'RM', 'CDM',
    'LWB', 'RWB', 'LB', 'RB', 'CB', 'GK',];


  const voiceChats = ['PS4', 'DisCord', 'VC不可', ''];

  function getStyles(position: string, positionNames: string[], theme: any) {
    return {
      fontWeight:
        positionNames.indexOf(position) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [positionNames, setPositionNames] = React.useState(['全て']);
  const [voiceChat, setVoiceChat] = React.useState('');
  const handleChange = (event: any) => {
    setPositionNames(event.target.value);
  };
  const handleVoiceChatChange = (event: any) => {
    setVoiceChat(event.target.value);
  };
  return (
    <div>
      <Grid container spacing={3} justify='center' alignItems='center'>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
          <Select
            labelId="searchPositionLabel"
            id="searchPosition"
            multiple
            value={positionNames}
            onChange={handleChange}
            input={<Input id="selectSearchPosition" />}
            renderValue={(selected: string[] | unknown) => {
              console.log(selected)
              return (
                selected &&
                <div className={classes.chips}>
                  {(selected as string[]).map((value: any) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )
            }
            }
          // MenuProps={MenuProps}
          >
            {positions.map((position) => (
              <MenuItem key={position} value={position} style={getStyles(position, positionNames, theme)}>
                {position}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} >
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
      <Grid item xs={12} >
        <TextField id="freetext" label="自由検索" variant="outlined" />
      </Grid>
      <Grid item xs={12} >
        <Button id="search" variant="contained" color="primary">
          検索する
　　　</Button>
      </Grid>
    </div >
  );


}

export default Search; 