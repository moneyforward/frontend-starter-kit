import { ItemType } from 'antd/es/menu/hooks/useItems'
import { useTranslation } from 'react-i18next'

import { SettingIcon, UserIcon } from '../icons'
import { RouteConfig } from '@/helpers/routeConfig'

// *** Base path ***
// - If menu has only 1 section and has multiple routes, master section
// will be implement by format: `[basePath].{pageName}`
// - If menu has multiple children sections and each children section has multiple routes,
// each children master section will be implement by format: `[basePath]/{sectionName}.{pageName}`

export const routeConfigs: RouteConfig[] = [
  {
    key: 'users',
    path: '/users'
  },
  {
    key: 'settings',
    path: '/settings'
  }
]

const RenderLabel = ({ langKey }: { langKey: string }) => {
  const { t } = useTranslation('sider')

  return <span key={langKey}>{t(langKey)}</span>
}

export const navItems: ItemType[] = [
  {
    key: 'users',
    icon: <UserIcon className="sider-icon" />,
    label: <RenderLabel langKey="users" />
  },
  {
    key: 'settings',
    icon: <SettingIcon className="sider-icon" />,
    label: <RenderLabel langKey="settings" />
  }
]
