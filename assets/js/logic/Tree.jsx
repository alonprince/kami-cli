import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

import * as ajax from 'axios';
import * as _ from 'lodash';

import emitter from './emitter';

export default class FileTree extends React.Component {
  state = {
    treeData: [],
  }
  /**
   * 初始化的时候读取目录文件
   */
  init = () => {
    return this.getDir('')
      .then(res => {
        const tree = [];
        let i = 0;
        _.each(res.data.data.folders, item => {
          tree.push({title: item, key: item});
          i++;
        })
        _.each(res.data.data.files, item => {
          tree.push({title: item, key: item, isLeaf: true});
          i++;
        })
        this.setState({
          treeData: [...tree]
        })
      })
      .catch();
  }
  /**
   * 获取一个path下的文件
   * 
   * @memberof FileTree
   */
  getDir = (path) => ajax.get('/api/tree', {
    params: {
      path,
    }
  })

  /**
   * 获取文件内容
   */
  getFile = (path) => {
    emitter.emit('beginGetFile');
    return ajax.get('/api/file', {
      params: {
        path,
      }
    })
      .then(res => {
        emitter.emit('getFile', res.data.data);
      })
  }
  handleSelect = (selectedKeys, { selectedNodes }) => {
    if (selectedNodes && selectedNodes[0]) {
      const { key, isLeaf } = selectedNodes[0].props.dataRef;
      if (isLeaf) {
        this.getFile(key);
      }
    }
  }
  onLoadData = (treeNode) => {
    const { key } = treeNode.props.dataRef;
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      this.getDir(key)
      .then(res => {
        console.log(res.data.data);
        const children = [];
        res.data.data.folders.forEach(item => {
          children.push({ title: item, key: `${key}/${item}` });
        })
        res.data.data.files.forEach(item => {
          children.push({ title: item, key: `${key}/${item}`, isLeaf: true });
        })
        treeNode.props.dataRef.children = children;
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      })
      .catch();
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} selectable={ false }>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item}/>;
    });
  }
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <Tree loadData={this.onLoadData} onSelect={this.handleSelect}>
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
}
