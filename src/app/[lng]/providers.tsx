'use client'

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import Entity from '@ant-design/cssinjs/lib/Cache'
import { ConfigProvider, Empty } from 'antd'
import { useParams, useServerInsertedHTML } from 'next/navigation'
import { useMemo } from 'react'

import { useClientTranslation } from '@/i18n/client'

export const AntdProvider = ({ children }: React.PropsWithChildren) => {
  const cache = useMemo<Entity>(() => createCache(), [])

  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />)

  return (
    <StyleProvider cache={cache} hashPriority="high">
      {children}
    </StyleProvider>
  )
}

export const AntdConfigProvider = ({ children }: React.PropsWithChildren) => {
  const params = useParams()
  const { t } = useClientTranslation(params.lng as string)

  const defaultGetPopupContainer = () => {
    return (document.querySelector('.app-layout') as HTMLElement) || undefined
  }

  return (
    <ConfigProvider
      renderEmpty={() => <Empty description={t('message.noData')} />}
      table={{ className: 'app-table' }}
      getPopupContainer={defaultGetPopupContainer}
    >
      {children}
    </ConfigProvider>
  )
}
