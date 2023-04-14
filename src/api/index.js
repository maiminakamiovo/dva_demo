
import { request } from "../axios";

export const getData = () => {
    return request.get(
      `https://mock.apifox.cn/m1/2333320-0-default/api/smartcity/list`
    );
  };