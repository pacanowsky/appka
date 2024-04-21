'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Spin, Result } from 'antd'
import {
  LoadingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SurveyAccessPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [surveyAccess, setSurveyAccess] = useState<Model.SurveyAccess | null>(
    null,
  )
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('No survey access ID provided', { variant: 'error' })
      router.push('/home')
      return
    }

    const fetchSurveyAccess = async () => {
      try {
        const access = await Api.SurveyAccess.findOne(params.id, {
          includes: ['survey', 'participant'],
        })
        if (!access) {
          setError(true)
          enqueueSnackbar('Survey access not found', { variant: 'error' })
        } else {
          setSurveyAccess(access)
        }
      } catch (err) {
        setError(true)
        enqueueSnackbar('Failed to fetch survey access', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchSurveyAccess()
  }, [params.id, router])

  const handleStartSurvey = () => {
    if (surveyAccess?.survey?.id) {
      router.push(`/survey/${surveyAccess.survey.id}`)
    }
  }

  if (loading) {
    return (
      <PageLayout layout="full-width">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout layout="full-width">
        <Result
          status="error"
          title="Failed to Load Survey Access"
          subTitle="Please try again later or contact support."
          icon={<ExclamationCircleOutlined />}
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Survey Access</Title>
      <Text>
        You are accessing the survey:{' '}
        <strong>{surveyAccess?.survey?.title || 'Unknown Survey'}</strong>
      </Text>
      <Text>
        Date Created:{' '}
        {dayjs(surveyAccess?.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
      </Text>
      <Button
        type="primary"
        onClick={handleStartSurvey}
        icon={<CheckCircleOutlined />}
        disabled={!surveyAccess?.survey?.id}
      >
        Start Survey
      </Button>
    </PageLayout>
  )
}
