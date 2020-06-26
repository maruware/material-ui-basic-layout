import React, { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { LogoutButton } from './LogoutButton'

interface UserMenuProps {
  onLogout: () => void
}
const UserMenu: React.FC<UserMenuProps> = ({ onLogout, children }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <div>
      <IconButton onClick={handleClick} aria-controls="menu-appbar">
        <AccountCircle />
      </IconButton>

      <Menu
        id="menu-appbar"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {children}
        <MenuItem>
          <LogoutButton onLogout={onLogout}>ログアウト</LogoutButton>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
