require('dotenv').config()
const userDB = process.env.BANCO_DADOS 
const senhaDB =process.env.BANCO_DADOS_SENHA

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://root:${senhaDB}@localhost:3306/${userDB}`);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
    
}

const selectCustomers = async(customer) => {
    const conn = await connect();
    const sql = 'SELECT * FROM clietes WHERE s_email_clientes = ? AND s_password_clientes = ?'
    const values = [customer.email, customer.senha];
    const [rows] = await conn.query(sql, values);
    return rows;
    console.log(customer)
}

const SuperCustomers = async(customer) => {
    const conn = await connect();
    const sql = 'SELECT * FROM clietes'
    const [rows] = await conn.query(sql);
    return rows;
    console.log(customer)
}

const insertCustomer = async(customer) => {
    const conn = await connect();
    const sql = 'INSERT INTO clietes(s_email_clientes,s_password_clientes) VALUES (?,?);';
    const values = [customer.email, customer.senha];
    return await conn.query(sql, values);
}


const updateCustomer = async(customer) => {
    const conn = await connect();
    const sql = 'UPDATE clietes SET s_password_clientes = ? WHERE i_id_clientes = ?;'
    const values = [customer.senha, customer.id]
    return await conn.query(sql, values);
}

const deleteCustomer = async(customer) => {
    const conn = await connect();
    const sql = 'DELETE FROM clietes WHERE i_id_clientes = ?;'
    const values = [customer.id]
    return await conn.query(sql, values);
}

module.exports = {insertCustomer, selectCustomers, updateCustomer, deleteCustomer, SuperCustomers}
