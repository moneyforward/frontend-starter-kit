import { Select } from 'antd'
import classNames from 'classnames'
import { memo } from 'react'
import { Controller } from 'react-hook-form'

import FormErrorMessage from './form-error-message'
import { ITag } from '@/types/components/form-control'

const Tag = ({
  name,
  className,
  options,
  onChange,
  disabled,
  showError = true,
  control,
  testId,
  validationRules,
  placeholder
}: ITag) => {
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
          <Select
            {...restField}
            data-testid={testId}
            mode="tags"
            style={{ width: '100%' }}
            placeholder={placeholder}
            options={options}
            className={classNames(className, { error: !!error })}
            disabled={disabled || isSubmitting}
            onChange={value => {
              onFieldChange(value)
              onChange?.(value)
            }}
          />
          <FormErrorMessage message={error?.message} showError={showError} />
        </div>
      )}
      rules={validationRules}
    />
  )
}

export default memo(Tag)
