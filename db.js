const {Pool, Client} = require("pg");

const pool = new Pool({

    user: "postgres",
    password: "m7s5p2r5s2rPASSWORD321",
    host: "localhost",
    port: 5432,
    database: "thesupercoderdb"
});

module.exports = pool