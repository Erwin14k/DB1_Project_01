const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryNine() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #9 : 	Show the percentage of victims that correspond to each
				hospital.
        */
        const result= await conn.execute(`SELECT 
            H.HOSPITAL_NAME, 
            COUNT(V.VICTIM_ID) * 100 / (SELECT COUNT(*) FROM VICTIM WHERE HOSPITAL_ID IS NOT NULL) AS PERCENTAGE 
            FROM 
            HOSPITAL H 
            LEFT JOIN VICTIM V ON H.HOSPITAL_ID = V.HOSPITAL_ID 
            WHERE 
                V.HOSPITAL_ID IS NOT NULL
            GROUP BY 
                H.HOSPITAL_NAME 
            ORDER BY 
                PERCENTAGE DESC, H.HOSPITAL_NAME ASC`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Hospital</th><th>Percentage</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";
        console.log('Query 9 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query Nine:', err);
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

module.exports = queryNine;