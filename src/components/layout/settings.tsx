import { ItemType } from 'antd/es/menu/hooks/useItems'
import { useTranslation } from 'react-i18next'

import { CopyIcon } from '../icons'
import { RouteConfig } from '@/helpers/routeConfig'

// *** Base path ***
// - If menu has only 1 section and has multiple routes, master section
// will be implement by format: `[basePath].{pageName}`
// - If menu has multiple children sections and each children section has multiple routes,
// each children master section will be implement by format: `[basePath]/{sectionName}.{pageName}`

export const routeConfigs: RouteConfig[] = [
  {
    key: 'home',
    path: '/home'
  },
  {
    key: 'tenant',
    path: '/tenant'
  },
  {
    key: 'tenant-user',
    path: '/tenant-user'
  },
  {
    key: 'transfer-data',
    path: '/transfer-data'
  }
]

const RenderLabel = ({ langKey }: { langKey: string }) => {
  const { t } = useTranslation('sider')

  return <span key={langKey}>{t(langKey)}</span>
}

export const navItems: ItemType[] = [
  {
    key: 'tenant',
    icon: <CopyIcon className="sider-icon" />,
    label: <RenderLabel langKey="tenant" />
  },
  {
    key: 'tenant-user',
    icon: <CopyIcon className="sider-icon" />,
    label: <RenderLabel langKey="tenantUser" />
  },
  {
    key: 'transfer-data',
    icon: <CopyIcon className="sider-icon" />,
    label: <RenderLabel langKey="transferData" />
  }
]
