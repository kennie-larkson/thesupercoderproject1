const {Pool, Client} = require("pg")
const connectionString = "postgresql://postgres:m7s5p2r5s2rPASSWORD321@localhost:5432/postgres";

const pool = new Pool({
        connectionString: connectionString
})

pool.query('SELECT NOW()', (err,res)=>{
    console.log(err,res)
    pool.end()
})

const client = new Client({
    connectionString: connectionString
})

client.connect()

client.query('SELECT NOW()', (err,res)=>{
    console.log(err,res)
    client.end()
})


module.exports = {pool,client}