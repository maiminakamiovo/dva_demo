import { queryUser } from '../services/demo/user';

// yield put用于触发action
// yield call调用异步逻辑
// yield select 从state中获取数据  let values=yield select(state=>state.formCreationData)
// async 表示这是一个async函数 await只能用在这个函数里面
// await 表示在这里等待异步操作返回结果 再继续执行

export default {
  namespace: 'current',
  // namespace 命名空间应该唯一 在外部调用dispatch type   curent/xxx   xxx对应的方法名
  state: {
    name: 'wuqiying',
    age: 1,
    formCreationData: [], // 这里可以定义数据类型和数据名称/设置数据的初始值等
  },
  //effect 等同于action 用于和后台异步通讯 在yield call调取完后台接口之后  再通过 yield put 将返回的数据放到reducer中处理
  effects: {
    // queryUserfunc  页面调用的方法名
    // 示例
    // dispatch({
    //     type:"current/queryUserfunc"
    //     payload:{...},
    //     callback:res=>{}
    // })
    *queryUserfunc({ payload }, { call, put }) {
      // data是通过异步调取servser文件中的queryUser返回的数据
      // const { data } = yield call(queryUser, payload);
      // 在接受到数据之后放到reducer中去处理
      yield put({ type: 'queryUserSuccess', payload });
    },

    // 修改年龄
    *queryAgefunc({ payload }, { put }) {
      yield put({ type: 'queryAge', payload });
    },

    // 新增
    *addInitdata({ payload, callback }, { put }) {
      //这里没有后台 直接模拟一个 callback  创建成功~
      if (callback) callback({ code: 200 });
      yield put({ type: 'commingle', payload });
    },

    // 编辑
    *editInitdata({ payload, callback }, { put }) {
      if (callback) callback({ code: 200 });
      yield put({ type: 'editInitdataArray', payload });
    },

    // 删除
    *onDelect({ payload, callback }, { put }) {
      if (callback) callback({ code: 200 });
      yield put({ type: 'delect', payload });
    },
  },

  // reducers中用来处理数据
  // 这是一个同步的操作  用来接收新的payload 和修改老的state  在这里不能发送请求方法
  reducers: {
    queryUserSuccess(state, { payload }) {
      return {
        ...state,
        name: payload.name,
      };
    },

    queryAge(state, { payload }) {
      return {
        ...state,
        age: payload.age,
      };
    },

    // 新增
    commingle(state, { payload }) {
      let values = JSON.parse(JSON.stringify(state));
      values.formCreationData.push(payload);
      return {
        ...values,
      };
    },

    // 删除
    delect(state, { payload }) {
      let values = JSON.parse(JSON.stringify(state));
      let index = state.formCreationData.findIndex(
        (index) => index.id === payload.id,
      );
      values.formCreationData.splice(index, 1);
      return {
        ...values,
      };
    },

    // 编辑
    editInitdataArray(state, { payload }) {
      let values = JSON.parse(JSON.stringify(state));
      let index = state.formCreationData.findIndex(
        (index) => index.id === payload.id,
      );
      values.formCreationData[index] = payload;
      return {
        ...values,
      };
    },
  },
};
