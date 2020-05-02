import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Rate, Row } from 'antd'
import {
  GET_RESTAURANT,
  getRestaurant,
  selectRestaurant,
  selectRestaurantStatus,
} from 'store/modules/restaurant'
import { ReviewTable } from 'containers'
import { Loader } from 'components'

const RestaurantDetailPage = () => {
  const restaurant = useSelector(selectRestaurant)
  const status = useSelector(selectRestaurantStatus)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRestaurant(params.id))
  }, [dispatch, params.id])

  if (status === GET_RESTAURANT || !restaurant) {
    return <Loader />
  }

  return (
    <div className="page user-page">
      <h1 className="page-heading">{restaurant.name}</h1>
      <Row gutter={20}>
        <Col span={10}>
          <Card title="Restaurant Details" bordered={false}>
            <div>
              <b>Name:</b> {restaurant.name}
            </div>
            <div>
              <b>Owned by:</b> {restaurant.owner.name}
            </div>
            <div>
              <b>Average Rating:</b> {restaurant.avgRating}
            </div>
          </Card>
        </Col>
        {restaurant.maxReview && (
          <Col span={6} offset={2}>
            <Card title="Highest Review">
              <div>User: {restaurant.maxReview.user.name}</div>
              <div>Comment: {restaurant.maxReview.comment}</div>
              <div>
                <Rate value={restaurant.maxReview.rating} disabled />
              </div>
            </Card>
          </Col>
        )}
        {restaurant.minReview && (
          <Col span={6}>
            <Card title="Lowest Review">
              <div>User: {restaurant.maxReview.user.name}</div>
              <div>Comment: {restaurant.minReview.comment}</div>
              <Rate value={restaurant.minReview.rating} disabled />
            </Card>
          </Col>
        )}
      </Row>

      <h1 className="page-subheading">Reviews</h1>
      <ReviewTable />
    </div>
  )
}

export default RestaurantDetailPage
