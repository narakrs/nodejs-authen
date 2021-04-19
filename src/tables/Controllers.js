let dbtb = require('./../../Model/tableModel');
let {handleData, create} = require('./../functions/function');
let createTable = async (req, res, next) => {
    let {name, data, datatype} = req.body;
    console.log('name', name);
    try {
        let tables = await dbtb.Table.create({name});
        let sql = await handleData(name, data, datatype);
        let table = await create(sql);
        return res.status(200).send({status: 200, message: 'Tạo Thành Công', error: false});
    } catch (error) {
        return res.status(500).send({status: 500, message: 'lỗi server', error: true});
    }
};
let getAllTable = async (req, res, next) => {
    try {
        let data = await dbtb.Table.findAll({});
        return res.status(200).send({status: 200, message: 'Thành Công',error: false,data});
    } catch (error) {
        return res.status(500).send({status: 500, message: 'lỗi server', error: true});
    }
};
module.exports = {
    createTable,getAllTable
};
