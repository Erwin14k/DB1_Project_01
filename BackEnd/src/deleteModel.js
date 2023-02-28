const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function deleteModel() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });
        
        // Drop CONTACT Table
        await conn.execute(`DROP TABLE CONTACT`);
        // Drop TREATMENT_VICTIM Table
        await conn.execute(`DROP TABLE TREATMENT_VICTIM`);
        // Drop LOCATION Table
        await conn.execute(`DROP TABLE LOCATION`);
        // Drop TREATMENT Table
        await conn.execute(`DROP TABLE TREATMENT`);
        // Drop ASSOCIATED Table
        await conn.execute(`DROP TABLE ASSOCIATED`);
        // Drop VICTIM Table
        await conn.execute(`DROP TABLE VICTIM`);
        // Drop HOSPITAL Table
        await conn.execute(`DROP TABLE HOSPITAL`);

        // Commit to database
        await conn.commit();
        console.log('Model Tables Deleted Successfully!');

    } catch (err) {
        console.error('Error Deleting Model Tables:', err);
    } finally {
        if (conn) {
        try {
            await conn.close();
        }catch (err) {
            console.error(err);
        }
        }
    }
}

module.exports = deleteModel;