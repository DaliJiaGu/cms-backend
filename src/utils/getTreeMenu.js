const menuService = require('../service/menu.service')

const getTreeMenu = (rootList, id, list) =>{

  // 1. 在rootlist（所有的数据）中寻找同一个parentId的数据
  for(let i = 0; i < rootList.length; i++){
    let item = rootList[i];
    if (item.parentId == id) {
      // list = [];
      list.push(item)
    }
  }

  // 2. 查看在list的数据中有没有子元素,也就是递归调用然后将同级别的元素放在children中
  list.map(item => {
    item.children = [];
    getTreeMenu(rootList, item.id, item.children);
    if (item.children.length == 0) {
      item.children = null;
    }
  })
  return list;
}

const getMenuByIds =async (ctx, menuIds) => {
  
    // 对menuIds遍历拿到每个id请求数据
    const rootList = [];
    for(const item of menuIds){
      const res = await menuService.getMenuDetail(item);
      rootList.push(res[0]);
    }
    try {
      if (rootList[0]) {
        const childTree =  getTreeMenu(rootList,null,[]);
        ctx.menuList.push(childTree)
      }else{
        ctx.menuList.push(null);
      }

    } catch (error) {
      console.log(error);
      ctx.fail();
    }
}
module.exports = { getTreeMenu, getMenuByIds }