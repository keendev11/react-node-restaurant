import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Rate, Table, Tag } from 'antd'
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { ADMIN, DEFAULT_PAGE_SIZE, OWNER } from 'utils/config'
import { selectUserRole } from 'store/modules/auth'
import {
  LIST_REVIEW,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  listReview,
  createReview,
  updateReview,
  deleteReview,
  selectReviews,
  selectRestaurantStatus,
  selectRestaurant,
} from 'store/modules/restaurant'
import { Drawer, ReviewForm } from 'components'
import { resolvedAction } from 'utils/actions'

const ReviewTable = () => {
  const restaurant = useSelector(selectRestaurant)
  const reviews = useSelector(selectReviews)
  const role = useSelector(selectUserRole)
  const status = useSelector(selectRestaurantStatus)
  const dispatch = useDispatch()

  const [editingRecord, setEditingRecord] = useState(null)
  const [editItem, setEditItem] = useState('review')
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  useEffect(() => {
    dispatch(listReview())
  }, [dispatch])

  useEffect(() => {
    if ([resolvedAction(CREATE_REVIEW), resolvedAction(UPDATE_REVIEW)].includes(status)) {
      handleDrawerClose()
    }
  }, [status])

  function handleDrawerClose() {
    setEditingRecord(null)
    setIsDrawerOpened(false)
  }

  function handleSubmit(values) {
    if (values.id) {
      dispatch(updateReview(values))
    } else {
      dispatch(createReview(values))
    }
  }

  const isLoading = [LIST_REVIEW, CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW].includes(status)

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate value={rating} disabled />,
    },
    {
      title: 'Reply',
      dataIndex: 'reply',
      key: 'reply',
      render: (_, record) => {
        if (role === OWNER) {
          return (
            record.reply || (
              <React.Fragment>
                <Tag color="red">No Reply</Tag>
                <Button
                  icon={<CommentOutlined />}
                  style={{ marginLeft: 5 }}
                  shape="circle"
                  size="small"
                  onClick={() => {
                    setEditItem('reply')
                    setEditingRecord(record)
                    setIsDrawerOpened(true)
                  }}
                />
              </React.Fragment>
            )
          )
        }

        if (role === ADMIN) {
          return record.reply ? (
            <React.Fragment>
              {record.reply}
              {role === ADMIN && (
                <Button
                  icon={<EditOutlined />}
                  style={{ marginLeft: 5 }}
                  shape="circle"
                  size="small"
                  onClick={() => {
                    setEditItem('reply')
                    setEditingRecord(record)
                    setIsDrawerOpened(true)
                  }}
                />
              )}
            </React.Fragment>
          ) : (
            <Tag color="red">No Reply</Tag>
          )
        }

        return record.reply || <Tag color="red">No Reply</Tag>
      },
    },
  ]

  if (role === ADMIN) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <React.Fragment>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 5 }}
            shape="circle"
            size="small"
            onClick={() => {
              setEditItem('review')
              setEditingRecord(record)
              setIsDrawerOpened(true)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            shape="circle"
            size="small"
            onClick={() => {
              Modal.confirm({
                title: 'Do you want to delete this review?',
                icon: <ExclamationCircleOutlined />,
                maskClosable: true,
                onOk: () => {
                  dispatch(deleteReview(record.id))
                },
              })
            }}
          />
        </React.Fragment>
      ),
    })
  }

  return (
    <>
      {restaurant.reviewable && (
        <div className="page-add-record">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditItem('review')
              setIsDrawerOpened(true)
            }}
          >
            Leave Comment
          </Button>
        </div>
      )}
      <Table
        dataSource={reviews.results}
        columns={columns}
        rowKey="id"
        size="small"
        loading={isLoading}
        bordered
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: reviews.totalCount,
          current: reviews.currentPage,
          size: 'default',
        }}
        onChange={(pagination) => dispatch(listReview({ page: pagination.current }))}
      />

      <Drawer title="Review" visible={isDrawerOpened} onClose={handleDrawerClose}>
        <ReviewForm
          initialValues={editingRecord}
          item={editItem}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </>
  )
}

export default ReviewTable
