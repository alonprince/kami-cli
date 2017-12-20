import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import '../../scss/app.scss'

const { Header, Footer, Sider, Content } = Layout;

import Tree from './Tree'
import Blank from './Blank'

export default class Main extends React.Component {
  render() {
    return (
      <Layout className="total-height">
        <Header style={{ background: '#7dbcea', color: '#fff', fontSize: 22, textAlign: 'center' }}>Show Your Code's Logic</Header>
        <Layout>
          <Sider style={{ background: '#fff' }}>
            <Tree />
          </Sider>
          <Content><Blank /></Content>
        </Layout>
      </Layout>
    );
  }
}


