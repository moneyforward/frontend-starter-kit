'use client'

import { Layout, Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { ChevronLeftIcon } from '../icons'
import { navItems, routeConfigs } from './settings'
import { getHighlightRoute } from '@/helpers/routeConfig'
import { useClientTranslation } from '@/i18n/client'

const { Sider } = Layout

export function SiteSider({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng, 'sider')
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>()

  useEffect(() => {
    const { selectedKeys } = getHighlightRoute(lng, pathname, routeConfigs)
    selectedKeys && setSelectedKeys(selectedKeys)
  }, [pathname])

  const handleMenuClick: MenuProps['onClick'] = item => {
    const selected = routeConfigs.find(nav => nav.key === item.key)
    const selectedPath = `/${lng}${selected?.path}`

    if (selected && pathname !== selectedPath) {
      router.push(selectedPath)
    }
  }

  if (pathname.includes('/user/login')) return <></>

  return (
    <Sider
      className="sider-menu"
      collapsedWidth="50"
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      trigger={
        <div className="btn-toggle-sider">
          <ChevronLeftIcon />
          <span className="btn-toggle-sider-text">{t('actions.close')}</span>
        </div>
      }
    >
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} items={navItems} onClick={handleMenuClick} />
    </Sider>
  )
}
