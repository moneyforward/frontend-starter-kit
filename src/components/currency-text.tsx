import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import { NumericFormat } from 'react-number-format'

class CurrencyText extends PureComponent<{ className?: string; value: number | string | null }> {
  render(): ReactNode {
    const { value, className } = this.props
    return (
      <NumericFormat
        value={value}
        valueIsNumericString={true}
        renderText={value => {
          return <div className={classNames('text-right', className)}>{value}</div>
        }}
        prefix="¥"
        thousandSeparator=","
        displayType="text"
      />
    )
  }
}

export default CurrencyText
