const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryTwo() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #2 : 	Show the first name, last name of all quarantined victims who
				presented an effectiveness greater than 5 in the treatment
				"Blood transfusions".
        */
        const result= await conn.execute(`SELECT v.VICTIM_NAME, v.VICTIM_LAST_NAME
            FROM VICTIM v
            JOIN TREATMENT_VICTIM tv ON v.VICTIM_ID = tv.VICTIM_ID
            JOIN TREATMENT t ON tv.TREATMENT_ID = t.TREATMENT_ID
            WHERE v.VICTIM_STATUS = 'En cuarentena'
            AND t.TREATMENT_NAME = 'Transfusiones de sangre'
            AND tv.VICTIM_EFECTIVITY > 5`
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
        console.log('Query 2 completed successfully!!');
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

module.exports = queryTwo;