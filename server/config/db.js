const mysql = require('mysql')

const base = function (sql, data) {
    return new Promise((resolve, reject) => {
        //连接对象
        const conn = mysql.createConnection({
            host: 'localhost', //数据库所在的的IP地址
            user: 'root', //登录数据库的帐号名
            password: '123456',  //登录数据库的密码
            database: 'test' //要连接的数据库名称
        })
        //打开连接
        conn.connect()
        //操作数据库(异步的 )
        conn.query(sql, data, function (error, results, fields) {
            if (error) reject(error)
            resolve(results)
        })
        //关闭数据库连接
        conn.end()
    })

}
exports.base = base