import { Button, Table } from 'antd';
import {  useEffect, useState } from 'react';
import { useBearStore } from './zustand/store.js';

export function Content () {
    const [data,setData] = useState()
    useBearStore.subscribe((state)=>state.data, ()=>{setData(useBearStore.getState().data)})//监听仓库状态data改变就获取最新的data给Table
    const dele = (index)=>{
        const temp = [...data]
        temp.splice(index,1)
        useBearStore.setState({data:temp})
        setData(temp)
    }
    const openModal = (index)=>{
        useBearStore.setState({isopen:true})
        useBearStore.setState({tableIndex:index})
    }
    const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '地址',
          dataIndex: 'adress',
          key: 'adress',
        },
        {
          title: '操作',
          key: 'tags',
          dataIndex: 'tags',
          render:(text, record, index)=>{
              return (
                  <div>
                      <Button style={{marginRight:10}} onClick={()=>openModal(index)}>编辑</Button>
                      <Button onClick={()=> dele(index)}>删除</Button>
                  </div>
              )
          }
        },
      ];
    return(<Table columns={columns} dataSource={data} />)
};