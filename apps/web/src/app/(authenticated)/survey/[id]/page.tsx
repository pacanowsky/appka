'use client'

import { useEffect, useState } from 'react'
import { Typography, Spin, Descriptions, List, Card, Avatar } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SurveyDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [survey, setSurvey] = useState<Model.Survey | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const surveyData = await Api.Survey.findOne(params.id, {
          includes: ['user', 'theme', 'questions', 'questions.options'],
        })
        setSurvey(surveyData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch survey details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchSurvey()
  }, [params.id])

  if (loading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!survey) {
    return (
      <PageLayout layout="full-width">
        <Paragraph>No survey data found.</Paragraph>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>{survey.title}</Title>
      <Descriptions bordered>
        <Descriptions.Item label="Created By">
          {survey.user?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Date Created">
          {dayjs(survey.dateCreated).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Theme">
          {survey.theme?.color ? `Color: ${survey.theme.color}` : 'No theme'}
        </Descriptions.Item>
      </Descriptions>

      <Title level={3} style={{ marginTop: '20px' }}>
        Questions
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={survey.questions}
        renderItem={item => (
          <List.Item>
            <Card title={item.text}>
              {item.options?.map(option => (
                <Card.Grid key={option.id} style={{ width: '100%' }}>
                  <Text>{option.text}</Text>
                </Card.Grid>
              ))}
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
