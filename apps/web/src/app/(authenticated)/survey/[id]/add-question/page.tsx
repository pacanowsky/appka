'use client'

import { useState, useEffect } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddQuestionPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const surveyId = params.id

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to add questions.', {
        variant: 'error',
      })
      router.push('/home')
    }
  }, [userId, router])

  const handleFormSubmit = async (values: {
    text: string
    type: string
    conditionalLogic: string
  }) => {
    setLoading(true)
    try {
      await Api.Question.createOneBySurveyId(surveyId, {
        text: values.text,
        type: values.type,
        conditionalLogic: values.conditionalLogic,
        surveyId: surveyId,
      })
      enqueueSnackbar('Question added successfully!', { variant: 'success' })
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to add question. Please try again.', {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>Add a New Question</Title>
        <Text type="secondary">
          Add new questions to your survey to gather more insights.
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="text"
            label="Question Text"
            rules={[
              { required: true, message: 'Please input the question text!' },
            ]}
          >
            <Input placeholder="Enter the question text" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Question Type"
            rules={[
              { required: true, message: 'Please select the question type!' },
            ]}
          >
            <Input placeholder="Enter the question type (e.g., multiple choice)" />
          </Form.Item>
          <Form.Item name="conditionalLogic" label="Conditional Logic">
            <Input placeholder="Describe any conditional logic" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
              loading={loading}
            >
              Add Question
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
