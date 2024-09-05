'use client'

import { Layout } from 'antd'
import { PropsWithChildren } from 'react'

const ContentHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout.Header
      className="app-layout-header"
      style={{
        padding: 0
      }}
    >
      <div className="content-header">{children}</div>
    </Layout.Header>
  )
}

export default ContentHeader
