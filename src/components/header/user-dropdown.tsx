'use client'

import { Button, Dropdown, Typography } from 'antd'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ChevronDownIcon } from '../icons'
import HeaderDropdownPopup from './header-dropdown-popup'

const { Text, Link } = Typography

const UserDropdown = () => {
  const { t } = useTranslation('header')

  const username = '山田太郎山郎山田太郎山郎山田太郎山郎山'

  const dropdownRender = (menu: ReactNode) => {
    return (
      <HeaderDropdownPopup menu={menu}>
        <div className="header-dropdown-info">
          <div className="name">{username}</div>
        </div>
      </HeaderDropdownPopup>
    )
  }

  return (
    <Dropdown
      overlayStyle={{ width: 235 }}
      menu={{
        items: [
          {
            key: 'user-setting',
            label: <Link href="/">{t('userSetting')}</Link>
          },
          {
            key: 'logout',
            label: <Link href="/">{t('logout')}</Link>
          }
        ]
      }}
      placement="topRight"
      dropdownRender={dropdownRender}
      trigger={['click']}
    >
      <div className="header-dropdown">
        <Button className="app-button auto header-dropdown-button" type="link">
          <Text style={{ maxWidth: 156 }} ellipsis={true}>
            {username}
          </Text>
          <ChevronDownIcon className="caret-down-icon" />
        </Button>
      </div>
    </Dropdown>
  )
}

export default UserDropdown
