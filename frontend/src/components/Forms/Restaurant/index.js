import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

const RestaurantForm = ({ initialValues, isLoading, onSubmit }) => {
  function handleSubmit(values) {
    onSubmit({ ...initialValues, ...values })
  }

  return (
    <Form {...layout} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

RestaurantForm.propTypes = {
  isLoading: PropTypes.bool,
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
}

export default RestaurantForm
