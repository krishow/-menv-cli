const db = require('../config/db')

module.exports.findByPage = (pageNumber, pageSize) => {
    let sql = 'select * from property limit ?,?';
    let data = [
        (pageNumber - 1) * pageSize, //第一个问号的值
        pageSize];
    return db.base(sql, data)
}

module.exports.findCount = () => {
    let sql = 'select count(*) as count from property';
    let data = []
    return db.base(sql, data)
}
module.exports.add = (info) => {
    let sql = 'insert into property values(id,?,?,?,?,?);'
    let data = [info.department, info.quantity, info.type, info.balance, info.date]
    return db.base(sql, data)
}


module.exports.deleteForIdBatch = (idList) => {
    let ids = '' // 初始化批量存储Id的字符串格式
    for (var i = 0; i < idList.length; i++) {
        ids += "'" + idList[i] + "'" + ','
    }
    ids = ids.substr(0, ids.length - 1) // ids减去最后一个逗号，多个逗号不符合SQL语法，会报错
    //const sql = "delete from user where id in(" + str + ")"; // in 是用来做批量删除的写法
    console.log(ids);
    // console.log(idList);
    let sql = "delete from property where id in(" + ids + ")"
    return db.base(sql, [])
}

module.exports.findById = (id) => {
    let sql = 'select * from property where id = ?';
    let data = [id];
    return db.base(sql, data)
}

module.exports.update = (info) => {
    let sql = 'update property set department=?,quantity=?, type= ?,balance=?,date=? where id = ?;'
    let data = [info.department, info.quantity, info.type, info.balance, info.date, info.id]
    return db.base(sql, data)
}