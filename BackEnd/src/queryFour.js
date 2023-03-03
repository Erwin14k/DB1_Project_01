const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryFour() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #4 : 	Show the first and last name of all victims in state
				"Suspended" who had physical contact of the "Kiss" type with more than
				2 of his associates.
        */
        const result= await conn.execute(`SELECT VICTIM_NAME, VICTIM_LAST_NAME
            FROM VICTIM
            INNER JOIN CONTACT
            ON VICTIM.VICTIM_ID = CONTACT.VICTIM_ID
            WHERE VICTIM_STATUS = 'Suspendida'
            AND CONTACT.PHYSICAL_CONTACT = 'Beso'
            GROUP BY VICTIM_NAME, VICTIM_LAST_NAME
            HAVING COUNT(DISTINCT CONTACT.ASSOCIATED_ID) > 2`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Victim Name</th><th>Victim Last Name</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";

        console.log('Query 4 completed successfully!!');
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

module.exports = queryFour;