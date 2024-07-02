import { ButtonProps } from 'antd'
import { ButtonSize } from 'antd/lib/button'

export interface IButton extends Omit<ButtonProps, 'type' | 'size'> {
  color?: 'primary' | 'error'
  isLink?: boolean
  isOutline?: boolean
  size?: ButtonSize | 'x-large' | 'auto'
}
