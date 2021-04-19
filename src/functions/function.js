let express = require("express");
var mysql = require('mysql');
var options = require('./../../config/database');
var con = mysql.createConnection(options);
let handleData = async (name, data, datatype) => {
    let resultf = `CREATE TABLE ${name} ( id int NOT NULL PRIMARY KEY AUTO_INCREMENT,`;
    let i = 0;
    let length = data.length;
    while (i < length) {
        if (i !== length - 1) {
            resultf = resultf + data[i] + ' ' + datatype[i] + ',';
            i = i + 1;
        } else {
            resultf = resultf + data[i] + ' ' + datatype[i] + ');';
            break;
        }
    }
    console.log('hd', resultf);
    return resultf;
};
let create = async (sql) => {
    try {
        let resultf = await con.query(sql);
        return resultf;
    } catch (error) {
        console.log('loi',error);
        return res.status(500).send({status: 500, message: 'lỗi server', error: true});
    }
};

module.exports = {handleData,create};
