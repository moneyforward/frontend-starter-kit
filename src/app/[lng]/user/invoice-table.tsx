'use client'

import { Button, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { camelCase } from 'lodash'
import { p } from 'node_modules/msw/lib/core/GraphQLHandler-COiPfZ8k'
import { useMemo } from 'react'

import CurrencyText from '@/components/currency-text'
import { ACCOUNT_TYPE } from '@/constants/accountType'
import { DISPLAY_DATETIME_FORMAT } from '@/constants/date'
import dayjs from '@/helpers/dayjs'
import { useClientTranslation } from '@/i18n/client'
import { IInvoice, IInvoices } from '@/types/invoice'

export default function InvoiceTable({
  invoices,
  rowSelection,
  onEditClick,
  lng
}: {
  invoices: IInvoices
  rowSelection?: TableRowSelection<IInvoice>
  onEditClick: (invoice: IInvoice) => void
  lng: string
}) {
  const { t } = useClientTranslation(lng, 'invoice')

  const tableRowSelection: TableRowSelection<IInvoice> = useMemo(() => {
    return {
      ...rowSelection
    }
  }, [rowSelection])

  const columns: ColumnsType<IInvoice> = useMemo(
    () => [
      {
        title: t('columns.status'),
        key: 'status',
        dataIndex: 'status',
        render: text => <span>{t(`invoice:status.${camelCase(text)}`) as string}</span>
      },
      {
        title: t('columns.fileName'),
        key: 'fileName',
        render: (_, record) => <span>{record.document.fileName}</span>
      },
      {
        title: t('columns.tradingDate'),
        key: 'tradingDate',
        dataIndex: 'tradingDate',
        render: text => (
          <span>
            {text}（{t('invoice:readResult')}）
          </span>
        )
      },
      {
        title: t('columns.uploadedDate'),
        key: 'uploadedDate',
        render: (_, record) => (
          <span>
            {dayjs(record.document.uploadedDate).format(DISPLAY_DATETIME_FORMAT)}
            {record.document.uploadedUser && `（${record.document.uploadedUser}）`}
          </span>
        )
      },
      {
        title: t('columns.beneficiary'),
        key: 'beneficiary',
        render: (_, record) => (
          <div>
            {record.beneficiary.accountHolder}
            <br />
            {record.beneficiary.bankName}
            {record.beneficiary.branchName}
            <br />
            {ACCOUNT_TYPE[record.beneficiary.accountType as keyof typeof ACCOUNT_TYPE]}{' '}
            {record.beneficiary.accountNumber}
          </div>
        )
      },
      {
        title: t('columns.amount'),
        key: 'amount',
        render: (_, record) => <span>{<CurrencyText value={record.beneficiary.amount} />}</span>
      }
    ],
    [t, lng]
  )

  const mergedColumns: ColumnsType<IInvoice> = useMemo(() => {
    const actionColumns = {
      className: 'text-center',
      key: 'action',
      render: (data: IInvoice) => (
        <Button size="small" onClick={() => onEditClick(data)}>
          {t('actions.edit')}
        </Button>
      ),
      width: 104
    }
    return [...columns, actionColumns]
  }, [onEditClick, t])

  return (
    <Table
      rowSelection={tableRowSelection}
      columns={mergedColumns}
      // className="table-lg"
      tableLayout="fixed"
      size="small"
      dataSource={invoices}
      rowKey="id"
      pagination={false}
    />
  )
}
