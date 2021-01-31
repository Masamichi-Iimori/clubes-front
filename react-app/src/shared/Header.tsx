import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button } from '@material-ui/core';
import { ApiBaseRepository } from 'utils/ApiBaseRepository';
import { useHistory } from 'react-router-dom';


const drawerWidth = 240;

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
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avater: {
    margin: theme.spacing(0, 1)
  },
  loadingToTwitter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileOpen = Boolean(anchorEl);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['oauth_id', 'session_id', 'screen_name', 'user_id']);
  const [redirecting, setRedirecting] = useState(false)

  const [profileUrl, setProfileUrl] = useState('')

  useEffect(() => {

    let urlParamStr = window.location.search.substring(1)

    let params = {}

    //urlパラメータをオブジェクトにまとめる
    urlParamStr.split('&').forEach(param => {
      const temp = param.split('=')
      //pramsオブジェクトにパラメータを追加
      params = {
        ...params,
        [temp[0]]: temp[1]
      }
    })

    if ("oauth_token" in params && "oauth_verifier" in params && cookies.oauth_id) {
      ApiBaseRepository.get(`/twitter/callback?oauth_token=${params['oauth_token']}&oauth_verifier=${params['oauth_verifier']}&session_id=${cookies.oauth_id}`)
        .then(response => {
          console.log(response)
          removeCookie("oauth_id")
          setCookie('session_id', response.data.id)
          setCookie('screen_name', response.data.screen_name)
          setCookie('user_id', response.data.user_id)
          ApiBaseRepository.get(`/twitter/me?session_id=${response.data.id}`)
            .then(response => {
              setProfileUrl(response.data.profile_image_url)
              history.push('/')
            });
        });

    }


    if (cookies.session_id) {
      ApiBaseRepository.get(`/twitter/me?session_id=${cookies.session_id}`)
        .then(response => {
          setProfileUrl(response.data.profile_image_url)
        });
    }
  }, [cookies, history, removeCookie, setCookie])

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const sidebarList: Array<{ value: string, path: string }> = [
    {
      value: 'ホーム',
      path: '/'
    },
    {
      value: 'このサイトについて',
      path: '/about'
    }
  ]

  const list = sidebarList.map((listItem, index) => (
    <ListItem button key={index} component={Link} to={listItem.path}>
      <ListItemText primary={listItem.value} />
    </ListItem>
  ))

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    handleDialogOpen()
  }

  const handleLogoutYes = () => {
    removeCookie("session_id")
    removeCookie("screen_name")
    removeCookie("user_id")
    handleDialogClose()
    history.push('/')
  }

  const handleLoginYes = () => {
    setRedirecting(true)
    ApiBaseRepository.get('/twitter/sign_in')
      .then(response => {
        setCookie('oauth_id', response.data.oauth_token_id)
        // window.open(response.data.authorize_url)
        window.location.assign(response.data.authorize_url);
      });
  }


  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.title}>
            <Logo width={160} />
          </div>
          {cookies.session_id ?
            <>
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <Avatar className={classes.avater} src={profileUrl} />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={profileOpen}
                onClose={handleProfileMenuClose}
              >
                <MenuItem disabled>{cookies.screen_name}でログインしています</MenuItem>
                <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
              </Menu>

              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"ログアウトします。よろしいですか？"}</DialogTitle>
                <DialogActions>
                  <Button onClick={handleLogoutYes} color="primary">
                    はい
                  </Button>
                  <Button onClick={handleDialogClose} color="primary" autoFocus>
                    いいえ
                  </Button>
                </DialogActions>
              </Dialog>

            </>
            :
            <>
              <Button onClick={handleDialogOpen} color='inherit' style={{ textTransform: 'none' }}>Twitterと連携する</Button>

              <Dialog
                open={dialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                {redirecting ?
                  <DialogContent className={classes.loadingToTwitter}>
                    <CircularProgress />
                    <DialogContentText id="alert-dialog-description">
                      Twitterに移動します...
                    </DialogContentText>
                  </DialogContent>

                  :
                  <>
                    <DialogTitle id="alert-dialog-title">{"Twitterアカウントと連携します。よろしいですか？"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        TwitterのDM機能などを使用できるようになります。
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleLoginYes} color="primary">
                        はい
                    </Button>
                      <Button onClick={handleDialogClose} color="primary" autoFocus>
                        いいえ
                    </Button>
                    </DialogActions>
                  </>
                }


              </Dialog>
            </>
          }

        </Toolbar>

      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {list}
      </Drawer>





    </div>
  );
}