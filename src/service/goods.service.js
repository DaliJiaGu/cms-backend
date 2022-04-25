const connection = require('../app/database')
// const sqlFrag = ''
class GoodsService{
  async createGoods(ctx){
    const { name, oldPrice,newPrice,desc,status,imgUrl,inventoryCount,saleCount,favorCount,address,categoryId } = ctx.request.body;
    const statement = `INSERT INTO goods 
                          (name, oldPrice, newPrice, goods_desc, goods_status, imgUrl, inventoryCount, saleCount,favorCount, address, category_id)
                          VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
    const res = await connection.execute(statement,[
      name,oldPrice,newPrice,desc,status,imgUrl,inventoryCount,saleCount,favorCount,address,categoryId
    ])
    return res[0];
  }

  async updateImgUrlById(imgUrl, id){
    const statement = `UPDATE goods SET imgUrl = ? WHERE id = ?;`;
    const res = await connection.execute(statement, [imgUrl, id]);
    return res[0];
  }


  async deleteGoods(id){
    const statement = `DELETE FROM goods WHERE id = ?;`;
    const res = await connection.execute(statement, [id]);
    return res[0];
  }

  async getGoodsList(Info){
    const { offset, size, name, status , startTime, endTime} = Info;
    // console.log(userInfo);
    let res;
    //不包括时间查询的情况（因为在数据 ）
    if(startTime === '%'){
      const statement = `SELECT id, name, oldPrice, newPrice, goods_desc 'desc', goods_status 'status', imgUrl, inventoryCount, saleCount,favorCount, address, category_id, createAt, updateAt FROM goods
                        WHERE NAME LIKE ?
                        AND goods_status LIKE ?
                        LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, status,offset, size])
    }else
    {
      const statement = `SELECT SELECT id, name, oldPrice, newPrice, goods_desc 'desc', goods_status 'status', imgUrl, inventoryCount, saleCount,favorCount, address, category_id, createAt, updateAt  FROM goods
                        WHERE NAME LIKE ?
                        AND goods_status LIKE ?
                        AND createAt BETWEEN ? AND ?
                        LIMIT ?, ?;`;
      res = await connection.execute(statement, [name, status, startTime, endTime,offset, size]);
    }
    return res[0];
  
  }

  async getCategoryCount(){
    const statement = `
                      SELECT category.id, category.name, 
                      (SELECT COUNT(*) FROM goodsCategory WHERE category.id = goodsCategory.category_id) goodsCount
                      FROM category;`;
    const res = await connection.execute(statement);
    return res[0];
  }

  async getGoodsIdByName(name){
    const statement = `SELECT id FROM goods WHERE NAME = ?;`;
    const res = await connection.execute(statement, [name]);
    return res[0]
  }

  async createGoodsCategory(goodsId, categoryId){
    const statement = `INSERT INTO goodsCategory (goods_id, category_id) VALUES (?,?);`;
    const res = await connection.execute(statement, [goodsId, categoryId]);
    return res[0];
  }

  async getCategorySale(){
    const statement = `SELECT category.id, category.name, 
                      (SELECT SUM(saleCount) FROM goods WHERE goods.category_id = category.id)goodsCount
                      FROM category;`;
    const res = await connection.execute(statement);
    return res[0];
  }
  async getCategoryFavor(){
    const statement = `SELECT category.id, category.name, 
    (SELECT SUM(favorCount) FROM goods WHERE goods.category_id = category.id)goodsFavor
    FROM category;`;
    const res = await connection.execute(statement);
    return res[0];
  }

  async getAddressSale(){
    const statement = `SELECT address, SUM(saleCount)'count' FROM goods GROUP BY address;`;
    const res = await connection.execute(statement);
    return res[0];
  }

  async getAmount(){
    const statement = `SELECT amount, title, tips, subtitle, number1, number2 FROM amountList;`;
    const res = await connection.execute(statement);
    return res[0];
  }
}

module.exports = new GoodsService();