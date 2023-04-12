import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import { connect } from 'umi';

const AccessPage = (props) => {
  const { dispatch, current: { name, age } = {} } = props;
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
      {name}的年龄是{age}岁
    </PageContainer>
  );
};

export default connect(({ current }) => ({
  current,
}))(AccessPage);
