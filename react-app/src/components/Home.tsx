// components/Increment.tsx  
import React, { useState, useEffect } from 'react';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import Tweet from '../models/Tweet'
import { makeStyles, Paper, Chip, Typography, IconButton, CardActionArea, Card, CardMedia, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import Post from './post'
import Search from './search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Link from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EmailIcon from '@material-ui/icons/Email';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCookies } from 'react-cookie';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inline: {
    display: 'inline',
  },
  paper: {
    width: '100%',
    minWidth: 400,
    margin: theme.spacing(1),
    padding: theme.spacing(1, 3)
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
  },
  paperContent: {
    width: '100%',
  },
  card: {
    margin: theme.spacing(0.5)
  }

}));
interface OwnProps { }

type Props = OwnProps

const Home: React.FC<Props> = (props: Props) => {

  const classes = useStyles();
  const [tweets, setTweets] = useState<Array<Tweet>>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies(['oauth_id', 'session_id', 'screen_name', 'user_id']);

  useEffect(() => {
    const JSONbig = require('json-bigint')({ "storeAsString": true })
    ApiBaseRepository.get('/tweets', {
      transformResponse: [data => {
        return JSONbig.parse(data)
      }]
    })
      .then(response => {
        setTweets(JSONbig.parse(JSON.stringify(response.data)))
        setIsLoading(false)
      });

  }, [])

  const handleSearch = (positions: string[], word: string, time: number) => {
    var query = '?'
    const JSONbig = require('json-bigint')({ "storeAsString": true })
    const positionParams = positions.join(',')
    const wordParams = word.replace("　", " ").split(' ').join(',')

    if (positionParams.length !== 0 && !positionParams.includes('全て')) {
      query += `positions=${positionParams}&`
    }

    if (wordParams.length !== 0) {
      query += `words=${wordParams}&`
    }

    query += `past_time=${time}&`

    setIsLoading(true)

    ApiBaseRepository.get(`/tweets/search` + query, {
      transformResponse: [data => {
        return JSONbig.parse(data)
      }]
    })
      .then(response => {
        const JSONbig = require('json-bigint')({ "storeAsString": true })
        setTweets(JSONbig.parse(JSON.stringify(response.data)))
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      });
  }

  const tweetsList = tweets !== null && tweets.map((tweet: Tweet, index: number) => {
    let dateTime = new Date(tweet.tweeted_at * 1000);
    return (
      <Paper className={classes.paper} key={index}>
        <div className={classes.paperUpper}>
          <div className={classes.userInfo}>
            {
              tweet.is_club ?
                <ApartmentIcon style={{ fontSize: 40 }} color='action' /> :
                <AccountCircleIcon style={{ fontSize: 40 }} color='action' />
            }

            <Typography color="textPrimary">{tweet.user.name}</Typography>


            <Link href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank" color="textSecondary">
              @{tweet.user.screen_name}
            </Link>
          </div>

          <Typography color="textSecondary">{getStringFromDate(dateTime)}</Typography>

        </div>


        <div className={classes.paperContent}>



          <Typography color="textPrimary">{tweet.full_text}</Typography>
          <Grid container justify="center">

            {tweet.media_url.length > 0 &&

              tweet.media_url.map((media_url: string, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card className={classes.card}>

                    <CardActionArea disabled>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={media_url}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            }
          </Grid>

        </div>

        <div className={classes.paperBottom}>
          <div className={classes.positionTag}>
            {tweet.positions && tweet.positions.map((position: string, index: number) =>
              <Chip
                key={index}
                color="secondary"
                label={position}
                className={classes.chip}
              />
            )}
          </div>
          <div>
            {cookies.user_id &&
              <IconButton edge="start" color="inherit" aria-label="menu" href={`https://twitter.com/messages/${cookies.user_id}-${tweet.user.id}`} target="_blank">
                <EmailIcon color='action' />
              </IconButton>
            }

            <IconButton edge="start" color="inherit" aria-label="menu" href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.tweet_id}`} target="_blank">
              <OpenInNewIcon color='action' />
            </IconButton>
          </div>

        </div>
      </Paper >
    )
  })

  return (
    <div className={classes.root}>
      <div className={classes.buttonArea}>
        <Search handleSearch={handleSearch} />
        <Post />
      </div>

      {isLoading ? <CircularProgress />
        :
        <List className={classes.list}>

          {tweetsList}
          {tweets === null &&
            <Typography>現在募集はありません</Typography>
          }
        </List>
      }
    </div>

  )
}

function getStringFromDate(date: Date) {

  var hour_str = date.getHours().toString();
  var minute_str = date.getMinutes().toString();

  // 時刻の表示だけにする
  hour_str = ('0' + hour_str).slice(-2);
  minute_str = ('0' + minute_str).slice(-2);

  var format_str = 'hh:mm';
  format_str = format_str.replace(/hh/g, hour_str);
  format_str = format_str.replace(/mm/g, minute_str);

  return format_str;
};

export default Home; 