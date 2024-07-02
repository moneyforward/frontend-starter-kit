import { useTranslation } from '@/i18n'
import Link from 'next/link'

import { paramProps } from '@/types/common'

export default async function Page({ params: { lng } }: { params: paramProps }) {
  const { t } = await useTranslation(lng, ['common'])

  return (
    <>
      <p>Constructing page~</p>

      <Link href="/">{t('actions.back', { ns: 'common' })} to Home</Link>
    </>
  )
}
