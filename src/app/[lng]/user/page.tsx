import { useTranslation } from '@/i18n'
import { Col, Row } from 'antd'
import humps from 'humps'

import InvoiceContainer from './invoice-container'
import ContentHeader from '@/components/layout/content-header'
import PageTitle from '@/components/layout/page-title'
import { absoluteUrl } from '@/lib/utils'
import { paramProps } from '@/types/common'
import { IInvoices } from '@/types/invoice'
import { IResult } from '@/types/result'

async function getInvoices(): Promise<IInvoices | undefined> {
  const response = await fetch(absoluteUrl('/invoices/not_processed/search'), {
    method: 'POST',
    cache: 'no-cache'
  })

  if (!response.ok) {
    return undefined
  }

  const result = await response.json()
  const camelizedResult = humps.camelizeKeys(result) as IResult<IInvoices>

  return camelizedResult.data
}

export default async function Page({ params: { lng } }: { params: paramProps }) {
  const { t } = await useTranslation(lng, ['invoice'])
  const invoices = await getInvoices()

  return (
    <>
      <ContentHeader>
        <Row justify="space-between" align="middle">
          <Col>
            <PageTitle title={t('pageTitle.index')} subTitle={String(t('pageSubTitle.index'))} />
          </Col>
        </Row>
      </ContentHeader>

      {invoices && <InvoiceContainer invoices={invoices} />}
    </>
  )
}
