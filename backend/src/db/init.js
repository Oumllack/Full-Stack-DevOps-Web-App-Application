const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voting_app',
  password: 'password',
  port: 5432
});

async function initDb() {
  try {
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );

    await pool.query(schema);
    console.log('Base de données initialisée avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base de données:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDb(); 