const oracledb = require('oracledb');


// Database User
const user = 'pandemic';
// Database Password
const password = 'admin';
// Database ConnectString
const connectString = 'localhost:1521/orclpdb';

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
