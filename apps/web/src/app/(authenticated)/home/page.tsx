'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Card, List, Avatar, Space } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    if (userId) {
      Api.Survey.findManyByUserId(userId, {
        includes: ['user', 'questions', 'responses'],
      })
        .then(setSurveys)
        .catch(() =>
          enqueueSnackbar('Failed to fetch surveys', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleCreateSurvey = () => {
    router.push('/create-survey')
  }

  const handleEditSurvey = surveyId => {
    router.push(`/edit-survey/${surveyId}`)
  }

  const handleViewSurvey = surveyId => {
    router.push(`/survey/${surveyId}`)
  }

  const handleDeleteSurvey = async surveyId => {
    try {
      await Api.Survey.deleteOne(surveyId)
      setSurveys(surveys.filter(survey => survey.id !== surveyId))
      enqueueSnackbar('Survey deleted successfully', { variant: 'success' })
    } catch {
      enqueueSnackbar('Failed to delete survey', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Dashboard</Title>
        <Text>
          Welcome to your survey management dashboard. Here you can create,
          edit, and view your surveys.
        </Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateSurvey}
          style={{ marginBottom: '20px' }}
        >
          Create New Survey
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={surveys}
          renderItem={survey => (
            <List.Item
              actions={[
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => handleViewSurvey(survey.id)}
                >
                  View
                </Button>,
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEditSurvey(survey.id)}
                >
                  Edit
                </Button>,
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteSurvey(survey.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      survey.user?.pictureUrl ||
                      'https://joeschmoe.io/api/v1/random'
                    }
                  />
                }
                title={
                  <a onClick={() => handleViewSurvey(survey.id)}>
                    {survey.title}
                  </a>
                }
                description={`Created on ${survey.dateCreated}`}
              />
            </List.Item>
          )}
        />
      </div>
    </PageLayout>
  )
}
