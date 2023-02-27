const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

// Function to empty the temporal table.
async function empyTemporal() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        try {
            const result = await conn.execute(`TRUNCATE TABLE TEMPORAL;`);
            await conn.commit();
        } catch (err) {
            console.error('Error emptying TEMPORAL table:', err);
        }
        console.log("TEMPORAL table flushed successfully.!!");

    } catch (err) {
        console.error(err);
    } finally {
        if (conn) {
        try {
            await conn.close();
        } catch (err) {
            console.error(err);
        }
        }
    }
}



module.exports = empyTemporal;
