import { InputNumber as AntdInputNumber } from 'antd'
import classNames from 'classnames'
import { memo } from 'react'
import { Controller } from 'react-hook-form'

import FormErrorMessage from './form-error-message'
import { IInputNumber } from '@/types/components/form-control'

const InputNumber = ({
  name,
  className,
  onChange,
  disabled,
  showError = true,
  control,
  testId,
  validationRules,
  placeholder,
  min,
  max
}: IInputNumber) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: onFieldChange, ...restField },
        formState: { isSubmitting },
        fieldState: { error }
      }) => (
        <div className="app-input">
          <AntdInputNumber
            {...restField}
            data-testid={testId}
            placeholder={placeholder}
            className={classNames(className, { error: !!error })}
            style={{ width: 210 }}
            disabled={disabled || isSubmitting}
            min={min || undefined}
            max={max || undefined}
            parser={value => value && value.replace(/[^\d]/g, '')}
            onChange={event => {
              onFieldChange(event)
              onChange?.(event)
            }}
          />
          <FormErrorMessage message={error?.message} showError={showError} />
        </div>
      )}
      rules={validationRules}
    />
  )
}

export default memo(InputNumber)
