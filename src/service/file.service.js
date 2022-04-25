const connection = require('../app/database')

class FileService{
  async createFlie(filename, mimetype, size, goodsId){
    const statement = `INSERT INTO pictures (filename, mimetype, size, goods_id) VALUES (?,?,?,?);`;
    const res = await connection.execute(statement,[filename, mimetype, size, goodsId]);
    return res[0];
  }

  async getFileByGoodsId(goodsId){
    const statement = `SELECT * FROM pictures WHERE goods_id = ?;`;
    const res = await connection.execute(statement,[goodsId]);
    return res[0];
  }

  async updateFile(filename, mimetype, size, goodsId){
    const statement = `UPDATE pictures SET filename = ?, mimetype = ?, size = ?
                        WHERE goods_id = ?;`;

    const res = await connection.execute(statement, [filename, mimetype, size, goodsId]);
    return res[0];
  }
}

module.exports = new FileService();