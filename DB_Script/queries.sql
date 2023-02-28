    
/*
 * Query #1 : 	Show the name of the hospital, its address and the number of deaths
				for each registered hospital.
 * */
SELECT h.HOSPITAL_NAME, h.HOSPITAL_DIRECTION, COUNT(v.DEATH_DATE) AS NUM_OF_DEATHS
FROM HOSPITAL h
LEFT JOIN VICTIM v ON h.HOSPITAL_ID = v.HOSPITAL_ID AND v.DEATH_DATE IS NOT NULL
GROUP BY h.HOSPITAL_ID, h.HOSPITAL_NAME, h.HOSPITAL_DIRECTION
ORDER BY NUM_OF_DEATHS DESC;


/*
 * Query #2 : 	Show the first name, last name of all quarantined victims who
				presented an effectiveness greater than 5 in the treatment
				"Blood transfusions".
 * */

SELECT v.VICTIM_NAME, v.VICTIM_LAST_NAME
FROM VICTIM v
JOIN TREATMENT_VICTIM tv ON v.VICTIM_ID = tv.VICTIM_ID
JOIN TREATMENT t ON tv.TREATMENT_ID = t.TREATMENT_ID
WHERE v.VICTIM_STATUS = 'En cuarentena'
AND t.TREATMENT_NAME = 'Transfusiones de sangre'
AND tv.VICTIM_EFECTIVITY > 5;

/*
 * Query #3 : 	Show the name, last_name and address of the deceased victims with
				more than three associated people.
 * */

SELECT VICTIM_NAME, VICTIM_LAST_NAME, VICTIM_DIRECTION
FROM VICTIM
INNER JOIN (
    SELECT VICTIM_ID
    FROM CONTACT
    GROUP BY VICTIM_ID
    HAVING COUNT(*) > 3
) alias ON VICTIM.VICTIM_ID = alias.VICTIM_ID
WHERE DEATH_DATE IS NOT NULL;


/*
 * Query #4 : 	Show the first and last name of all victims in state
				"Suspended" who had physical contact of the "Kiss" type with more than
				2 of his associates.
 * */

SELECT VICTIM_NAME, VICTIM_LAST_NAME
FROM VICTIM
INNER JOIN CONTACT
ON VICTIM.VICTIM_ID = CONTACT.VICTIM_ID
WHERE VICTIM_STATUS = 'Suspendida'
AND CONTACT.PHYSICAL_CONTACT = 'Beso'
GROUP BY VICTIM_NAME, VICTIM_LAST_NAME
HAVING COUNT(DISTINCT CONTACT.ASSOCIATED_ID) > 2;


/*
 * Query #5 : 	Top 5 victims who have applied the most treatments of the
				“Oxygen” treatment.
 * */

SELECT v.VICTIM_ID ,v.VICTIM_NAME, v.VICTIM_LAST_NAME, COUNT(tv.TREATMENT_VICTIM_ID) AS NUM_TREATMENTS
FROM VICTIM v
JOIN TREATMENT_VICTIM tv ON v.VICTIM_ID = tv.VICTIM_ID
JOIN TREATMENT t ON tv.TREATMENT_ID = t.TREATMENT_ID
WHERE t.TREATMENT_NAME = 'Oxigeno'
GROUP BY v.VICTIM_ID,v.VICTIM_NAME, v.VICTIM_LAST_NAME
ORDER BY NUM_TREATMENTS DESC
FETCH FIRST 5 ROWS ONLY;