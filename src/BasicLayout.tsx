import React from 'react'
import clsx from 'clsx'

import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import UserMenu from './UserMenu'
import { useOpen } from '@maruware/material-ui-hooks'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon'

const DEFAULT_DRAWER_WIDTH = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
    },
    appBarShift: (props: any) => ({
      marginLeft: props.drawerWidth,
      width: `calc(100% - ${props.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: (props: any) => ({
      width: props.drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    fillSpace: {
      // height: 64
    },
    main: {
      overflow: 'auto',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      // padding: theme.spacing(1)
    },
    content: {
      padding: theme.spacing(1),
      paddingTop: 64 + theme.spacing(1),
      flexGrow: 1,
    },
    logo: {
      height: 28,
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    activeMenu: {
      color: theme.palette.primary.main,
    },
  })
)

export interface DrawerMenu {
  name: string
  path: string
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

export interface BasicLayoutProps {
  title: string
  menues: DrawerMenu[]
  onChangePath: (path: string) => void
  onCheckActive: (path: string) => boolean
  onLogout: () => void
  drawerWidth?: number
  logoSrc?: string
}
export const BasicLayout: React.FC<BasicLayoutProps> = ({
  title,
  menues,
  onChangePath,
  onCheckActive,
  onLogout,
  drawerWidth,
  logoSrc,
  children,
}) => {
  const [open, handleDrawerOpen, handleDrawerClose] = useOpen()

  const theme = useTheme()
  const classes = useStyles({
    drawerWidth: drawerWidth || DEFAULT_DRAWER_WIDTH,
  })

  const handleClickMenu = (path: string) => () => {
    onChangePath(path)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          {logoSrc && <img src={logoSrc} className={classes.logo} />}
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
          </Typography>

          <UserMenu onLogout={onLogout} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          {menues.map((menu) => {
            const isActive = onCheckActive(menu.path)
            return (
              <ListItem
                key={menu.path}
                button
                onClick={handleClickMenu(menu.path)}
                className={isActive ? classes.activeMenu : ''}
              >
                {menu.icon && (
                  <ListItemIcon>
                    <menu.icon color={isActive ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                )}
                <ListItemText primary={menu.name} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <main className={classes.main}>
        <div className={classes.fillSpace} />
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  )
}
