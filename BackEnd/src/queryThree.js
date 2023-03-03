const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryThree() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #3 : 	Show the name, last_name and address of the deceased victims with
				more than three associated people.
        */
        const result= await conn.execute(`SELECT VICTIM_NAME, VICTIM_LAST_NAME, VICTIM_DIRECTION
            FROM VICTIM
            INNER JOIN (
                SELECT VICTIM_ID
                FROM CONTACT
                GROUP BY VICTIM_ID
                HAVING COUNT(*) > 3
            ) alias ON VICTIM.VICTIM_ID = alias.VICTIM_ID
            WHERE DEATH_DATE IS NOT NULL`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Victim Name</th><th>Victim Last Name</th><th>Victim Direction</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";

        console.log('Query 3 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query One:', err);
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

module.exports = queryThree;