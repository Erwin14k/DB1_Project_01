const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryEight() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #8 : 	Show the month number of the date of the first suspicion,
				name and surname of the victims who received the most treatments
				applied and those that less. (All in the same query).
        */
        const result= await conn.execute(`SELECT 
            TO_CHAR(FIRST_SUSPICION_DATE, 'MM') AS MONTH,
            V.VICTIM_NAME,
            V.VICTIM_LAST_NAME,
            COUNT(TV.TREATMENT_ID) AS TREATMENT_COUNT
            FROM VICTIM V
            LEFT JOIN TREATMENT_VICTIM TV ON V.VICTIM_ID = TV.VICTIM_ID
            GROUP BY TO_CHAR(FIRST_SUSPICION_DATE, 'MM'), V.VICTIM_NAME, V.VICTIM_LAST_NAME
            HAVING COUNT(TV.TREATMENT_ID) = (SELECT MAX(TREATMENT_COUNT) FROM (
                SELECT COUNT(TREATMENT_ID) AS TREATMENT_COUNT
                FROM TREATMENT_VICTIM
                GROUP BY VICTIM_ID))
            OR COUNT(TV.TREATMENT_ID) = (SELECT MIN(TREATMENT_COUNT) FROM (
                SELECT COUNT(TREATMENT_ID) AS TREATMENT_COUNT
                FROM TREATMENT_VICTIM
                GROUP BY VICTIM_ID))
            ORDER BY TREATMENT_COUNT DESC`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Month</th><th>Victim Name</th><th>Victim Last Name</th><th>Treatment Count</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "<td>" + row[3] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";
        console.log('Query 8 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query Eight:', err);
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

module.exports = queryEight;