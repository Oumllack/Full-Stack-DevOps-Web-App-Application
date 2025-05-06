require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voting_app',
  password: 'password',
  port: 5432
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Polls routes
app.get('/api/polls', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM polls ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/polls/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM polls WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sondage non trouvé' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/polls', async (req, res) => {
  const { title, options } = req.body;
  console.log('Création d\'un nouveau sondage:', { title, options });
  
  if (!title || !options || !Array.isArray(options)) {
    console.error('Données invalides:', { title, options });
    return res.status(400).json({ error: 'Données invalides' });
  }

  try {
    // Créer un objet votes initialisé avec des zéros pour chaque option
    const initialVotes = {};
    options.forEach((_, index) => {
      initialVotes[index.toString()] = 0;
    });
    
    console.log('Votes initiaux:', initialVotes);
    
    const result = await pool.query(
      'INSERT INTO polls (title, options, votes) VALUES ($1, $2, $3) RETURNING *',
      [title, JSON.stringify(options), JSON.stringify(initialVotes)]
    );
    
    console.log('Sondage créé avec succès:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors de la création du sondage:', err);
    res.status(500).json({ error: 'Erreur lors de la création du sondage', details: err.message });
  }
});

app.post('/api/polls/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { optionIndex } = req.body;
  try {
    // Récupérer d'abord le sondage
    const poll = await pool.query('SELECT * FROM polls WHERE id = $1', [id]);
    if (poll.rows.length === 0) {
      return res.status(404).json({ error: 'Sondage non trouvé' });
    }

    // Mettre à jour les votes
    const votes = poll.rows[0].votes || {};
    votes[optionIndex] = (votes[optionIndex] || 0) + 1;

    const result = await pool.query(
      'UPDATE polls SET votes = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(votes), id]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors du vote:', err);
    res.status(500).json({ error: 'Erreur lors du vote', details: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 