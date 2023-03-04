const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function queryTen() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        /*
            Query #10 : Show the percentage of the most common physical contact of each
				hospital as follows: hospital name, name of the
				physical contact, percentage of victims.	
        */
        const result= await conn.execute(` SELECT HOSPITAL_NAME, PHYSICAL_CONTACT, PORCENTAJE_VICTIMAS
            FROM (
                SELECT 
                HOSPITAL.HOSPITAL_NAME, 
                CONTACT.PHYSICAL_CONTACT, 
                COUNT(*) * 100.0 / (
                    SELECT DISTINCT COUNT(*) 
                    FROM CONTACT 
                    INNER JOIN VICTIM ON VICTIM.VICTIM_ID = CONTACT.VICTIM_ID 
                    WHERE VICTIM.HOSPITAL_ID = VICTIM1.HOSPITAL_ID 
                ) AS PORCENTAJE_VICTIMAS,
                ROW_NUMBER() OVER (PARTITION BY HOSPITAL.HOSPITAL_NAME ORDER BY COUNT(*) DESC) AS RN
                FROM 
                VICTIM VICTIM1 
                INNER JOIN CONTACT ON CONTACT.VICTIM_ID = VICTIM1.VICTIM_ID 
                INNER JOIN HOSPITAL ON HOSPITAL.HOSPITAL_ID = VICTIM1.HOSPITAL_ID 
                GROUP BY 
                HOSPITAL.HOSPITAL_NAME, 
                CONTACT.PHYSICAL_CONTACT, 
                VICTIM1.HOSPITAL_ID
                ) 
            WHERE RN = 1`
        );

        // Commit to database
        await conn.commit();

        let html = "<html><body><table>";
        html += "<tr><th>Hospital Name</th><th>Physical Contact</th><th>Victims Percentage</th></tr>";

        for (const row of result.rows) {
            html += "<tr>";
            html += "<td>" + row[0] + "</td>";
            html += "<td>" + row[1] + "</td>";
            html += "<td>" + row[2] + "</td>";
            html += "</tr>";
        }

        html += "</table></body></html>";
        console.log('Query 10 completed successfully!!');
        // return query in html format
        return html;


    } catch (err) {
        console.error('Error In Query Ten:', err);
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

module.exports = queryTen;