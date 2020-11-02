import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titles: {
    display: 'flex'
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(5)
  },
  button: {
    marginLeft: 'auto'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.titles}>
            <Typography variant="h6" className={classes.title}>
              Clubes
            </Typography>
            <Typography variant="h6" className={classes.title}>
              プロクラブ検索サービス
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}