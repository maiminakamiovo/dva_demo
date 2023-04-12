import React, { Component, useEffect } from 'react';
import { connect } from 'umi';
import { Button, Card } from 'antd';

// class写法

// @connect(({ current }) => ({
//     current
// }))

// export default class Index extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <div>{this.props.user.name}</div>;
//     }
// }

// hooks写法
function Index(props) {
  const { current: { name, age } = {}, dispatch } = props;
  useEffect(() => {
    changeInitialNam();
  }, []);

  const changeInitialNam = (values) => {
    dispatch({
      type: 'current/queryUserfunc',
      payload: {
        name: '吴麒颖',
      },
    });
  };

  const changeAge = (value, type) => {
    dispatch({
      type: 'current/queryAgefunc',
      payload: {
        age: type === 'Increase' ? value - 1 : value + 1,
      },
    });
  };

  return (
    <Card>
      <div>姓名:{name}</div>
      <div>年龄:{age}</div>
      <Button onClick={() => changeAge(age, 'Increase')}>减一岁</Button>
      <Button onClick={() => changeAge(age, 'decrease')}>加一岁</Button>
    </Card>
  );
}

export default connect(({ current }) => ({
  current,
}))(Index);
