import React from 'react';
import { Row, Col, Spin } from 'antd'
import { convertCodeToFlowTree, convertFlowTreeToSvg } from 'js2flowchart'

import * as _ from 'lodash';

import emitter from './emitter';

export default class FileTree extends React.Component {
  state = {
    svg: '',
    loading: false,
  }
  componentDidMount() {
    emitter.addListener('beginGetFile', () => {
      this.setState({
        loading: true,
      })
    })
    emitter.addListener('getFile', (file) => {
      const flowTree = convertCodeToFlowTree(file);
      const svg = convertFlowTreeToSvg(flowTree);
      this.setState({
        svg,
        loading: false,
      })
    })
  }
  render() {
    return (
      <div style={{height: "100vh"}}>
        <Spin spinning={this.state.loading}>
          <Row>
            <Col span={24} dangerouslySetInnerHTML={{ __html: this.state.svg }} style={{textAlign: 'center', overflow: scroll}}>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}