
// 这个函数是为了在删除父级菜单的时候将其对应的所有子类菜单也删除
const service = require('../service/menu.service')
const getChildMenu = async  (parentId) => {
  const resIds = [Number(parentId)];

  const _getChild = async (id) => {
    const res = await service.getMenuSon(id);
    if (res.length > 0) {
      for( let item of res){
        resIds.push(item.id);
        await _getChild(item.id)
      }
    }
  }

  await _getChild(parentId);
  return resIds;
}
module.exports = {getChildMenu};