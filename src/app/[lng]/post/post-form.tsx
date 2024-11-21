'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, SelectProps } from 'antd'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import Input from '@/components/antd/input'
import Tag from '@/components/antd/tag'
import { addBasePathPrefix } from '@/helpers/basePath'
import { useClientTranslation } from '@/i18n/client'
import { IPost, IPostFormValues } from '@/types/post'

const options: SelectProps['options'] = [
  {
    value: 'python',
    label: 'Python'
  },
  {
    value: 'java',
    label: 'Java'
  },
  {
    value: 'cSharp',
    label: 'C#'
  },
  {
    value: 'cPlusPlus',
    label: 'C++'
  },
  {
    value: 'ruby',
    label: 'Ruby'
  },
  {
    value: 'go',
    label: 'Go'
  },
  {
    value: 'swift',
    label: 'Swift'
  },
  {
    value: 'kotlin',
    label: 'Kotlin'
  },
  {
    value: 'php',
    label: 'PHP'
  },
  {
    value: 'rust',
    label: 'Rust'
  }
]

const defaultValues: IPostFormValues = {
  title: '',
  author: '',
  content: '',
  tags: []
}

export default function PostForm({ lng, data }: { lng: string; data?: IPost }) {
  const { t } = useClientTranslation(lng, 'post')
  const router = useRouter()

  const [form] = Form.useForm()

  const formValidationSchema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().required(t('common:validations.required') as string),
        content: yup.string().required(t('common:validations.required') as string)
      }),
    [t]
  )

  const formModule = useForm<IPostFormValues>({
    defaultValues: data || defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(formValidationSchema)
  })

  const { control, handleSubmit } = formModule

  const isEdit = !!(data && data.id)

  const onSubmitValid = async (formValues: IPostFormValues) => {
    const payload = formValues

    if (!isEdit) {
      const response = await fetch(addBasePathPrefix('/api/posts'), {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response.status === 201) {
        router.push(`/${lng}/post`)
        router.refresh()
      }
    } else {
      const response = await fetch(addBasePathPrefix(`/api/posts/${data.id}`), {
        method: 'PUT',
        body: JSON.stringify(payload)
      })
      if (response.status === 200) {
        router.push(`/${lng}/post`)
        router.refresh()
      }
    }
  }

  return (
    <div className="w-[600px] py-4">
      <Form
        form={form}
        className="app-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        colon={false}
        onFinish={handleSubmit(onSubmitValid)}
        data-testid="announcement-form"
      >
        <FormProvider {...formModule}>
          <Form.Item label={t('fields.title')} required>
            <Input name="title" control={control} placeholder={t('placeholder.title')} testId="title" />
          </Form.Item>

          <Form.Item label={t('fields.author')}>
            <Input name="author" control={control} placeholder={t('placeholder.author')} testId="author" />
          </Form.Item>

          <Form.Item label={t('fields.content')} required>
            <Input name="content" control={control} placeholder={t('placeholder.content')} testId="content" />
          </Form.Item>

          <Form.Item label={t('fields.tags')}>
            <Tag options={options} name="tags" control={control} placeholder={t('placeholder.tags')} testId="tags" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button size="large" type="primary" htmlType="submit" data-testid="submit-button">
              {t(`actions.${isEdit ? 'save' : 'add'}`)}
            </Button>
          </Form.Item>
        </FormProvider>
      </Form>
    </div>
  )
}
