import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {getData} from '../api'

export const useBearStore = create(
  subscribeWithSelector((set,get) => ({//subscribeWithSelector是监控器如果要使用subscribe，subscribe监控的状态必须是被subscribeWithSelector所包裹起来的
    data:[],
    isopen:false,
    xfsmart:[],
    down:()=>
    set((state)=>({isopen:state.isopen=false})),
    // asyncAdd: () => {  //异步写法
    //   setTimeout(() => {
    //     set((state) => ({ bear: state.bear + 1 }));
    //   }, 1000);  
    // },
    asyncData: async () => {   //异步请求数据写法
      const res = await getData()
      useBearStore.setState({xfsmart:res})
    },
  }))
);
