'use client'

import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Typography, Row, Col, Space } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateSurveyPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [themes, setThemes] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themesFound = await Api.Theme.findMany()
        setThemes(themesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch themes', { variant: 'error' })
      }
    }

    fetchThemes()
  }, [])

  const onFinish = async values => {
    try {
      const newSurvey = await Api.Survey.createOneByUserId(userId, {
        title: values.title,
        themeId: values.themeId,
        userId: userId,
        dateCreated: dayjs().toISOString(),
        dateUpdated: dayjs().toISOString(),
      })

      values.questions.forEach(async question => {
        await Api.Question.createOneBySurveyId(newSurvey.id, {
          text: question.text,
          type: question.type,
          surveyId: newSurvey.id,
          dateCreated: dayjs().toISOString(),
          dateUpdated: dayjs().toISOString(),
        })
      })

      enqueueSnackbar('Survey created successfully!', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to create survey', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={2}>Create New Survey</Title>
          <Text type="secondary">
            Customize your survey with questions and themes.
          </Text>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
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
              <Input placeholder="Enter survey title" />
            </Form.Item>
            <Form.Item
              name="themeId"
              label="Select Theme"
              rules={[{ required: true, message: 'Please select a theme!' }]}
            >
              <Select placeholder="Select a theme">
                {themes.map(theme => (
                  <Option key={theme.id} value={theme.id}>
                    {theme.color} - {theme.font}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: 'Missing question text' },
                        ]}
                      >
                        <Input placeholder="Question Text" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'type']}
                        rules={[
                          { required: true, message: 'Missing question type' },
                        ]}
                      >
                        <Select placeholder="Select type">
                          <Option value="text">Text</Option>
                          <Option value="multiple-choice">
                            Multiple Choice
                          </Option>
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusCircleOutlined />}
                    >
                      Add Question
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Survey
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
