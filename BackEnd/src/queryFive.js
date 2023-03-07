const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queyFive() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #5 : 	Top 5 victims who have applied the most treatments of the
				“Oxygen” treatment.
        */
        const result= await conn.execute(`SELECT v.VICTIM_ID ,v.VICTIM_NAME, v.VICTIM_LAST_NAME, COUNT(tv.TREATMENT_VICTIM_ID) AS NUM_TREATMENTS
            FROM VICTIM v
            JOIN TREATMENT_VICTIM tv ON v.VICTIM_ID = tv.VICTIM_ID
            JOIN TREATMENT t ON tv.TREATMENT_ID = t.TREATMENT_ID
            WHERE t.TREATMENT_NAME = 'Oxigeno'
            GROUP BY v.VICTIM_ID,v.VICTIM_NAME, v.VICTIM_LAST_NAME
            ORDER BY v.VICTIM_NAME, v.VICTIM_LAST_NAME, NUM_TREATMENTS DESC
            FETCH FIRST 5 ROWS ONLY`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Victim Id</th><th>Victim Name</th><th>Victim Last Name</th><th>Num Treatments</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "<td>" + row[3] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";
        console.log('Query 5 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query Five:', err);
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

module.exports = queyFive;