const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryOne() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #1 : 	Show the name of the hospital, its address and the number of deaths
                        for each registered hospital.
        */
        const result= await conn.execute(`SELECT h.HOSPITAL_NAME, h.HOSPITAL_DIRECTION, COUNT(v.DEATH_DATE) AS NUM_OF_DEATHS
            FROM HOSPITAL h
            LEFT JOIN VICTIM v ON h.HOSPITAL_ID = v.HOSPITAL_ID AND v.DEATH_DATE IS NOT NULL
            GROUP BY h.HOSPITAL_ID, h.HOSPITAL_NAME, h.HOSPITAL_DIRECTION
            ORDER BY NUM_OF_DEATHS DESC`
        );
        // Commit to database
        await conn.commit();
        
        let html = "<html><body><table>";
        html += "<tr><th>Hospital Name</th><th>Address</th><th>Number of Deaths</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "</tr>";
        }
        html += "</table></body></html>";
        console.log('Query 1 completed successfully!!');
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

module.exports = queryOne;