//获取权限菜单
import {get} from '@/request/http.js';

const getAuthMenu = async () => {
  const response = await get('/menu/nav');
  if (response.code === 200){
      return response.data;
  }
  return null;
}


export {
    getAuthMenu
}