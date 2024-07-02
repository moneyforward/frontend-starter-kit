'use client'

import { Button } from 'antd'
import { useParams } from 'next/navigation'

import { addBasePathPrefix } from '@/helpers/basePath'
import { useClientTranslation } from '@/i18n/client'

export default function LoginContainer() {
  const params = useParams()
  const lng = params.lng as string
  const { t } = useClientTranslation(lng, 'auth')

  const handleLogin = async () => {
    window.location.replace(addBasePathPrefix('/api/auth/mfid/login'))
  }

  return (
    <div className="flex flex-col m-4">
      <h2 className="text-lg font-semibold">{t('heading')}</h2>
      <p>{t('desc')}</p>

      <div className="flex gap-2 mt-4">
        <Button type="primary" onClick={handleLogin}>
          {t('login')}
        </Button>
        <Button type="link">{t('createAccount')}</Button>
      </div>
    </div>
  )
}
