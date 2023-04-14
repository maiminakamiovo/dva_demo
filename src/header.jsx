import { Input,Form,Row,Col, Button } from 'antd'
import {useBearStore} from './zustand/store.js'

export function Header() {
    const [form] = Form.useForm()
    const res = useBearStore(state=>state.data)
    const add = ()=>{
        const temp = [...res]
        temp.push({key:Math.random(),...form.getFieldsValue()})
        useBearStore.setState({data:temp})//改变data的值
        useBearStore.setState({form:form})//把form表单实例传到store仓库
    }
    const find = ()=>{
        const count = form.getFieldsValue()
        let obj = {}
        for(let item in count){
            if(count[item]){
               obj=Object.assign(obj,{[item]:count[item]})
            }
        }
       const findres= res.filter(it => Object.entries(obj).every(([key, val]) => it[key] === val))
       useBearStore.setState({data:findres})
    }
  return (
    <Form form={form}>
        <Row gutter={30}>
            <Col span={6}>
            <Form.Item name={'name'} label={'姓名'}>
            <Input ></Input>
            </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item name={'age'} label={'年龄'}>
            <Input ></Input>
            </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item name={'adress'} label={'地址'}>
            <Input ></Input>
        </Form.Item>
        </Col>
        <Col span={1} style={{marginLeft:50}}>
            <Button onClick={()=>{find()}}> 
                查询
            </Button>
        </Col>
        <Col>
            <Button span={2} style={{marginLeft:10}} onClick={add}>新增</Button>
        </Col>
        </Row>
    </Form>
  )
}
