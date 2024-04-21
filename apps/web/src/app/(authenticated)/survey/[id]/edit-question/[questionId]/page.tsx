'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Typography, Spin, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditQuestionPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const questionData = await Api.Question.findOne(params.questionId, {
          includes: ['survey'],
        })
        setQuestion(questionData)
        form.setFieldsValue(questionData)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch question details', {
          variant: 'error',
        })
        router.push(`/survey/${params.id}`)
      }
    }

    fetchQuestion()
  }, [params.questionId, form, router])

  const handleUpdate = async values => {
    try {
      const updatedQuestion = await Api.Question.updateOne(
        params.questionId,
        values,
      )
      setQuestion(updatedQuestion)
      enqueueSnackbar('Question updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update question', { variant: 'error' })
    }
  }

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Edit Question</Title>
      <Text>Edit the details of your question below.</Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={question}
      >
        <Form.Item
          name="text"
          label="Question Text"
          rules={[
            { required: true, message: 'Please input the question text!' },
          ]}
        >
          <Input placeholder="Enter question text" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Question Type"
          rules={[
            { required: true, message: 'Please input the question type!' },
          ]}
        >
          <Input placeholder="Enter question type" />
        </Form.Item>
        <Form.Item name="conditionalLogic" label="Conditional Logic">
          <Input placeholder="Enter conditional logic (optional)" />
        </Form.Item>
        <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
          Update Question
        </Button>
      </Form>
    </PageLayout>
  )
}
