const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queySeven() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #7 : Show first name, last name and address of the victims who have less
				of 2 associateds who have been in a hospital and who were only two treatments 
                have been applied.	
        */
        const result= await conn.execute(`SELECT V.VICTIM_NAME, V.VICTIM_LAST_NAME, V.VICTIM_DIRECTION
            FROM VICTIM V
            WHERE V.VICTIM_ID IN (
                SELECT TV.VICTIM_ID
                FROM TREATMENT_VICTIM TV
                GROUP BY TV.VICTIM_ID
                HAVING COUNT(DISTINCT TV.TREATMENT_ID) = 2
            ) AND V.VICTIM_ID NOT IN (
                SELECT DISTINCT C1.VICTIM_ID
                FROM CONTACT C1
                JOIN VICTIM V1 ON C1.ASSOCIATED_ID = V1.VICTIM_ID
                JOIN VICTIM V2 ON C1.VICTIM_ID = V2.VICTIM_ID AND V1.VICTIM_NAME = V2.VICTIM_NAME AND V1.VICTIM_LAST_NAME = V2.VICTIM_LAST_NAME
                GROUP BY C1.VICTIM_ID, C1.ASSOCIATED_ID
                HAVING COUNT(DISTINCT V2.VICTIM_ID) > 2
                )ORDER BY V.VICTIM_NAME, V.VICTIM_LAST_NAME`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Victim Name</th><th>Victim Last Name</th><th>Victim Address</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";
        console.log('Query 7 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query Seven:', err);
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

module.exports = queySeven;