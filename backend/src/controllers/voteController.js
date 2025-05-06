const db = require('../config/database');

const voteController = {
    // Récupérer tous les items avec leurs votes
    getAllItems: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT 
                    i.*,
                    COUNT(CASE WHEN v.vote_type = 'like' THEN 1 END) as likes,
                    COUNT(CASE WHEN v.vote_type = 'dislike' THEN 1 END) as dislikes
                FROM items i
                LEFT JOIN votes v ON i.id = v.item_id
                GROUP BY i.id
                ORDER BY i.created_at DESC
            `);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Ajouter un vote
    addVote: async (req, res) => {
        const { itemId, voteType } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO votes (item_id, vote_type) VALUES ($1, $2) RETURNING *',
                [itemId, voteType]
            );
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Créer un nouvel item
    createItem: async (req, res) => {
        const { title, description } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *',
                [title, description]
            );
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = voteController; 