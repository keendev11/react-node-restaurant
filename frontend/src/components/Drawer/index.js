import React from 'react'
import { Drawer } from 'antd'

export default ({ children, ...otherProps }) => (
  <Drawer placement="right" closable maskClosable width={400} destroyOnClose {...otherProps}>
    {children}
  </Drawer>
)
