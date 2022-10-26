const express = require('express')
const propertyRouter = express.Router()
const propertyModel = require('../models/propertyModel')


propertyRouter.get('/findByPage/:pageNumber/:pageSize', (req, res) => {
    let pageSize = Number(req.params.pageSize);
    let pageNumber = Number(req.params.pageNumber);
    // console.log(pageSize, pageNumber);
    propertyModel.findCount().then(count => {
        // console.log(count);
        let pageCount = Math.ceil(count[0].count / pageSize);
        let total = count[0].count
        propertyModel.findByPage(pageNumber, pageSize).then(value => {
            if (value.length > 0) {
                res.send({
                    status: 200,
                    data: value,
                    pageSize,
                    pageNumber,
                    pageCount,
                    total

                })
            } else {
                res.send({
                    status: 200,
                    message: '该页无数据',
                    pageSize,
                    pageNumber,
                    pageCount
                })
            }

        }).catch(err => {
            res.send({
                status: 0,
                msg: '查询错误',
                err
            });
        })
    })

})

propertyRouter.post('/add', (req, res) => {

    let info = JSON.parse(req.body.info)
    info.date = new Date(info.date).toLocaleString('zn-Ch', { hour12: false }).replaceAll('/', '-')

    propertyModel.add(info).then(result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                message: '添加成功'
            })
        } else {
            res.send({
                status: 0,
                message: '添加失败'
            })
        }
    }).catch(err => {
        res.send({
            status: 0,
            msg: '添加错误',
            err
        });
    })
})


propertyRouter.post('/deleteForIdBatch', (req, res) => {

    // console.log(typeof req.body.idList);
    let idList = req.body.idList
    console.log(idList);
    console.log(typeof idList);

    propertyModel.deleteForIdBatch(idList).then(result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                message: '删除成功'
            })
        } else {
            res.send({
                status: 0,
                message: '删除失败'
            })
        }
    }).catch(err => {
        res.send({
            status: 0,
            msg: '删除错误',
            err
        });
    })
})

propertyRouter.get('/findById/:id', (req, res) => {
    let id = req.params.id
    propertyModel.findById(id).then(value => {
        if (value.length > 0) {
            res.send({
                status: 200,
                data: value,
            })
        } else {
            res.send({
                status: 200,
                msg: '查不到此id的信息'
            })
        }

    }).catch(err => {
        res.send({
            status: 0,
            msg: '查询错误',
            err
        });
    })

})

propertyRouter.post('/update', (req, res) => {
    let info = JSON.parse(req.body.info)
    info.date = new Date(info.date).toLocaleString('zn-Ch', { hour12: false }).replaceAll('/', '-')

    propertyModel.update(info).then(value => {
        if (value.length > 0) {
            res.send({
                status: 200,
                message: '修改成功'
            })
        } else {
            res.send({
                status: 200,
                message: '修改失败'
            })
        }

    }).catch(err => {
        res.send({
            status: 0,
            msg: '修改错误',
            err
        });
    })

})


module.exports = propertyRouter
