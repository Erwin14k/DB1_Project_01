const fs = require('fs');
const csv = require('csv-parser');
const oracledb = require('oracledb');


// Database User
const user = 'pandemic';
// Database Password
const password = 'admin';
// Database ConnectString
const connectString = 'localhost:1521/orclpdb';

// Function to insert all data in the temporal table.
async function fillTemporal() {
  let conn;
  try {
    conn = await oracledb.getConnection({
      user: user,
      password: password,
      connectString: connectString
    });

    const stream = fs.createReadStream('./Data/DB_Excel.csv').pipe(csv());
    for await (const row of stream) {
      const values = [
        nullIfEmpty(row.NOMBRE_VICTIMA),
        nullIfEmpty(row.APELLIDO_VICTIMA),
        nullIfEmpty(row.DIRECCION_VICTIMA),
        nullIfEmpty(row.FECHA_PRIMERA_SOSPECHA),
        nullIfEmpty(row.FECHA_CONFIRMACION),
        nullIfEmpty(row.FECHA_MUERTE),
        nullIfEmpty(row.ESTADO_VICTIMA),
        nullIfEmpty(row.NOMBRE_ASOCIADO),
        nullIfEmpty(row.APELLIDO_ASOCIADO),
        nullIfEmpty(row.FECHA_CONOCIO),
        nullIfEmpty(row.CONTACTO_FISICO),
        nullIfEmpty(row.FECHA_INICIO_CONTACTO),
        nullIfEmpty(row.FECHA_FIN_CONTACTO),
        nullIfEmpty(row.NOMBRE_HOSPITAL),
        nullIfEmpty(row.DIRECCION_HOSPITAL),
        nullIfEmpty(row.UBICACION_VICTIMA),
        nullIfEmpty(row.FECHA_LLEGADA),
        nullIfEmpty(row.FECHA_RETIRO),
        nullIfEmpty(row.TRATAMIENTO),
        nullIfEmpty(row.EFECTIVIDAD),
        nullIfEmpty(row.FECHA_INICIO_TRATAMIENTO),
        nullIfEmpty(row.FECHA_FIN_TRATAMIENTO),
        nullIfEmpty(row.EFECTIVIDAD_EN_VICTIMA)
      ];
      try {
        const result = await conn.execute(
          `INSERT INTO TEMPORAL VALUES (${values.map((v) => v === null ? 'NULL' : `'${v}'`).join(',')})`
        );
        await conn.commit();
      } catch (err) {
        console.error('Error inserting on TEMPORAL table:', err);
      }
    }
    console.log("Temporal table loaded successfully!!");

  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Function to verify empty values
function nullIfEmpty(value) {
  return value === '' ? null : value;
}


module.exports = fillTemporal;
