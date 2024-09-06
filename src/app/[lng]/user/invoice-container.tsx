'use client'

import { useParams } from 'next/navigation'
import { useCallback } from 'react'

import InvoiceTable from './invoice-table'
import { useTableCheckboxSelection } from '@/hooks/useTableCheckboxSelection'
import { IInvoice, IInvoices } from '@/types/invoice'

export default function InvoiceContainer({ invoices }: { invoices: IInvoices }) {
  const params = useParams()
  const lng = params.lng as string
  const { rowSelection } = useTableCheckboxSelection<IInvoice>()

  const handleEditClick = useCallback(
    (_invoice: IInvoice) => {
      // router.push(`received-invoice/${invoice.id}/edit`)
    },
    [] // [router]
  )

  if (!invoices) return <></>

  return (
    <div className="invoice-container mt-4 px-5">
      {/* TAB */}

      <InvoiceTable rowSelection={rowSelection} invoices={invoices} onEditClick={handleEditClick} lng={lng} />
    </div>
  )
}
