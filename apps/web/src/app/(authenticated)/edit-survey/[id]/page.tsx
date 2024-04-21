'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Typography, Space, Select } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditSurveyPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [survey, setSurvey] = useState<Model.Survey>()
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const surveyData = await Api.Survey.findOne(params.id, {
          includes: ['questions'],
        })
        setSurvey(surveyData)
        form.setFieldsValue(surveyData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch survey details', { variant: 'error' })
      }
    }

    if (params.id) {
      fetchSurvey()
    }
  }, [params.id, form])

  const handleUpdateSurvey = async (values: Partial<Model.Survey>) => {
    try {
      const updatedSurvey = await Api.Survey.updateOne(params.id, values)
      setSurvey(updatedSurvey)
      enqueueSnackbar('Survey updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update survey', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Edit Survey</Title>
      <Text>Edit the details of your survey below.</Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateSurvey}
        initialValues={survey}
      >
        <Form.Item
          name="title"
          label="Survey Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of the survey!',
            },
          ]}
        >
          <Input prefix={<EditOutlined />} placeholder="Enter survey title" />
        </Form.Item>

        {survey?.questions?.map((question, index) => (
          <Form.Item
            key={question.id}
            name={`questions[${index}].text`}
            label={`Question ${index + 1}`}
            rules={[
              { required: true, message: 'Please input the question text!' },
            ]}
          >
            <Input placeholder="Enter question text" />
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Survey
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
