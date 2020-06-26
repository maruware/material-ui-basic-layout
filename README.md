# Material UI Basic Layout

Simple Basic Layout using Material UI

![screenshot](https://user-images.githubusercontent.com/1129887/85822553-26234d00-b7b6-11ea-8dec-0fdc2ebeb207.png)

## Install

```
yarn add @maruware/material-ui-basic-layout
```

## Usage

```tsx
import React, { useState } from 'react'
import { BasicLayout, DrawerMenu } from '@maruware/material-ui-basic-layout'

import DashboardIcon from '@material-ui/icons/Dashboard'
import PostIcon from '@material-ui/icons/PhotoCamera'
import { useRouter } from 'next/router'

export interface DefaultLayoutProps {
  title: string
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  title,
  children,
}) => {
  const [menues] = useState<DrawerMenu[]>([
    { name: 'Dashboard', path: '/', icon: DashboardIcon },
    { name: 'Posts', path: '/posts', icon: PostIcon },
  ])

  const router = useRouter()
  const handleChangePath = (path: string) => router.push(path)
  const handleCheckActive = (path: string) => router.pathname === path
  const handleLogout = () => console.log('logout')
  return (
    <BasicLayout
      title={title}
      menues={menues}
      onChangePath={handleChangePath}
      onCheckActive={handleCheckActive}
      onLogout={handleLogout}
    >
      {children}
    </BasicLayout>
  )
}
```

```tsx
import React from 'react'
import { Dashboard } from './Dashboard'
import { DefaultLayout } from './DefaultLayout'

export default function DashboardPage() {
  return (
    <DefaultLayout title="Dashboard">
      <Dashboard />
    </DefaultLayout>
  )
}

```

If you use react-router, replace onChangePath and onCheckActive.