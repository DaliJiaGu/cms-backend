const connection = require('../app/database')

class CategoryService{
  async createCategory(name){
    const statement =  `INSERT INTO category (NAME) VALUES (?);`;
    const res = await connection.execute(statement,[name]);
    return res[0]
  }
  async checkName(name){
    const statement = `SELECT * FROM category WHERE NAME = ?;`;
    const res = await connection.execute(statement,[name]);
    return res[0];
  }

  async deleteCategory(id){
    const statement = `DELETE FROM category WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  async updateCategory(name, id){
    const statement = `UPDATE category SET NAME = ? WHERE id = ?;`;
    const res = await connection.execute(statement, [name, id]);
    return res[0];
  }

  async getCategoryList(Info){
    const { offset, size, name,  startTime, endTime} = Info;
    // console.log(userInfo);
    let res;
    //不包括时间查询的情况（因为在数据 ）
    if(startTime === '%'){
      const statement = `SELECT * FROM category
                        WHERE NAME LIKE ?
                        LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, offset, size])
    }else
    {
      const statement = `SELECT * FROM category
                        WHERE NAME LIKE ?
                        AND createAt BETWEEN ? AND ?
                        LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, startTime, endTime,offset, size]);
    }
    return res[0];
  
  }
}

module.exports = new CategoryService();