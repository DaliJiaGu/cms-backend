const connection = require('../app/database')

class DepartmentService{
  async getDepartmentName(name){
    const statement = `SELECT * FROM department WHERE NAME = ?;`
    const res = await connection.execute(statement,[name]);
    return res[0];
  }

  async create(department){
    const {name, parentId, leader} = department;
    const statement = `INSERT INTO department (NAME, leader, parent_id) VALUES (?,?,?);`;
    const res = await connection.execute(statement, [name, leader, parentId])
    return res[0];
  }

  async deleteDepartment(id){
    const statement = `DELETE FROM department WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res;
  }

  async getNameById(id){
    const statement = `SELECT name FROM department WHERE id = ?;`
    const res = await connection.execute(statement,[id]);
    return res[0];
  }

  // 修改部门信息
  async updateDepartment(id, Info){
    const {name, parentId, leader} = Info;
    const statement = `UPDATE department SET NAME = ?, leader = ?, parent_id = ? WHERE id = ?;`
    const res = await connection.execute(statement,[name, leader,parentId,id]);
    return res[0];
  }

  // 根据部门id获取部门详情
  async getDepartmentDetail(id){
    const statement = `SELECT id, name, leader, parent_Id parentId, createAt, updateAt FROM department WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0]
  }

  // 根据搜索框内容获取数据
  async getDepartmentList(Info){
    const { offset, size, name, leader , startTime, endTime} = Info;
    // console.log(userInfo);
    let res;
    //不包括时间查询的情况（因为在数据 ）
    if(startTime === '%'){
        const statement = `SELECT id, name, leader, 
                              (SELECT name FROM department d2 WHERE d1.parent_id = d2.id )parentId, 
                              createAt, updateAt FROM department d1
                              WHERE d1.name LIKE ?
                              AND d1.leader LIKE ?
                              LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, leader,offset, size])
    }else
    {
      const statement = `SELECT id, name, leader, 
                            (SELECT NAME FROM department d2 WHERE d1.parent_id = d2.id )parentId, 
                            createAt, updateAt FROM department d1
                            WHERE d1.name LIKE ?
                            AND d1.leader LIKE ?
                            AND createAt BETWEEN ? AND ?
                            LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, leader, startTime, endTime,offset, size]);
    }
    return res[0];
  
  }
}
module.exports = new DepartmentService();