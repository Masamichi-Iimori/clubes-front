// components/Increment.tsx  
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react';
import { ApiBaseRepository } from '../utils/ApiBaseRepository'
import Tweet from '../models/Tweet'
import { makeStyles, Paper, ListItemAvatar, Chip, Typography, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Post from './post'
import Search from './search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Link from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  }

}));
interface OwnProps { }

type Props = OwnProps

const Home: React.FC<Props> = (props: Props) => {

  const classes = useStyles();
  const JSONbig = require('json-bigint')({ "storeAsString": true })

  const [tweets, setTweets] = useState<Array<Tweet>>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {
              tweet.is_club ?
                <ApartmentIcon style={{ fontSize: 40 }} color='action' /> :
                <AccountCircleIcon style={{ fontSize: 40 }} color='action' />
            }
          </ListItemAvatar>
          <div >
            <div className={classes.paperUpper}>
              <div className={classes.userInfo}>
                <Typography color="textPrimary">{tweet.user.name}</Typography>
                {/* <Typography color="textSecondary">@{tweet.user.screen_name}</Typography> */}

                <Link href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank" color="textSecondary">
                  @{tweet.user.screen_name}
                </Link>
              </div>
              <Typography color="textSecondary">{getStringFromDate(dateTime)}</Typography>
            </div>

            <Typography color="textPrimary">{tweet.full_text}</Typography>
          </div>

        </ListItem>
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
          <IconButton edge="start" color="inherit" aria-label="menu" href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.tweet_id}`} target="_blank">
            <OpenInNewIcon />
          </IconButton>
        </div>
      </Paper>
    )
  })

  return (
    <div className={classes.root}>
      <Helmet
        title={'Clubhub'}
        meta={[
          { name: 'twitter:card', content: 'summary' },
          { property: 'og:image', content: 'https://proclub-front-bucket.s3-ap-northeast-1.amazonaws.com/logo.png' },
          { property: 'og:title', content: 'Clubhub' },
          { property: 'og:description', content: 'プロクラブマッチングサービス' },
          { property: 'og:url', content: `https://clubhub.ga` }
        ]}
      />
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