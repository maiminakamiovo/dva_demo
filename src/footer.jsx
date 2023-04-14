import { useEffect, useState } from 'react'
import { Button, Table,Divider } from 'antd'
import { useBearStore } from './zustand/store.js';

export default function Footer() {
    const [data,setData] = useState([])
    const count = useBearStore(state=>state.asyncData)
    const res = useBearStore(state=>state.xfsmart)//getState为同步无响应式所以这里用useBearStore来获取
    useEffect(()=>{
        count()
    },[res])
    const acquire = ()=>{
        const newData = res.list.map((item)=>{
            return {name:item.name,type:item.type,key:Math.random()}
        })
        setData(newData)
    }
    const columns = [
        {
          title: '类型',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '事故类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '处理',
          dataIndex: 'position',
          key: 'position',
        },
      ];
  return (
    <>
    <Divider />
    <Table
    columns={columns}
    dataSource={data}
    title={() => <Button onClick={acquire}>获取</Button>}
  />
    </>
  )
}

