import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Rate } from 'antd'
import { pick } from 'lodash'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const ReviewForm = ({ initialValues, item, isLoading, onSubmit }) => {
  const pickKeys = item === 'review' ? ['id', 'comment', 'rating'] : ['id', 'reply']

  function handleSubmit(values) {
    onSubmit(pick({ ...initialValues, ...values }, pickKeys))
  }

  return (
    <Form {...formItemLayout} initialValues={initialValues} onFinish={handleSubmit}>
      {item === 'review' && (
        <React.Fragment>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: 'Please input your coment!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please select your rating!' }]}
          >
            <Rate />
          </Form.Item>
        </React.Fragment>
      )}

      {item === 'reply' && (
        <Form.Item
          name="reply"
          label="Reply"
          rules={[{ required: true, message: 'Please select your reply message!' }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

ReviewForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    rating: PropTypes.number,
  }),
  item: PropTypes.oneOf(['review', 'reply']),
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default ReviewForm
