'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SurveyLogicPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [survey, setSurvey] = useState<Model.Survey | null>(null)
  const [questions, setQuestions] = useState<Model.Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const surveyData = await Api.Survey.findOne(params.id, {
          includes: ['questions', 'questions.options'],
        })
        setSurvey(surveyData)
        setQuestions(surveyData.questions || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch survey details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchSurvey()
  }, [params.id])

  const handleAddLogic = async (values: any) => {
    try {
      const updatedQuestion = await Api.Question.updateOne(values.questionId, {
        conditionalLogic: values.conditionalLogic,
      })
      setQuestions(
        questions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)),
      )
      enqueueSnackbar('Conditional logic added successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to add conditional logic', { variant: 'error' })
    }
  }

  if (loading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Survey Logic Configuration</Title>
      <Text>
        Define the logic that determines the flow of the survey based on
        responses.
      </Text>
      <Form onFinish={handleAddLogic} layout="vertical">
        <Form.Item
          name="questionId"
          label="Select Question"
          rules={[{ required: true, message: 'Please select a question!' }]}
        >
          <Select placeholder="Select a question">
            {questions?.map(question => (
              <Option key={question.id} value={question.id}>
                {question.text}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="conditionalLogic"
          label="Conditional Logic"
          rules={[
            { required: true, message: 'Please input the conditional logic!' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter conditional logic" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Logic
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
