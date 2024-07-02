'use client'

import Icon from '@ant-design/icons'
import type { GetProps } from 'antd';

import Announcement from '/public/icons/announcement.svg'
import ChevronDown from '/public/icons/chevron-down.svg'
import Grid from '/public/icons/grid.svg'
import Help from '/public/icons/help.svg'
import Notification from '/public/icons/notification.svg'
import Copy from '/public/icons/copy.svg'
import ChevronLeft from '/public/icons/chevron-left.svg'

type CustomIconComponentProps = GetProps<typeof Icon>;

export const AnnouncementIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Announcement} {...props} />
}

export const ChevronDownIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ChevronDown} {...props} />
}

export const GridIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Grid} {...props} />
}

export const HelpIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Help} {...props} />
}

export const NotificationIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Notification} {...props} />
}

export const CopyIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={Copy} {...props} />
}

export const ChevronLeftIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ChevronLeft} {...props} />
}
