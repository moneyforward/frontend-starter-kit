import { useTranslation } from '@/i18n'

import PostForm from '../../post-form'
import PageTitle from '@/components/layout/page-title'
import { getPost } from '@/lib/api/post'
import { ParamProps } from '@/types/common'

export default async function Page({ params: { lng, id } }: { params: ParamProps }) {
  const { t } = await useTranslation(lng, ['post'])
  const data = await getPost(id!)

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex items-center">
        <PageTitle title={t('post:pageTitle.editPost')} lng={lng} />
      </div>

      <hr />

      <PostForm lng={lng} data={data} />
    </div>
  )
}
