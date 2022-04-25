const connection = require('../app/database')
const sqlFrag = 'id, name, realname, cellphone, enable, department_id departmentId, role_id roleId, createAt, updateAt';

class userService{
  
  async createUser(user){
    // 将用户信息写入数据库
    const {name, password,realname,cellphone,departmentId,roleId } = user;
    const statement = `INSERT INTO users 
                        (NAME, PASSWORD, realname, cellphone, ENABLE, department_id, role_id) 
                        VALUES (?,?,?,?,?,?,?);`;
    const result = await connection.execute(statement, [name, password,realname,cellphone,1,departmentId,roleId])

    return result[0];
  }

  async getUserByName(name){
    const statement = `SELECT * FROM users WHERE NAME = ?;`;
    const result = await connection.execute(statement,[name])
    // console.log(result[0]);
    return result[0]
  }

  async getUserById(userId){
    const statement = `SELECT ${sqlFrag} FROM users  WHERE id = ?;`;
    const result = await connection.execute(statement, [userId]);
    return result[0]
  }

  async deleteUser(id){
    const statement = `DELETE FROM users WHERE id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result;
  }

  async updateUser(user,userId){
    const {name,realname,cellphone,departmentId,roleId } = user;
    const statement = `UPDATE users SET 
                        NAME = ?, realname = ?, cellphone = ?, department_id = ?, role_id = ? 
                        WHERE id = ?;`;
    const res = await connection.execute(statement,[name,realname,cellphone,departmentId,roleId,userId ]);
    return res;
  }

  async getUserDetail(userId){
    const statement = `SELECT 
                        users.id, users.name, users.realname, users.cellphone, users.enable,users.createAt,users.updateAt, 
                        JSON_OBJECT('id',d.id, 'name', d.name, 'leader',d.leader, 'createAt',d.createAt, 'updateAt',d.updateAt,'parentId',d.parent_id) department,
                        JSON_OBJECT('id',r.id, 'name', r.name, 'intro',r.intro, 'createAt',d.createAt, 'updateAt',d.updateAt) role
                      FROM users  
                      LEFT JOIN department d ON users.department_id = d.id
                      LEFT JOIN role r ON users.role_id = r.id
                      WHERE users.id = ?;`;

    const res = await connection.execute(statement, [userId]);
    return res[0]
  }
  async getUserList(){
    const statement = `SELECT name, realname, cellphone, enable, department_id departmentId, role_id roleId FROM users`;
    const res = await connection.execute(statement);
    return res[0];
  }

  async getSearchOfUser(userInfo){
    const { offset, size, name, cellphone, realname, enable, startTime, endTime} = userInfo;
    console.log(userInfo);
    let res;
    //不包括时间查询的情况（因为在数据 ）
    if(startTime === '%'){
      const statement = `SELECT ${sqlFrag} FROM users
                        WHERE NAME LIKE ?
                        AND cellphone LIKE ?
                        AND realname LIKE ?
                        AND ENABLE LIKE ?
                        LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, cellphone, realname, enable ,offset, size])
    }else
    {
      const statement = `SELECT ${sqlFrag} FROM users
                        WHERE NAME LIKE ?
                        AND cellphone LIKE ?
                        AND realname LIKE ?
                        AND ENABLE LIKE ?
                        AND createAt BETWEEN ? AND ?
                        LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, cellphone, realname, enable, startTime, endTime,offset, size]);
    }
    return res[0];
  }
}

module.exports = new userService()