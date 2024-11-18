import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import DatePicker from './date-picker'
import { DISPLAY_DATETIME_FORMAT } from '@/constants/date'

// Wrapper component to provide form context
const DatePickerWithForm = (props: any) => {
  const { control } = useForm({
    defaultValues: {
      date: props.defaultValue || null
    }
  })

  return <DatePicker name="date" control={control} {...props} />
}

const meta = {
  title: 'Components/Antd/DatePicker',
  component: DatePickerWithForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Date picker component with Japan timezone support'
      }
    }
  },
  argTypes: {
    dateFormat: {
      control: 'text',
      description: 'Date format string',
      defaultValue: DISPLAY_DATETIME_FORMAT
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker'
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    showTime: {
      control: 'boolean',
      description: 'Show time picker'
    },
    showError: {
      control: 'boolean',
      description: 'Show error message',
      defaultValue: true
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    }
  }
} satisfies Meta<typeof DatePickerWithForm>

export default meta
type Story = StoryObj<typeof DatePickerWithForm>

export const Default: Story = {
  args: {
    placeholder: 'Select date'
  }
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: dayjs(),
    placeholder: 'Select date'
  }
}

export const WithTime: Story = {
  args: {
    showTime: true,
    placeholder: 'Select date and time'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: dayjs(),
    placeholder: 'Disabled date picker'
  }
}

export const WithValidation: Story = {
  args: {
    placeholder: 'Required field',
    validationRules: {
      required: 'This field is required'
    }
  }
}

export const CustomFormat: Story = {
  args: {
    dateFormat: 'YYYY/MM/DD',
    placeholder: 'YYYY/MM/DD'
  }
}

export const WithDisabledDates: Story = {
  args: {
    disabledDate: (current: any) => {
      return current && current < dayjs().startOf('day')
    },
    placeholder: 'Cannot select past dates'
  }
}
