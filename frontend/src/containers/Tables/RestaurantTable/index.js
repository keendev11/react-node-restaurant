import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Table } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { ADMIN, OWNER, DEFAULT_PAGE_SIZE } from 'utils/config'
import { selectUserRole } from 'store/modules/auth'
import {
  LIST_RESTAURANT,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT,
  listRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  selectRestaurants,
  selectRestaurantStatus,
} from 'store/modules/restaurant'
import { Drawer, RestaurantForm } from 'components'
import { resolvedAction } from 'utils/actions'

const RestaurantTable = () => {
  const [editingRecord, setEditingRecord] = useState(null)
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  const role = useSelector(selectUserRole)
  const restaurants = useSelector(selectRestaurants)
  const status = useSelector(selectRestaurantStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listRestaurant())
  }, [dispatch])

  useEffect(() => {
    if ([resolvedAction(CREATE_RESTAURANT), resolvedAction(UPDATE_RESTAURANT)].includes(status)) {
      handleDrawerClose()
    }
  }, [status])

  function handleSubmit(payload) {
    if (payload.id) {
      dispatch(updateRestaurant(payload))
    } else {
      dispatch(createRestaurant(payload))
    }
  }

  function handleDrawerClose() {
    setEditingRecord(null)
    setIsDrawerOpened(false)
  }

  const isLoading = [
    LIST_RESTAURANT,
    CREATE_RESTAURANT,
    UPDATE_RESTAURANT,
    DELETE_RESTAURANT,
  ].includes(status)

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <Link to={`/restaurants/${record.id}`}>{record.name}</Link>,
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'name'],
      key: 'owner',
    },
    {
      title: 'Average Rating',
      dataIndex: 'avgRating',
      key: 'avgRating',
    },
  ]

  if (role === ADMIN) {
    columns.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <React.Fragment>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 5 }}
            shape="circle"
            size="small"
            onClick={() => {
              setEditingRecord(record)
              setIsDrawerOpened(true)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            size="small"
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Do you want to delete this restaurant?',
                icon: <ExclamationCircleOutlined />,
                maskClosable: true,
                onOk: () => {
                  dispatch(deleteRestaurant(record.id))
                },
              })
            }}
          />
        </React.Fragment>
      ),
    })
  }

  return (
    <React.Fragment>
      {role === OWNER && (
        <div className="page-add-record">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDrawerOpened(true)}>
            Add Restaurant
          </Button>
        </div>
      )}
      <Table
        dataSource={restaurants.results}
        columns={columns}
        rowKey="id"
        size="small"
        loading={isLoading}
        bordered
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: restaurants.totalCount,
          current: restaurants.currentPage,
          size: 'default',
        }}
        onChange={(pagination) => dispatch(listRestaurant({ page: pagination.current }))}
      />
      <Drawer title="Restaurant" visible={isDrawerOpened} onClose={handleDrawerClose}>
        <RestaurantForm
          initialValues={editingRecord}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </React.Fragment>
  )
}

export default RestaurantTable
