'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Table, Spin, Space, Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SurveyResponsesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [survey, setSurvey] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('Survey ID is missing', { variant: 'error' })
      router.push('/home')
      return
    }

    const fetchSurvey = async () => {
      try {
        const fetchedSurvey = await Api.Survey.findOne(params.id, {
          includes: [
            'responses',
            'responses.participant',
            'responses.answers',
            'responses.comments',
          ],
        })
        setSurvey(fetchedSurvey)
      } catch (error) {
        enqueueSnackbar('Failed to fetch survey details', { variant: 'error' })
        console.error('Failed to fetch survey:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSurvey()
  }, [params.id, router])

  const columns = [
    {
      title: 'Participant',
      dataIndex: ['participant', 'id'],
      key: 'participant',
      render: text => <Text>{text}</Text>,
    },
    {
      title: 'Responses',
      dataIndex: 'answers',
      key: 'answers',
      render: answers =>
        answers.map(answer => <Text key={answer.id}>{answer.text}</Text>),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      render: comments =>
        comments.map(comment => <Text key={comment.id}>{comment.text}</Text>),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              router.push(`/survey/${record.surveyId}/response/${record.id}`)
            }
            icon={<EyeOutlined />}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Survey Responses</Title>
      <Text>This page displays all the responses for the selected survey.</Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={survey?.responses} columns={columns} rowKey="id" />
      )}
    </PageLayout>
  )
}
