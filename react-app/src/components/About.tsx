// components/Increment.tsx  
import React from 'react';
import { makeStyles, Typography, Link, Button } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Logo from '../shared/Logo'
import Feature from './Feature';
import { Link as ReactLink } from 'react-router-dom';

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
  titleArea: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  subtitle: {
    padding: theme.spacing(2)
  },
  copyright: {
    position: "absolute",
    bottom: 0,
    marginBottom: theme.spacing(3)
  }

}));
interface OwnProps { }

type Props = OwnProps

const About: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleArea}>
        <Logo width={400} height="100%" isColor />
        <Typography color="textPrimary" align="center" className={classes.subtitle}>
          プロクラブマッチングアプリ
        </Typography>
      </div>
      <Grid container spacing={3} justify="center" className={classes.features}>
        <Grid item lg={1} />

        <Grid item lg={5} sm={12} xs={12}>
          <Feature
            number={1}
            normalWord="募集を検索する"
            subTitle="プロクラブのメンバーを募集している人を見つけ、一緒にプレイしよう。自分の希望しているポジションで募集を絞り込むことができます。"
            icon={<SearchIcon color="primary" style={{ fontSize: 50 }} />}
          />
        </Grid>
        <Grid item lg={5} sm={12} xs={12}>
          <Feature
            number={1}
            normalWord='メンバーを募集する'
            subTitle="自分のクラブに人数が足りないときは、メンバーを募集しよう。募集条件を指定して、ツイッターからメンバーの募集ができます。"
            icon={<GroupAddIcon color="primary" style={{ fontSize: 50 }} />}
          />
        </Grid>
        <Grid item lg={1} />


      </Grid>
      <Button
        variant="contained"
        color="primary"
        component={ReactLink}
        to="/"
      >
        始める
      </Button>
      <div className={classes.copyright}>
        <Typography color="textSecondary" align="center" >
          製作者：
            <Link href={`https://twitter.com/PFC_masamichhhi`} target="_blank" color="textSecondary">
            @PFC_masamichhhi
            </Link>
          <Link href={`https://twitter.com/@toga_3535`} target="_blank" color="textSecondary">
            @toga_3535
            </Link>
        </Typography>

      </div>
    </div >

  )
}



export default About; 