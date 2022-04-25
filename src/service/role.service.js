const connection = require('../app/database')

class RoleService{
  async getIdByName(name){
    const statement = `SELECT id FROM role WHERE NAME = ?;`;
    const res = await connection.execute(statement, [name]);
    return res[0];
  }

  async createRole(name, intro){
    const statement = `INSERT INTO role (NAME, intro) VALUES (?,?);`;
    const res = await connection.execute(statement,[name,intro]);
    return res[0];
  }

  async createRoleMenu(roleId, menuIds){
    const statement = `INSERT INTO rolemenus (role_id, menu_id) VALUES (?,?);`;
    for(let i = 0; i < menuIds.length; i++){
      await connection.execute(statement,[roleId,menuIds[i]]);
    }
  }

  async deleteRole(id){
    const statement =  `DELETE FROM role WHERE id = ?;`
    await connection.execute(statement, [id]);
  }

  async getNameById(id){
    const statement = `SELECT name FROM role WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  async deleteOriginMenu(id){
    const statement = `DELETE FROM rolemenus WHERE role_id = ?`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  async updateRole(name, intro, id){
    const statement = `UPDATE role SET NAME = ?, intro = ? WHERE id = ?;`;
    const res = await connection.execute(statement, [name, intro, id]);
    return res[0];
  }

  async getRoleDetailById(id){
    const statement = `SELECT * FROM role WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  async getSearchList(Info){
    const { offset, size, name, intro , startTime, endTime} = Info;
    // console.log(userInfo);
    let res;
    //不包括时间查询的情况（因为在数据 ）
    if(startTime === '%'){
      const statement = `SELECT
                            r.id, r.name, r.createAt, r.updateAt,r.intro,
                            JSON_ARRAYAGG(rm.menu_id) menuList
                            FROM role r
                          LEFT JOIN rolemenus rm ON r.id = rm.role_id
                          WHERE r.name LIKE ?
                          AND r.intro LIKE ?
                          GROUP BY r.id
                          LIMIT ?,?`;
      res = await connection.execute(statement, [name, intro ,offset, size])
    }else
    {
      const statement = `SELECT
                          r.id, r.name, r.createAt, r.updateAt,r.intro,
                          JSON_ARRAYAGG(rm.menu_id) menuList
                          FROM role r
                          LEFT JOIN rolemenus rm ON r.id = rm.role_id
                          WHERE r.name LIKE ?
                          AND r.intro LIKE ?
                          AND createAt BETWEEN ? AND ?
                          GROUP BY r.id
                          LIMIT ?,?`;
      res = await connection.execute(statement, [name, intro, startTime, endTime,offset, size]);
    }
    return res[0];
  }

  async getRoleMenuById(id){
    const statement = `SELECT menu_id  menuId FROM rolemenus WHERE role_id = ?;`;
    const res = await connection.execute(statement,[id]);
    return res[0];
  }

}

module.exports = new RoleService();