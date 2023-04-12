import {
  PageContainer,
  ProTable,
  ProFormSelect,
  ProFormText,
  QueryFilter,
  ProCard,
} from '@ant-design/pro-components';
import {
  Button,
  Divider,
  message,
  Form,
  Modal,
  Input,
  Select,
  Space,
} from 'antd';
import { useState } from 'react';
import { connect } from 'umi';

function TableList(props) {
  console.log(props);
  const { current: { formCreationData } = {}, dispatch } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [createtionData, setCreatetionData] = useState(formCreationData || []);
  console.log(fetch);
  const onFinish = (values) => {
    const params = Object.keys(values)
      .filter(
        (key) =>
          values[key] !== null &&
          values[key] !== undefined &&
          values[key] !== '',
      )
      .reduce((acc, key) => ({ ...acc, [key]: values[key] }), {});
    let keyArray = [];
    let newData = JSON.parse(JSON.stringify(formCreationData));
    if (Object.values(params).length < 1) {
      setCreatetionData(newData);
    } else {
      Object.keys(params).forEach((s, v) => {
        keyArray.push(s);
        for (let index = 0; index < keyArray.length; index++) {
          const element = keyArray[index];
          newData = newData.filter(
            (index) => index[element] === params[element],
          );
          setCreatetionData(
            newData.filter((index) => index[element] === params[element]),
          );
        }
      });
    }
  };

  // 新增&编辑
  const increaseData = () => {
    let values = form.getFieldsValue();
    if (values.id) {
      dispatch({
        type: 'current/editInitdata',
        payload: {
          ...values,
        },
        callback: (res) => {
          if (res.code === 200) {
            message.success('添加成功');
            setVisible(false);
            form.setFieldsValue({
              name: undefined,
              address: undefined,
              gander: undefined,
            });
            form.resetFields();
          }
        },
      });
    } else {
      values.id = new Date().getTime(); // 使用当前时间戳当作id
      dispatch({
        type: 'current/addInitdata',
        payload: {
          ...values,
        },
        callback: (res) => {
          if (res.code === 200) {
            message.success('添加成功');
            setVisible(false);
            form.setFieldsValue({
              name: undefined,
              address: undefined,
              gander: undefined,
            });
            form.resetFields();
          }
        },
      });
    }
  };

  // 删除
  const onDelect = (id) => {
    dispatch({
      type: 'current/onDelect',
      payload: { id },
      callback: (res) => {
        if (res.code === 200) {
          message.success('删除成功');
        } else {
          message.error('删除失败');
        }
      },
    });
  };

  // 编辑
  const onEdit = (recoed) => {
    form.setFieldsValue({ ...recoed });
    setVisible(true);
  };

  const Columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gander',
      render: (text) => (text === 'M' ? '男' : '女'),
    },
    {
      title: '住址',
      dataIndex: 'address',
    },
    {
      title: '时间戳/id',
      dataIndex: 'id',
    },
    {
      title: '操作',
      render: (recoed) => {
        const { id } = recoed;
        return (
          <Space size={0} split={<Divider type="vertical" />}>
            <a onClick={() => onEdit(recoed)}>编辑</a>
            <a onClick={(id) => onDelect(id)}>删除</a>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <PageContainer>
        <ProCard>
          <QueryFilter
            onReset={() => setCreatetionData(formCreationData)}
            onFinish={(values) => onFinish(values)}
            layout="vertical"
          >
            <ProFormText name="name" label="姓名" />
            <ProFormSelect
              name="gander"
              label="性别"
              valueEnum={{
                M: '男',
                F: '女',
              }}
            />
            <ProFormText name="address" label="地址" />
          </QueryFilter>
        </ProCard>
        <ProCard
          extra={<Button onClick={() => setVisible(true)}>新增</Button>}
          style={{ marginTop: 16 }}
        >
          <ProTable
            dataSource={createtionData}
            columns={Columns}
            search={false}
            options={false}
          />
        </ProCard>
      </PageContainer>
      <Modal
        open={visible}
        destroyOnClose
        title="新建"
        width={420}
        onCancel={() => setVisible(false)}
        onOk={() => increaseData(false)}
      >
        <Form form={form}>
          <Form.Item style={{ display: 'none' }} name="id">
            <Input type="hidden" name="id" />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="gander" label="性别">
            <Select>
              <Select.Option value="M">男</Select.Option>
              <Select.Option value="F">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="address" label="住址">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default connect(({ current, loading }) => ({
  current,
  loading: loading.effects['current/addInitdata'] || false,
  // 这里先用 addInitdata做一个示例  接口请求的loading
}))(TableList);
