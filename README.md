# README

开始搭建服务
 1.在 src/servers 创建文件
  servers/XXX.JS 某一个模块的接口地址比如 productServers.js 这是源于商品类的请求方法 请求地址 userServer.js 这是关于用户类的请求方法

2.
 创建 Model.js productModel.js ...这里的model 等同于后台和页面展示的中间件
 数据池不同的父子组件可通过 connect 链接相同的 namespace 得到相同的数据

一个组件可以链接多个 namespace 数据池

export default connect(({ a,b }) => ({ a, b, }))(Index)

这里连接了 a 和 b 两个不同的 namespace 可以获取到两个数据池里的数据

loading: loading.effects['current/addInitdata'] || false,

可以用于页面的加载 loading 在请求 addInitdata 方式时会设置为 true 请求完之后则会设置为 false

3.页面的使用通过 dispatch({})来调取接口 
dispatch({ 
    type:"current/queryUserfunc",
    payload:{...},
    callback:res=>{}
 })

这里请求了 namespace 为 current 的 model 下的 queryUserfunc 方法
 type model/方法 
 payload 请求的数据 id 等.. 
 callback 请求之后的回调 可返回后台返回的数据
