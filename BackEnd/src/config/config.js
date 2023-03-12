const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    server: {
        port: process.env.SERVER_PORT,
    },
    oracle: {
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNSTR,
    },
};

