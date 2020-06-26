import React from 'react'

export interface LogoutButtonProps {
  onLogout: () => void
}
export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, children }) => {
  return <span onClick={onLogout}>{children}</span>
}
