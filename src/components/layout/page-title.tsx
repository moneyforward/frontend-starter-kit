'use client'

import { Col, Row } from 'antd'

const PageTitle = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <Row className="page-title" align="middle">
      <Col>
        <h1 className="title">{title}</h1>
      </Col>
      {subTitle && (
        <Col>
          <span className="sub-title">{subTitle}</span>
        </Col>
      )}
    </Row>
  )
}

export default PageTitle
