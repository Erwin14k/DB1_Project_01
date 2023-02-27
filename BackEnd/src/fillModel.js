const oracledb = require('oracledb');
const { oracle } = require('./config/config');
// Database User
const user = oracle.user;
// Database Password
const password = oracle.password;
// Database ConnectString
const connectString = oracle.connectString;

async function fillModel() {
    let conn;
    try {
        conn = await oracledb.getConnection({
        user: user,
        password: password,
        connectString: connectString
        });

        // Creating HOSPITAL table
        await conn.execute(`CREATE TABLE HOSPITAL (
        HOSPITAL_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        HOSPITAL_NAME VARCHAR2(100) NOT NULL,
        HOSPITAL_DIRECTION VARCHAR2(200) NOT NULL
        )`);

        // Creating VICTIM table
        await conn.execute(`CREATE TABLE VICTIM (
        VICTIM_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        VICTIM_NAME VARCHAR2(100) NOT NULL,
        VICTIM_LAST_NAME VARCHAR2(100) NOT NULL,
        VICTIM_DIRECTION VARCHAR2(200) NOT NULL,
        VICTIM_STATUS VARCHAR2(50) NOT NULL,
        FIRST_SUSPICION_DATE DATE NOT NULL,
        CONFIRMATION_DATE DATE NOT NULL,
        DEATH_DATE DATE,
        HOSPITAL_ID NUMBER NOT NULL,
        CONSTRAINT FK_HOSPITAL FOREIGN KEY (HOSPITAL_ID) REFERENCES HOSPITAL(HOSPITAL_ID)
        )`);

        // Creating ASSOCIATED table
        await conn.execute(`CREATE TABLE ASSOCIATED (
        ASSOCIATED_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        ASSOCIATED_NAME VARCHAR2(100) NOT NULL,
        ASSOCIATED_LAST_NAME VARCHAR2(100) NOT NULL
        )`);

        // Creating CONTACT table
        await conn.execute(`CREATE TABLE CONTACT (
        CONTACT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        VICTIM_ID NUMBER NOT NULL,
        ASSOCIATED_ID NUMBER NOT NULL,
        DATE_MET DATE NOT NULL,
        PHYSICAL_CONTACT VARCHAR2(10) NOT NULL,
        START_DATE_CONTACT DATE NOT NULL,
        END_DATE_CONTACT DATE NOT NULL,
        CONSTRAINT FK_VICTIM FOREIGN KEY (VICTIM_ID) REFERENCES VICTIM(VICTIM_ID),
        CONSTRAINT FK_ASSOCIATED FOREIGN KEY (ASSOCIATED_ID) REFERENCES ASSOCIATED(ASSOCIATED_ID)
        )`);

        // Creating TREATMENT table
        await conn.execute(`CREATE TABLE TREATMENT (
        TREATMENT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        TREATMENT_NAME VARCHAR2(100) NOT NULL,
        EFECTIVITY NUMBER NOT NULL
        )`);

        // Creating TREATMENT_VICTIM table
        await conn.execute(`CREATE TABLE TREATMENT_VICTIM (
        TREATMENT_VICTIM_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        TREATMENT_ID NUMBER NOT NULL,
        VICTIM_ID NUMBER NOT NULL,
        START_TREATMENT_DATE DATE NOT NULL,
        END_TREATMENT_DATE DATE NOT NULL,
        VICTIM_EFECTIVITY INT NOT NULL,
        CONSTRAINT FK_TREATMENT FOREIGN KEY (TREATMENT_ID) REFERENCES TREATMENT(TREATMENT_ID),
        CONSTRAINT FK_VICTIM2 FOREIGN KEY (VICTIM_ID) REFERENCES VICTIM(VICTIM_ID)
        )`);

        // Creating LOCATION table
        await conn.execute(`CREATE TABLE LOCATION (
            LOCATION_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            VICTIM_LOCATION VARCHAR2(200) NOT NULL,
            ARRIVAL_DATE DATE NOT NULL,
            LEFT_DATE DATE NOT NULL,
            HOSPITAL_ID NUMBER NOT NULL,
            VICTIM_ID NUMBER NOT NULL,
            CONSTRAINT FK_HOSPITAL_LOC FOREIGN KEY (HOSPITAL_ID) REFERENCES HOSPITAL(HOSPITAL_ID),
            CONSTRAINT FK_VICTIM_LOC FOREIGN KEY (VICTIM_ID) REFERENCES VICTIM(VICTIM_ID)
            )`);

        await conn.execute(`INSERT INTO HOSPITAL (HOSPITAL_NAME, HOSPITAL_DIRECTION)
        SELECT DISTINCT HOSPITAL_NAME, HOSPITAL_DIRECION
        FROM TEMPORAL
        WHERE HOSPITAL_NAME IS NOT NULL AND HOSPITAL_DIRECION IS NOT NULL
        AND NOT EXISTS (
            SELECT 1 FROM HOSPITAL WHERE HOSPITAL.HOSPITAL_NAME = TEMPORAL.HOSPITAL_NAME
        )`);

        await conn.commit();
        console.log('Model Tables Created Successfully!');

    } catch (err) {
        console.error('Error Creating Model Tables:', err);
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

module.exports = fillModel;