import { Input, Modal,Form } from 'antd';
import { useBearStore } from './zustand/store.js';
import { useState } from 'react';

export function EditMotail () {
    const [form] = Form.useForm()
    const [isopen,SetIsopen] = useState(false)
    const down = useBearStore((state)=>state.down)//取出仓库中的down方法
    const data = useBearStore(state=>state.data)//取出仓库中的data值
    useBearStore.subscribe(state=>state.isopen,(newstate,old)=>{SetIsopen(newstate)})//监听isopen的状态改变就改变对话框状态
    const finsh = () =>{
        const formData = Object.assign(form.getFieldsValue(),{key:Math.random()})
        const newIndex = useBearStore.getState().tableIndex
        const res = [...data]
        res.splice(newIndex,1,formData)
        useBearStore.setState({data:res})
        down()
    }
  return (
    <>
      <Modal title="编辑" open={isopen} onOk={()=>{finsh()}} onCancel={down}>
        <Form form={form}>
            <Form.Item name={'name'} label={'姓名'}>
                <Input></Input>
            </Form.Item>
            <Form.Item name={'age'} label={'年龄'}>
                <Input></Input>
            </Form.Item>
            <Form.Item name={'adress'} label={'住址'}>
                <Input></Input>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};