import React from 'react'
import { RestaurantTable } from 'containers'

const RestaurantListPage = () => {
  return (
    <div className='page user-page'>
      <h1 className='page-heading'>Restaurants</h1>
      <RestaurantTable />
    </div>
  )
}

export default RestaurantListPage
