import { DatePickerProps } from 'antd/es/date-picker'
import { ChangeEvent } from 'react'
import { ControllerProps } from 'react-hook-form'

interface BaseFormControl {
  name: string
  className?: string
  width?: number
  testId?: string
  disabled?: boolean
  control: ControllerProps<any>['control']
  showError?: boolean
  validationRules?: ControllerProps['rules']
}

export interface IDatePicker extends BaseFormControl {
  isLoading?: boolean
  dateFormat?: string
  disabledDate?: DatePickerProps['disabledDate']
  showTime?: boolean
  getPopupContainer?: DatePickerProps['getPopupContainer']
  cellRender?: any // DatePickerProps['cellRender']
  placeholder?: string
  onChange?: (event: any) => void
}

export interface IDateRangePicker extends Omit<IDatePicker, 'placeholder'> {
  placeholder?: [string, string]
}

export interface IInput extends BaseFormControl {
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface IInputNumber extends IInput {
  min?: number
  max?: number
}
