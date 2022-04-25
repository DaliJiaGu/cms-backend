const connection = require('../app/database');
const sqlFrag = 'id, url,name , icon,type, createAt, updateAt, parent_id parentId, permission';
class MenuService{
  async getMenuByName(name){
    const statement = `SELECT * FROM menu WHERE NAME = ?;`;
    const res = await connection.execute(statement,[name]);
    return res[0]
  }

  async createMenu(menuInfo){
    let { name, type, icon, parentId, url, permission } = menuInfo;
    // icon = icon || '';
    // parentId = parentId || null;
    // url = url || '';
    // permission = permission || '';
    const statement = `INSERT INTO menu (NAME, TYPE, icon, parent_id, url, permission) 
                          VALUES (?,?,?,?,?,?);`;
    const res = await connection.execute(statement, [name, type, icon,parentId, url, permission]);
    return res[0];
  }

  async getMenuSon(id){
    const statement = `SELECT id FROM menu WHERE parent_id = ?;`;
    const res = await connection.execute(statement,[id]);
    return res[0];
  }

  // 根据id删除菜单
  async deleteMenuById(id){
    const statement = `DELETE FROM menu WHERE id = ?;`
    const res = await connection.execute(statement, [id]);
    return res[0]
  }

  // 修改菜单信息
  async updateMenu(menuInfo,menuId){
    const { name, type, icon, parentId, url, permission } = menuInfo;
    const statement = `UPDATE menu SET 
                        NAME = ?, TYPE = ?, icon = ?, parent_id = ?, url = ?, permission = ?
                        WHERE id = ?;`;
    const res = await connection.execute(
      statement, 
      [name, type, icon, parentId, url, permission, menuId]
      );
  }

  // 根据id获取menu的名称
  async getMenuNameById(id){
    const statement = `SELECT name FROM menu WHERE id = ?;`;
    const res = await connection.execute(statement,[id]);
    return res[0][0];
  }

  async getMenuDetail(id){
    const statement = `SELECT ${sqlFrag} FROM menu WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  // async getMenuList(){
  //   console.log(1);
  //   const statement =  `SELECT m1.id , m1.name, m1.type, m1.url, m1.icon, m1.createAt, m1.updateAt, 
  //                           JSON_ARRAYAGG(JSON_OBJECT
  //                           ('id',m2.id, 'name', m2.name,'url',m2.url, 'type',m2.type,'createAt',m2.createAt,'updateAt',m2.updateAt,'parentId',m2.parent_id))
  //                           children
  //                           FROM menu m1 LEFT JOIN menu m2
  //                           ON m1.id = m2.parent_id
  //                           WHERE m2.id != 'null'
  //                           GROUP BY m1.id;`;

  //   const res = await connection.execute(statement);
  //   console.log(res);
  //   return res[0];
  // }

  async getRootList(){
    const statement = `SELECT ${sqlFrag} FROM menu;`;
    const res = await connection.execute(statement);
    return res[0];
  }

  async updateSuperMangerMenu(id){
    const statement = `INSERT INTO rolemenus(role_id,menu_id) 
                        SELECT ?, m.id FROM menu m
                        WHERE NOT EXISTS
                        (SELECT * FROM rolemenus 
                          WHERE rolemenus.menu_id = m.id 
                          AND rolemenus.role_id = ?);`;

    const res = await connection.execute(statement,[id,id]);
    return res[0]
  }
}

module.exports = new MenuService();