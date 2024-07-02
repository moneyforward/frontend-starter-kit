import { DatePicker as AntdDatePicker } from 'antd'
import classNames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import { memo } from 'react'
import { useController } from 'react-hook-form'

import FormErrorMessage from './form-error-message'
import { DISPLAY_DATETIME_FORMAT } from '@/constants/date'
import { IDatePicker } from '@/types/components/form-control'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Tokyo')

const JPDatePicker = AntdDatePicker.generatePicker<Dayjs>({
  ...dayjsGenerateConfig,
  getNow: () => dayjs.tz(),
  getFixedDate: string => dayjs.tz(string),
  locale: {
    ...dayjsGenerateConfig.locale,
    parse: function parse(locale, text, formats) {
      const date = dayjsGenerateConfig.locale.parse(locale, text, formats)

      for (let i = 0; i < formats.length; i += 1) {
        const format = formats[i]

        try {
          const jpDate = dayjs.tz(date, format, 'Asia/Tokyo')
          if (jpDate.isValid()) {
            return jpDate
          }
        } catch (ignore) {}
      }

      return null
    }
  }
})

const DatePicker = ({
  name,
  className,
  dateFormat = DISPLAY_DATETIME_FORMAT,
  disabled,
  isLoading,
  control,
  testId,
  showError = true,
  validationRules,
  disabledDate,
  showTime,
  getPopupContainer,
  placeholder,
  onChange
}: IDatePicker) => {
  const {
    field: { ref, value, onChange: onFieldChange, onBlur },
    formState: { isSubmitting },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: validationRules
  })

  const handleOnChange = (event: any) => {
    onFieldChange(event)
    onChange?.(event)
  }

  return (
    <div className="app-date-picker">
      <JPDatePicker
        ref={ref}
        data-testid={testId}
        className={classNames(className, { error: !!error })}
        popupClassName={classNames(className, 'app-date-picker-dropdown')}
        value={value}
        format={dateFormat}
        disabled={disabled || isLoading || isSubmitting}
        name={name}
        showTime={showTime}
        showNow={false}
        changeOnBlur={true}
        getPopupContainer={getPopupContainer}
        disabledDate={disabledDate}
        placeholder={placeholder}
        allowClear={true}
        onChange={handleOnChange}
        onBlur={onBlur}
      />
      <FormErrorMessage message={error?.message} showError={showError} />
    </div>
  )
}

export default memo(DatePicker)
