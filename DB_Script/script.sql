-- Temporal table creation.
CREATE TABLE TEMPORAL (
    VICTIM_NAME VARCHAR2(60) NULL,
    VICTIM_LAST_NAME VARCHAR2(60) NULL,
    VICTIM_DIRECTION VARCHAR2(100) NULL,
    FIRST_SUSPICION_DATE VARCHAR2(100) NULL,
    CONFIRMATION_DATE VARCHAR2(100) NULL,
    DEATH_DATE VARCHAR2(100) NULL,
    VICTIM_STATUS VARCHAR2(60) NULL,
    ASSOCIATED_NAME VARCHAR2(60) NULL,
    ASSOCIATED_LAST_NAME VARCHAR2(60) NULL,
    DATE_MET VARCHAR2(100) NULL,
    PHYSICAL_CONTACT VARCHAR2(60) NULL,
    START_CONTACT_DATE VARCHAR2(100) NULL,
    END_CONTACT_DATE VARCHAR2(100) NULL,
    HOSPITAL_NAME VARCHAR2(60) NULL,
    HOSPITAL_DIRECION VARCHAR2(100) NULL,
    VICTIM_UBICATION VARCHAR2(100) NULL,
    ARRIVAL_DATE VARCHAR2(100) NULL,
    LEFT_DATE VARCHAR2(100) NULL,
    TREATMENT VARCHAR2(60) NULL,
    EFECTIVITY NUMBER NULL,
    START_TREATMENT_DATE VARCHAR2(100) NULL,
    END_TREATMENT_DATE VARCHAR2(100) NULL,
    VICTIM_EFECTIVITY NUMBER NULL
);

-- Select all values on TEMPORAL table.
SELECT * FROM TEMPORAL;
--  Delete TEMPORAL table.
DROP TABLE TEMPORAL;
-- Truncate TEMPORAL table.
TRUNCATE TABLE TEMPORAL;


-- Hospital table creation.
CREATE TABLE HOSPITAL (
    HOSPITAL_ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    HOSPITAL_NAME VARCHAR2(50) NOT NULL,
    HOSPITAL_DIRECTION VARCHAR2(100) NOT NULL
);


-- Victim table creation.
CREATE TABLE VICTIM (
    VICTIM_ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    VICTIM_NAME VARCHAR2(50) NOT NULL,
    VICTIM_LAST_NAME VARCHAR2(50) NOT NULL,
    VICTIM_DIRECTION VARCHAR2(100) NOT NULL,
    VICTIM_STATUS VARCHAR2(20) NOT NULL,
    FIRST_SUSPICION_DATE DATE NOT NULL,
    CONFIRMATION_DATE DATE NOT NULL,
    DEATH_DATE DATE,
    HOSPITAL_ID NUMBER NOT NULL,
    CONSTRAINT FK_HOSPITAL
        FOREIGN KEY (HOSPITAL_ID)
        REFERENCES HOSPITAL(HOSPITAL_ID)
);

-- Associated table creation.
CREATE TABLE ASSOCIATED (
    ASSOCIATED_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    ASSOCIATED_NAME VARCHAR2(100) NOT NULL,
    ASSOCIATED_LAST_NAME VARCHAR2(100) NOT NULL
);

-- Contact table creation.
CREATE TABLE CONTACT (
    CONTACT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    VICTIM_ID NUMBER NOT NULL,
    ASSOCIATED_ID NUMBER NOT NULL,
    DATE_MET DATE NOT NULL,
    PHYSICAL_CONTACT VARCHAR2(10) NOT NULL,
    START_DATE_CONTACT DATE NOT NULL,
    END_DATE_CONTACT DATE NOT NULL,
    CONSTRAINT FK_VICTIM FOREIGN KEY (VICTIM_ID) REFERENCES VICTIM(VICTIM_ID),
    CONSTRAINT FK_ASSOCIATED FOREIGN KEY (ASSOCIATED_ID) REFERENCES ASSOCIATED(ASSOCIATED_ID)
);

-- Treatment table creation.
CREATE TABLE TREATMENT (
    TREATMENT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    TREATMENT_NAME VARCHAR2(100) NOT NULL,
    EFECTIVITY NUMBER NOT NULL
);

-- Treatment_Victim table creation.
CREATE TABLE TREATMENT_VICTIM (
    TREATMENT_VICTIM_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    TREATMENT_ID NUMBER NOT NULL,
    VICTIM_ID NUMBER NOT NULL,
    START_TREATMENT_DATE DATE NOT NULL,
    END_TREATMENT_DATE DATE NOT NULL,
    VICTIM_EFECTIVITY INT NOT NULL,
    CONSTRAINT FK_TREATMENT FOREIGN KEY (TREATMENT_ID) REFERENCES TREATMENT(TREATMENT_ID),
    CONSTRAINT FK_VICTIM_TREATMENT FOREIGN KEY (VICTIM_ID) REFERENCES VICTIM(VICTIM_ID)
);

-- Location table creation.
CREATE TABLE LOCATION (
    LOCATION_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    VICTIM_LOCATION VARCHAR2(200) NOT NULL,
    ARRIVAL_DATE DATE NOT NULL,
    LEFT_DATE DATE NOT NULL,
    HOSPITAL_ID NUMBER NOT NULL,
    VICTIM_ID NUMBER NOT NULL,
    CONSTRAINT FK_HOSPITAL_LOC FOREIGN KEY (HOSPITAL_ID) REFERENCES HOSPITAL(HOSPITAL_ID),
    CONSTRAINT FK_VICTIM_LOC FOREIGN KEY (VICTIM_ID) REFERENCES VICTIM(VICTIM_ID)
);
