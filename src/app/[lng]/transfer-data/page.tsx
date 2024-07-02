import { useTranslation } from '@/i18n'
import Link from 'next/link'

import { paramProps } from '@/types/common'

export default async function Page({ params: { lng } }: { params: paramProps }) {
  const { t } = await useTranslation(lng, ['common'])

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold my-auto">TRANSFER DATA PAGE</h1>
      </div>
      <hr />
      <Link href="/">{t('actions.back', { ns: 'common' })} to Home</Link>
    </div>
  )
}
