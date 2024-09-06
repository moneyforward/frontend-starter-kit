import AntdIcon from '@ant-design/icons'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Icon } from '~/components/antd'
import ContentHeader from '~/components/content-header'
import PageTitle from '~/components/page-title'
import { AppContext } from '~/context/AppContext'
import { useGetInvoiceDetailsQuery } from '~/core/redux/invoice/api'
import ReceiveInvoiceDetails from '~/modules/received-invoice/invoice-details'
import { IInvoiceDetail } from '~/types/invoice'
import { AppDocumentProps } from '~/types/next-document'

const ReceiveInvoiceDetailsPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const id = router.query.id as string
  const { setAppLoading, setAppMessage } = useContext(AppContext)

  const {
    data: invoiceResponse,
    error,
    isLoading,
    isFetching
  } = useGetInvoiceDetailsQuery(id, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    setAppLoading(isLoading || isFetching)

    return () => {
      setAppLoading(false)
    }
  }, [isLoading, isFetching, setAppLoading])

  useEffect(() => {
    const isInvalidId = (error as FetchBaseQueryError)?.status === 404

    if (isInvalidId) {
      setAppMessage('error', {
        description: <span>{t('message.incorrectOperation', { ns: 'common' })}</span>
      })
      router.push('/received-invoice', undefined, { shallow: true })
    }
  }, [error, router, setAppMessage, t])

  const invoice = useMemo(() => invoiceResponse?.data as IInvoiceDetail, [invoiceResponse?.data])

  const handleNextClick = () => {
    router.replace(`/received-invoice/${invoiceResponse?.meta?.nextId}`)
  }

  const handlePrevClick = () => {
    router.replace(`/received-invoice/${invoiceResponse?.meta?.previousId}`)
  }

  return (
    <>
      <ContentHeader>
        <Row wrap={false}>
          <Col flex="auto">
            <PageTitle
              title={invoice ? `${invoice.tradingDate} ${invoice.partnerName}` : ''}
              showBackButton
              backButtonStyle="back-arrow"
            />
          </Col>
          <Col>
            <Button
              disabled={isFetching || !invoiceResponse?.meta?.previousId}
              isLink
              icon={<AntdIcon component={Icon.ChevronLeftIcon} />}
              onClick={handlePrevClick}
            >
              {t('actions.previous')}
            </Button>
            <Button disabled={isFetching || !invoiceResponse?.meta?.nextId} isLink onClick={handleNextClick}>
              {t('actions.next')}
              <AntdIcon component={Icon.ChevronRightIcon} />
            </Button>
          </Col>
        </Row>
      </ContentHeader>

      <ReceiveInvoiceDetails mode="view" invoice={invoice} />
    </>
  )
}

ReceiveInvoiceDetailsPage.getInitialProps = (_: any): AppDocumentProps => {
  return {
    appLayoutProps: {
      className: 'invoice-details',
      paddingX: 0,
      paddingY: 0
    }
  }
}
export default ReceiveInvoiceDetailsPage
