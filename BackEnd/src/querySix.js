const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function querySix() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #6 : 	Show first name, last name, and date of death for all
				victims who moved through the address “1987 Delphine Well” to the
				which were applied "Management of blood pressure" as treatment.
        */
        const result= await conn.execute(`SELECT VICTIM_NAME, VICTIM_LAST_NAME, DEATH_DATE
            FROM VICTIM 
            JOIN TREATMENT_VICTIM ON VICTIM.VICTIM_ID = TREATMENT_VICTIM.VICTIM_ID
            JOIN TREATMENT ON TREATMENT_VICTIM.TREATMENT_ID = TREATMENT.TREATMENT_ID
            JOIN LOCATION ON VICTIM.VICTIM_ID = LOCATION.VICTIM_ID
            WHERE 
                LOCATION.VICTIM_LOCATION = '1987 Delphine Well' AND 
                TREATMENT.TREATMENT_NAME = 'Manejo de la presion arterial'`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Victim Name</th><th>Victim Last Name</th><th>Death Date</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";
        console.log('Query 6 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query Six:', err);
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

module.exports = querySix;