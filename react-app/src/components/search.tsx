import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';


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
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'center'
  },
  vclabel: {
    fontSize: 13,
    margin: theme.spacing(1),
  },
  freeWordSearch: {
    margin: theme.spacing(5),
    minWidth: 150

  },
  searchButton: {
    textAlign: 'center'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


interface OwnProps {
  handleSearch: (positions: string[], word: string, time: number) => void;
}

type Props = OwnProps

const Search: React.FC<Props> = (props: Props) => {

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {

  }, [])


  const positions = ['全て', 'ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'LM', 'RM', 'CDM',
    'LWB', 'RWB', 'LB', 'RB', 'CB', 'GK',];

  const timeOption = [1, 2, 4, 8, 12, 24]

  const [time, setTime] = React.useState(2);

  //const voiceChats = ['PS4', 'DisCord', 'VC不可', ''];

  function getStyles(position: string, positionNames: string[], theme: any) {
    return {
      fontWeight:
        positionNames.indexOf(position) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // 選択中のポジション（複数）
  const [positionNames, setPositionNames] = React.useState(['全て']);

  //const [voiceChat, setVoiceChat] = React.useState('');

  const [searchWord, setSearchWord] = React.useState('');

  const handleChange = (event: any) => {
    if (event.target.value.includes('全て') && !positionNames.includes('全て')) {
      setPositionNames(['全て'])
    } else if (positionNames.includes('全て')) {
      setPositionNames(event.target.value.filter((value: string) => value !== '全て'))
    } else {
      setPositionNames(event.target.value);
    }
  };
  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as number);
  };

  // const handleVoiceChatChange = (event: any) => {
  //   setVoiceChat(event.target.value);
  // };

  const handleTextChange = (event: any) => {
    setSearchWord(event.target.value);
  };
  return (
    <Card variant='outlined'>
      <Grid container spacing={1} justify="center" alignItems="center" alignContent="center">
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="tweetTimeInputLabel">ツイートされた時間で絞り込む</InputLabel>
            <Select
              labelId="tweetTimeLabel"
              id="tweetTime"
              value={time}
              onChange={handleTimeChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              {timeOption.map((t: number) =>
                <MenuItem key={t} value={t}>
                  {t}時間以内
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">ポジション選択</InputLabel>
            <Select
              labelId="searchPositionLabel"
              id="searchPosition"
              multiple
              value={positionNames}
              onChange={handleChange}
              input={<Input id="selectSearchPosition" />}
              renderValue={(selected: string[] | unknown) => (
                selected &&
                <div className={classes.chips}>
                  {(selected as string[]).map((value: string) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {positions.map((position) => (
                <MenuItem key={position} value={position} style={getStyles(position, positionNames, theme)}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id="freetext" label="フリー検索" value={searchWord} variant="outlined" size="small" onChange={handleTextChange} className={classes.freeWordSearch} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.searchButton}>
          <Button id="search" variant="contained" color="primary" startIcon={<SearchIcon />} style={{ margin: theme.spacing(2) }} onClick={() => props.handleSearch(positionNames, searchWord, time)}>
            検索
　　　     </Button>
        </Grid>

        {/* VCはとりあえずなし。（VCを募集内容に含めているツイートが少ないため）
        <Grid item xs={6} >
          <FormControl component="fieldset" className={classes.formControl}>
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
        </Grid> */}

      </Grid>
    </Card >
  );


}

export default Search; 