'use client'

import { useEffect, useState } from 'react'
import { Button, Select, Typography, Form, Input, Row, Col, Card } from 'antd'
import { PlusOutlined, SaveOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CustomizeSurveyPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [themes, setThemes] = useState([])
  const [survey, setSurvey] = useState(null)
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

    const fetchSurvey = async () => {
      try {
        const surveyFound = await Api.Survey.findOne(params.id, {
          includes: ['theme'],
        })
        setSurvey(surveyFound)
        form.setFieldsValue({
          themeId: surveyFound.themeId,
          color: surveyFound.theme?.color,
          font: surveyFound.theme?.font,
        })
      } catch (error) {
        enqueueSnackbar('Failed to fetch survey details', { variant: 'error' })
      }
    }

    fetchThemes()
    fetchSurvey()
  }, [params.id])

  const handleSave = async values => {
    try {
      await Api.Survey.updateOne(params.id, { themeId: values.themeId })
      await Api.Theme.updateOne(values.themeId, {
        color: values.color,
        font: values.font,
      })
      enqueueSnackbar('Survey customization saved successfully', {
        variant: 'success',
      })
      router.push(`/survey/${params.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to save customization', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Customize Survey</Title>
      <Text>Edit the theme, colors, and fonts for your survey.</Text>
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Theme" name="themeId">
              <Select placeholder="Select a theme">
                {themes?.map(theme => (
                  <Option key={theme.id} value={theme.id}>
                    {theme.color} - {theme.font}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color" name="color">
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Font" name="font">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Save Changes
        </Button>
      </Form>
    </PageLayout>
  )
}
